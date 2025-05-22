import React from 'react';
import { View, StyleSheet } from 'react-native';

interface Props {
    numRows: number;
    numCols: number;
    gridSize: number;
    children: React.ReactNode;
    showGrid?: boolean;
}

const GridPlane: React.FC<Props> = ({
    numRows,
    numCols,
    gridSize,
    children
}) => {
    return (
        <View
            style={[
                styles.container,
                { width: numCols * gridSize, height: numRows * gridSize }
            ]}
        >
            {/* Grid Background */}
            <View style={styles.grid}>
                {Array.from({ length: numRows }).map((_, rowIdx) => (
                    <View key={rowIdx} style={styles.row}>
                        {Array.from({ length: numCols }).map((_, colIdx) => (
                            <View
                                key={colIdx}
                                style={[
                                    styles.cell,
                                    { width: gridSize, height: gridSize }
                                ]}
                            />
                        ))}
                    </View>
                ))}
            </View>

            {/* Children (Widgets) */}
            {children}
        </View>
    );
};

export default GridPlane;

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    grid: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
    },
    row: {
        flexDirection: 'row',
    },
    cell: {
        borderWidth: 1,
        borderColor: '#ccc',
    },
});
