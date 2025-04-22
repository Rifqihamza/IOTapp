// components/CustomText.tsx
import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';

interface CustomTextProps extends TextProps {
    children: React.ReactNode;
    style?: TextStyle;
}

export default function CustomText({ children, style, ...rest }: CustomTextProps) {
    return (
        <Text style={[{ fontFamily: 'Codec-Cold-Light' }, style]} {...rest}>
            {children}
        </Text>
    );
}
