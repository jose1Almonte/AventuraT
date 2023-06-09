import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import favorites from '../vectores/favorites';

export function ButtonOptions() {
    const [isClicked, setIsClicked] = useState(false); // Estado para rastrear si se ha hecho clic en el botón

    const handleButtonClick = () => {
        setIsClicked(!isClicked); // Invertir el estado de isClicked al hacer clic
    };

    const optionColor = isClicked ? '#1881B1' : 'white'; // Establecer el color del ícono de corazón según el estado

    const optionIcon = `<svg width="22" height="22" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.571411" width="19" height="19" rx="4.5" fill="${optionColor}" stroke="#1881B1"/>
    </svg>
    `;

    return (
        <TouchableOpacity onPress={handleButtonClick}>
            <SvgXml xml={optionIcon} width={22} height={22} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 25,
        height: 25,
        marginLeft: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
});
