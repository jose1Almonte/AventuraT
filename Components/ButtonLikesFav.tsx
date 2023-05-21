import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import favorites from '../vectores/favorites';

export function ButtonLikesFav() {
    const [isClicked, setIsClicked] = useState(false); // Estado para rastrear si se ha hecho clic en el botón

    const handleButtonClick = () => {
        setIsClicked(!isClicked); // Invertir el estado de isClicked al hacer clic
    };

    const heartColor = isClicked ? '#FF3D00' : 'white'; // Establecer el color del ícono de corazón según el estado

    const heartIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path fill="${heartColor}" d="M12 20.853l-1.577-1.422C4.017 14.607 0 11.189 0 7.038 0 3.364 2.687 1 6 1c1.905 0 3.633.879 5 2.252C11.367 1.879 13.095 1 15 1c3.313 0 6 2.364 6 6.038 0 4.151-4.017 7.569-10.423 12.393L12 20.853z"/>
  </svg>`;
    return (
        <TouchableOpacity onPress={handleButtonClick} style={styles.button}>
            <SvgXml xml={heartIcon} width={24} height={24} />
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
