import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

interface Props {
    numRows: number;
    numCols: number;
    children?: React.ReactNode
}

const GridPlane: React.FC<Props> = ({ numRows, numCols, children }) => {
    let childrenArray: (string | number | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal)[] | null = null;
    if(children) {
        childrenArray = React.Children.toArray(children)
    }
    
    return (
        <View style={styles.grid}>
        {Array.from({ length: numRows }).map((_, rowIdx) => (
            <View key={rowIdx} style={styles.row}>
            {Array.from({ length: numCols }).map((_, colIdx) => (
                <View key={colIdx} style={styles.cell}>
                    {childrenArray ? childrenArray.map(child => ((typeof child == "object" && (child as any).props.x == colIdx && (child as any).props.y == rowIdx) ? child : <></>)) : <></>}
                </View>
            ))}
            </View>
        ))}
        </View>
    );
}

export default GridPlane;

const styles = StyleSheet.create({
    grid: {
      flexDirection: 'column',
      margin: 10,
    },
    row: {
      flexDirection: 'row',
    },
    cell: {
      flex: 1,
      aspectRatio: 1, // makes each cell square
      borderWidth: 1,
      borderColor: 'black',
      justifyContent: 'center',
      alignItems: 'center',
    },
});
  