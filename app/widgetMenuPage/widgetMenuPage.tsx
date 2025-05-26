import React, { useRef, useState, useMemo, useEffect } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Alert,
    ActivityIndicator,
    TextInput
} from 'react-native';
import { useRouter } from 'expo-router';
import RBSheet from 'react-native-raw-bottom-sheet';
import Ionicons from '@expo/vector-icons/Ionicons';

import GridPlane from '@/components/gridplane';
import Widget from '@/components/controllables/widget';
import DraggableResizableWidget from '@/components/draggableResizeWidget';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';

// Import controllable components
import ControllableSwitch from '@/components/controllables/switch';
import ControllableSlider from '@/components/controllables/slider';
import ControllableGauge from '@/components/controllables/gauge';
import ControllableCounter from '@/components/controllables/counter';
import ControllableLED from '@/components/controllables/led';
import ControllableButton from '@/components/controllables/button';

// Types
type WidgetType =
    | 'Switch'
    | 'Slider'
    | 'Counter'
    | 'LED'
    | 'Button'
    | 'Gauge';

interface WidgetData {
    id: number;
    name: WidgetType;
    x: number;
    y: number;
    width: number;
    height: number;
    label?: string;
    config?: Record<string, any>;
}

type RBSheet = any;

// Widget Components Map
const WIDGET_COMPONENTS: Record<WidgetType, (props?: any) => JSX.Element> = {
    Switch: (props) => <ControllableSwitch toggleState={false} {...props} />,
    Slider: (props) => <ControllableSlider maxValue={100} {...props} />,
    Counter: (props) => <ControllableCounter {...props} />,
    LED: (props) => <ControllableLED {...props} />,
    Button: (props) => <ControllableButton {...props} />,
    Gauge: (props) => <ControllableGauge value={75} label={props?.label || ""} {...props} />,
};

// Widget default sizes in grid units
const WIDGET_DEFAULT_SIZES: Record<WidgetType, { width: number, height: number }> = {
    Switch: { width: 2, height: 1 },
    Slider: { width: 4, height: 1 },
    Counter: { width: 2, height: 2 },
    LED: { width: 1, height: 1 },
    Button: { width: 2, height: 1 },
    Gauge: { width: 3, height: 3 },
};

