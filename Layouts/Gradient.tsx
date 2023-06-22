import React, { ReactNode } from 'react';
import LinearGradient from 'react-native-linear-gradient';

export function hexToRGBA(hex: string, alpha: number) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

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

