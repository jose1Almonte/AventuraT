import { StyleSheet } from 'react-native';
import React, { ReactNode } from 'react';
import LinearGradient from 'react-native-linear-gradient';

interface GradientProps {
    children: ReactNode;
    colors: string[];
    locations: number[];
    style: any,
}

const Gradient = ({
    children,
    colors,
    locations,
    style,
}: GradientProps) => {
    return (
        <LinearGradient colors = {colors} locations={locations} style={style}>
            {children}
        </LinearGradient>
    );
};

export default Gradient;

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
    },
});
