import React from 'react';
import { View, Text, StyleSheet, Dimensions, ImageBackground } from 'react-native';

const { height, width } = Dimensions.get('window');

export const CustomComponent1 = () => (
  <View style={styles.contenedor}>
    <ImageBackground borderRadius={30} style={styles.reescala} source={require('../images/eee.jpg')}>
      <View style={styles.textContainer}>
        <Text style={styles.texto}>Titulo</Text>
        <Text style={styles.texto2}>Texto dentro de la imagen</Text>
      </View>
    </ImageBackground>
  </View>
);

export const CustomComponent2 = () => (
  <View style={styles.contenedor}>
    <ImageBackground borderRadius={30} style={styles.reescala} source={require('../images/bonito.jpeg')}>
      <View style={styles.textContainer}>
        <Text style={styles.texto}>Titulo</Text>
        <Text style={styles.texto2}>Texto dentro de la imagen</Text>
      </View>
    </ImageBackground>
  </View>
);

export const CustomComponent3 = () => (
  <View style={styles.contenedor}>
    <ImageBackground borderRadius={30} style={styles.reescala} source={require('../images/mas.jpg')}>
      <View style={styles.textContainer}>
        <Text style={styles.texto}>Titulo</Text>
        <Text style={styles.texto2}>Texto dentro de la imagen</Text>
      </View>
    </ImageBackground>
  </View>
);

export const CustomComponent4 = () => (
  <View style={styles.contenedor2}>
    <Text> </Text>
  </View>
);

const styles = StyleSheet.create({
  contenedor: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  contenedor2: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 1,
    height: 1,
  },

  reescala: {
    width: width * 0.4,
    height: height * 0.23,
  },

  textContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },

  texto: {
    fontFamily: 'Sansation',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 18,
    letterSpacing: 0.05,
    color: '#FFFFFF',
    textAlign: 'center',
  },

  texto2: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: width * 0.04,
    lineHeight: width * 0.048,
    textAlign: 'center',
    color: '#FFFFFF',
    opacity: 0.8,
  },
});