const WidgetMenuPage: React.FC = () => {
    // State
    const [widgets, setWidgets] = useState<WidgetData[]>([]);
    const [selectedWidgetId, setSelectedWidgetId] = useState<number | null>(null);
    const [projectName, setProjectName] = useState("My IOT Project");
    const [isSaving, setIsSaving] = useState(false);
    const [isUnsaved, setIsUnsaved] = useState(false);

    // Refs
    const router = useRouter();
    const sheetAddWidgetRef = useRef<RBSheet>(null);
    const sheetEditWidgetRef = useRef<RBSheet>(null);

    // Find selected widget
    const selectedWidget = useMemo(() =>
        widgets.find(w => w.id === selectedWidgetId),
        [widgets, selectedWidgetId]);

    // Mark as unsaved when widgets change
    useEffect(() => {
        if (widgets.length > 0) {
            setIsUnsaved(true);
        }
    }, [widgets]);

    // Screen dimensions
    const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

    // Grid configuration
    const numCols = 9;
    const numRows = 16;

    // Calculate grid cell size
    const gridSize = useMemo(() => {
        const gridWidth = screenWidth / numCols;
        const gridHeight = screenHeight / numRows;
        return Math.min(gridWidth, gridHeight);
    }, [screenWidth, screenHeight]);

    // Add new widget
    const handleAddWidget = (type: WidgetType) => {
        // Get default size for this widget type
        const defaultSize = WIDGET_DEFAULT_SIZES[type];

        // Find an empty position on the grid
        const position = findEmptyPosition(defaultSize.width, defaultSize.height);

        const newWidget: WidgetData = {
            id: Date.now(),
            name: type,
            x: position.x,
            y: position.y,
            width: defaultSize.width,
            height: defaultSize.height,
            label: `${type} ${widgets.length + 1}`,
            config: {},
        };

        setWidgets(prev => [...prev, newWidget]);
        setSelectedWidgetId(newWidget.id);
        sheetAddWidgetRef.current?.close();
    };

    // Find an empty position on the grid
    const findEmptyPosition = (widthInCells: number, heightInCells: number) => {
        // Simple algorithm to find first available spot
        for (let y = 0; y < numRows - heightInCells + 1; y++) {
            for (let x = 0; x < numCols - widthInCells + 1; x++) {
                let positionIsFree = true;

                // Check if any existing widget overlaps with this position
                for (const widget of widgets) {
                    const widgetRight = widget.x + widget.width;
                    const widgetBottom = widget.y + widget.height;
                    const newWidgetRight = x + widthInCells;
                    const newWidgetBottom = y + heightInCells;

                    if (
                        x < widgetRight &&
                        newWidgetRight > widget.x &&
                        y < widgetBottom &&
                        newWidgetBottom > widget.y
                    ) {
                        positionIsFree = false;
                        break;
                    }
                }

                if (positionIsFree) {
                    return { x, y };
                }
            }
        }

        // If no free position found, return default position
        return { x: 0, y: 0 };
    };

    // Update widget position and size
    const handleUpdateWidget = (widgetId: number, position: { x: number; y: number }, size: { width: number; height: number }) => {
        setWidgets(prev =>
            prev.map(widget =>
                widget.id === widgetId
                    ? {
                        ...widget,
                        x: position.x,
                        y: position.y,
                        width: Math.round(size.width / gridSize),
                        height: Math.round(size.height / gridSize)
                    }
                    : widget
            )
        );
    };

    // Delete widget
    const handleDeleteWidget = (widgetId: number) => {
        Alert.alert(
            "Delete Widget",
            "Are you sure you want to delete this widget?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => {
                        setWidgets(prev => prev.filter(widget => widget.id !== widgetId));
                        setSelectedWidgetId(null);
                    }
                }
            ]
        );
    };

    // Save project
    const handleSaveProject = () => {
        setIsSaving(true);

        // Simulate saving with timeout
        setTimeout(() => {
            setIsSaving(false);
            setIsUnsaved(false);
            Alert.alert("Success", "Project saved successfully!");
        }, 1000);

        // In a real app, you'd save to a database or file system
        console.log("Project data to save:", {
            name: projectName,
            widgets: widgets
        });
    };

    // Handle back navigation with unsaved changes
    const handleBackPress = () => {
        if (isUnsaved) {
            Alert.alert(
                "Unsaved Changes",
                "You have unsaved changes. Do you want to discard them?",
                [
                    {
                        text: "Cancel",
                        style: "cancel"
                    },
                    {
                        text: "Discard",
                        style: "destructive",
                        onPress: () => router.back()
                    }
                ]
            );
        } else {
            router.back();
        }
    };

    // Update widget label
    const updateWidgetLabel = (id: number, newLabel: string) => {
        setWidgets(prev =>
            prev.map(widget =>
                widget.id === id
                    ? { ...widget, label: newLabel }
                    : widget
            )
        );
    };

    // Render widget selection items in bottom sheet
    const renderWidgetItem = ({ item }: { item: { name: WidgetType } }) => {
        const WidgetComponent = WIDGET_COMPONENTS[item.name];

        return (
            <TouchableOpacity
                onPress={() => handleAddWidget(item.name)}
                style={styles.widgetItem}
            >
                <Text style={styles.widgetTitle}>{item.name}</Text>
                <View style={styles.widgetPreview}>
                    <WidgetComponent />
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Header */}
            <View style={styles.headerWrapper}>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={handleBackPress}
                        style={styles.headerLeft}
                    >
                        <Ionicons name="close" size={28} color="white" />
                        <Text style={styles.headerTitle}>Build Your App</Text>
                    </TouchableOpacity>

                    <View style={styles.headerActions}>
                        {isSaving ? (
                            <ActivityIndicator color="white" size="small" />
                        ) : (
                            <TouchableOpacity
                                onPress={handleSaveProject}
                                style={[
                                    styles.saveButton,
                                    isUnsaved && styles.saveButtonUnsaved
                                ]}
                            >
                                <Ionicons name="save" size={24} color="white" />
                                <Text style={styles.saveButtonText}>Save</Text>
                            </TouchableOpacity>
                        )}

                        <TouchableOpacity
                            onPress={() => sheetAddWidgetRef.current?.open()}
                            style={styles.addButton}
                        >
                            <Ionicons name="add-sharp" size={28} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Project name input */}
                <TextInput
                    style={styles.projectNameInput}
                    value={projectName}
                    onChangeText={setProjectName}
                    placeholder="Project Name"
                    placeholderTextColor="rgba(255,255,255,0.7)"
                />
            </View>

            {/* Main Grid Area */}
            <GestureHandlerRootView style={styles.gridContainer}>
                <GridPlane
                    numCols={numCols}
                    numRows={numRows}
                    gridSize={gridSize}
                    showGrid={true}
                >
                    {widgets.map(widget => (
                        <DraggableResizableWidget
                            key={widget.id}
                            initialWidth={widget.width * gridSize}
                            initialHeight={widget.height * gridSize}
                            gridSize={gridSize}
                            x={widget.x}
                            y={widget.y}
                            isSelected={selectedWidgetId === widget.id}
                            onSelect={() => setSelectedWidgetId(widget.id)}
                            onDelete={() => handleDeleteWidget(widget.id)}
                            onUpdate={(pos, size) => handleUpdateWidget(widget.id, pos, size)}
                        >
                            <Widget
                                controllable_name={widget.name}
                                width={widget.width}
                                height={widget.height}
                                x={widget.x}
                                y={widget.y}
                                label={widget.label}
                            >
                                {WIDGET_COMPONENTS[widget.name]({
                                    label: widget.label,
                                    ...widget.config
                                })}
                            </Widget>
                        </DraggableResizableWidget>
                    ))}
                </GridPlane>
            </GestureHandlerRootView>

            {/* Empty state message */}
            {widgets.length === 0 && (
                <View style={styles.emptyState}>
                    <Ionicons name="add-circle-outline" size={64} color="#3730A3" />
                    <Text style={styles.emptyStateText}>
                        Add widgets by tapping the + button
                    </Text>
                    <TouchableOpacity
                        style={styles.emptyStateButton}
                        onPress={() => sheetAddWidgetRef.current?.open()}
                    >
                        <Text style={styles.emptyStateButtonText}>Add First Widget</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Add Widget Bottom Sheet */}
            <RBSheet
                ref={sheetAddWidgetRef}
                height={500}
                openDuration={300}
                customStyles={{
                    container: styles.sheetContainer,
                    draggableIcon: styles.draggableIcon
                }}
            >
                <View style={styles.sheetHeader}>
                    <Text style={styles.sheetTitle}>Choose a Widget</Text>
                    <TouchableOpacity
                        onPress={() => sheetAddWidgetRef.current?.close()}
                        style={styles.sheetCloseButton}
                    >
                        <Text style={styles.sheetCloseButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={Object.keys(WIDGET_COMPONENTS).map(name => ({ name } as { name: WidgetType }))}
                    keyExtractor={(item) => item.name}
                    numColumns={2}
                    columnWrapperStyle={styles.widgetGridRow}
                    contentContainerStyle={styles.sheetListWrapper}
                    renderItem={renderWidgetItem}
                />
            </RBSheet>

            {/* Edit Widget Bottom Sheet */}
            {selectedWidget && (
                <RBSheet
                    ref={sheetEditWidgetRef}
                    height={400}
                    openDuration={300}
                    customStyles={{
                        container: styles.sheetContainer,
                        draggableIcon: styles.draggableIcon
                    }}
                >
                    <View style={styles.sheetHeader}>
                        <Text style={styles.sheetTitle}>Edit {selectedWidget.name}</Text>
                        <TouchableOpacity
                            onPress={() => sheetEditWidgetRef.current?.close()}
                            style={styles.sheetCloseButton}
                        >
                            <Text style={styles.sheetCloseButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.editForm}>
                        <Text style={styles.editLabel}>Widget Label</Text>
                        <TextInput
                            style={styles.editInput}
                            value={selectedWidget.label}
                            onChangeText={(text) => updateWidgetLabel(selectedWidget.id, text)}
                            placeholder="Enter widget label"
                        />

                        {/* Widget-specific configuration options would go here */}

                        <TouchableOpacity
                            style={styles.deleteWidgetButton}
                            onPress={() => handleDeleteWidget(selectedWidget.id)}
                        >
                            <Ionicons name="trash" size={20} color="white" />
                            <Text style={styles.deleteWidgetButtonText}>Delete Widget</Text>
                        </TouchableOpacity>
                    </View>
                </RBSheet>
            )}

            {/* Floating action button to edit selected widget */}
            {selectedWidgetId !== null && (
                <TouchableOpacity
                    style={styles.editFab}
                    onPress={() => sheetEditWidgetRef.current?.open()}
                >
                    <Ionicons name="settings" size={24} color="white" />
                </TouchableOpacity>
            )}
        </SafeAreaView>
    );
};

