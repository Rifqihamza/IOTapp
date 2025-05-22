import React, { useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    useAnimatedGestureHandler,
    withSpring,
    runOnJS,
    interpolate,
} from 'react-native-reanimated';
import {
    PanGestureHandler,
    PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';

interface Props {
    initialWidth?: number;
    initialHeight?: number;
    gridSize?: number;
    x: number;
    y: number;
    minWidth?: number;
    minHeight?: number;
    maxWidth?: number;
    maxHeight?: number;
    onUpdate?: (position: { x: number; y: number }, size: { width: number; height: number }) => void;
    onSelect?: () => void;
    isSelected?: boolean;
    onDelete?: () => void;
    children: React.ReactNode;
}

interface ContextType extends Record<string, unknown> {
    startX: number;
    startY: number;
    startWidth: number;
    startHeight: number;
}

type ResizeDirection = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | null;

const DraggableResizableWidget: React.FC<Props> = ({
    initialWidth = 100,
    initialHeight = 100,
    gridSize = 50,
    x,
    y,
    minWidth = 50,
    minHeight = 50,
    maxWidth = 300,
    maxHeight = 300,
    onUpdate,
    onSelect,
    isSelected = false,
    onDelete,
    children
}) => {
    const translateX = useSharedValue(x * gridSize);
    const translateY = useSharedValue(y * gridSize);
    const width = useSharedValue(initialWidth);
    const height = useSharedValue(initialHeight);
    const isDragging = useSharedValue(false);
    const isResizing = useSharedValue(false);
    const scale = useSharedValue(1);

    // Update position when props change
    useEffect(() => {
        translateX.value = x * gridSize;
        translateY.value = y * gridSize;
    }, [x, y, gridSize]);

    // Drag gesture handler
    const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, ContextType>({
        onStart: (_, ctx) => {
            ctx.startX = translateX.value;
            ctx.startY = translateY.value;
            isDragging.value = true;
            scale.value = withSpring(1.02);

            // If there's a select callback, run it
            if (onSelect) {
                runOnJS(onSelect)();
            }
        },
        onActive: (event, ctx) => {
            // Calculate max positions considering widget size and grid bounds
            const maxX = (9 - width.value / gridSize) * gridSize;
            const maxY = (16 - height.value / gridSize) * gridSize;

            translateX.value = Math.min(Math.max(ctx.startX + event.translationX, 0), maxX);
            translateY.value = Math.min(Math.max(ctx.startY + event.translationY, 0), maxY);
        },
        onEnd: () => {
            isDragging.value = false;
            scale.value = withSpring(1);

            // Snap to grid
            const snappedX = Math.round(translateX.value / gridSize) * gridSize;
            const snappedY = Math.round(translateY.value / gridSize) * gridSize;

            translateX.value = withSpring(snappedX);
            translateY.value = withSpring(snappedY);

            const finalX = Math.round(snappedX / gridSize);
            const finalY = Math.round(snappedY / gridSize);

            if (onUpdate) {
                runOnJS(onUpdate)(
                    { x: finalX, y: finalY },
                    { width: width.value, height: height.value }
                );
            }
        },
    });

    // Resize gesture handler for bottom right corner
    const resizeGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, ContextType>({
        onStart: (_, ctx) => {
            isResizing.value = true;
            ctx.startWidth = width.value;
            ctx.startHeight = height.value;
            scale.value = withSpring(1.02);

            // If there's a select callback, run it
            if (onSelect) {
                runOnJS(onSelect)();
            }
        },
        onActive: (event, ctx) => {
            // Calculate new size with constraints
            const newWidth = Math.max(
                minWidth,
                Math.min(maxWidth, ctx.startWidth + event.translationX)
            );
            const newHeight = Math.max(
                minHeight,
                Math.min(maxHeight, ctx.startHeight + event.translationY)
            );

            width.value = newWidth;
            height.value = newHeight;
        },
        onEnd: () => {
            isResizing.value = false;
            scale.value = withSpring(1);

            // Snap to grid (round to nearest grid cell)
            const snappedWidth = Math.max(gridSize, Math.round(width.value / gridSize) * gridSize);
            const snappedHeight = Math.max(gridSize, Math.round(height.value / gridSize) * gridSize);

            width.value = withSpring(snappedWidth);
            height.value = withSpring(snappedHeight);

            if (onUpdate) {
                const gridX = Math.round(translateX.value / gridSize);
                const gridY = Math.round(translateY.value / gridSize);

                runOnJS(onUpdate)(
                    { x: gridX, y: gridY },
                    { width: snappedWidth, height: snappedHeight }
                );
            }
        },
    });

    // Animated styles
    const containerStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateX.value },
            { translateY: translateY.value },
            { scale: scale.value },
        ],
        width: width.value,
        height: height.value,
        borderColor: isSelected ? '#3730A3' : '#ccc',
        borderWidth: isSelected ? 2 : 1,
        shadowOpacity: interpolate(
            scale.value,
            [1, 1.02],
            [0.1, 0.3]
        ),
    }));

    // Handle select
    const handleSelect = () => {
        if (onSelect) {
            onSelect();
        }
    };

    const resizeHandleSize = 20;

    return (
        <PanGestureHandler onGestureEvent={panGesture}>
            <Animated.View
                style={[styles.widgetContainer, containerStyle]}
                onTouchStart={handleSelect}
            >
                {children}

                {/* Delete button - visible only when selected */}
                {isSelected && onDelete && (
                    <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={onDelete}
                    >
                        <Ionicons name="close-circle" size={24} color="#ff3b30" />
                    </TouchableOpacity>
                )}

                {/* Resize handle at bottom-right corner */}
                <PanGestureHandler onGestureEvent={resizeGesture}>
                    <Animated.View
                        style={[styles.resizeHandle, {
                            right: 0,
                            bottom: 0,
                            width: resizeHandleSize,
                            height: resizeHandleSize,
                        }]}
                    >
                        {isSelected && (
                            <Ionicons
                                name="resize"
                                size={14}
                                color="#3730A3"
                                style={styles.resizeIcon}
                            />
                        )}
                    </Animated.View>
                </PanGestureHandler>
            </Animated.View>
        </PanGestureHandler>
    );
};

const styles = StyleSheet.create({
    widgetContainer: {
        position: "absolute",
        backgroundColor: '#f9f9f9',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 3,
    },
    deleteButton: {
        position: 'absolute',
        top: -12,
        right: -12,
        zIndex: 10,
        backgroundColor: '#fff',
        borderRadius: 12,
    },
    resizeHandle: {
        position: 'absolute',
        zIndex: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    resizeIcon: {
        opacity: 0.7,
    }
});

export default DraggableResizableWidget;