export default WidgetMenuPage;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    headerWrapper: {
        backgroundColor: '#3730A3',
        paddingTop: 25,
        paddingBottom: 15,
        paddingHorizontal: 20,
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: 'center',
        gap: 10,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#fff',
    },
    headerActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16
    },
    saveButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        gap: 6,
    },
    saveButtonUnsaved: {
        backgroundColor: '#6366f1',
    },
    saveButtonText: {
        color: 'white',
        fontWeight: '600',
    },
    addButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    projectNameInput: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
        padding: 0,
        height: 30,
    },
    gridContainer: {
        flex: 1,
        padding: 8,
    },
    emptyState: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(248,249,250,0.8)',
        paddingHorizontal: 32,
    },
    emptyStateText: {
        fontSize: 18,
        color: '#666',
        textAlign: 'center',
        marginTop: 16,
        marginBottom: 24,
    },
    emptyStateButton: {
        backgroundColor: '#3730A3',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    emptyStateButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },
    // Bottom sheet styles
    sheetContainer: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 16,
    },
    draggableIcon: {
        backgroundColor: '#d1d5db',
        width: 60,
    },
    sheetHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    sheetTitle: {
        fontSize: 20,
        fontWeight: '600',
    },
    sheetCloseButton: {
        backgroundColor: '#3730A3',
        borderRadius: 8,
        paddingVertical: 6,
        paddingHorizontal: 12,
    },
    sheetCloseButtonText: {
        color: '#fff',
        fontWeight: '600',
    },
    sheetListWrapper: {
        paddingBottom: 32,
    },
    widgetGridRow: {
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    widgetTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#3730A3',
        marginBottom: 8,
        textAlign: 'center',
    },
    widgetItem: {
        flex: 1,
        margin: 8,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 12,
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 2,
        minWidth: 140,
        maxWidth: '48%',
    },
    widgetPreview: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f3f4f6',
        borderRadius: 8,
        padding: 12,
        minHeight: 60,
        minWidth: 60,
        marginBottom: 4,
    },
    editForm: {
        padding: 16,
        gap: 16,
    },
    editLabel: {
        fontSize: 16,
        fontWeight: '500',
        color: '#3730A3',
        marginBottom: 8,
    },
    editInput: {
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        fontSize: 16,
        backgroundColor: '#fff',
        color: '#3730A3',
    },
    deleteWidgetButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ef4444',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginTop: 24,
        justifyContent: 'center',
        gap: 8,
    },
    deleteWidgetButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
    editFab: {
        position: 'absolute',
        bottom: 32,
        right: 32,
        backgroundColor: '#3730A3',
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
})
