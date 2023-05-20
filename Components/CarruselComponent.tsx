import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native';
import Califications from './califications';

const {height, width} = Dimensions.get('window');

export const CustomComponent1 = () => (
  <View style={styles.contenedor}>
    <ImageBackground
      borderRadius={30}
      style={styles.reescala}
      source={require('../images/eee.jpg')}>
      <View style={styles.contenedor3}>
        <Califications />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.texto}>Titulo</Text>
        <Text style={styles.texto2}>Texto dentro de la imagen</Text>
      </View>
    </ImageBackground>
  </View>
);

export const CustomComponent2 = () => (
  <View style={styles.contenedor}>
    <ImageBackground
      borderRadius={30}
      style={styles.reescala}
      source={require('../images/bonito.jpeg')}>
        <View style={styles.contenedor3}>
        <Califications />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.texto}>Titulo</Text>
        <Text style={styles.texto2}>Texto dentro de la imagen</Text>
      </View>
    </ImageBackground>
  </View>
);

export const CustomComponent3 = () => (
  <View style={styles.contenedor}>
    <ImageBackground
      borderRadius={30}
      style={styles.reescala}
      source={require('../images/mas.jpg')}>
        <View style={styles.contenedor3}>
        <Califications />
      </View>
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
  contenedor3: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 10,
    marginTop: 10,
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
    height: 80,
    gap: 5,
    backgroundColor:
      'linear-gradient(359.78deg, rgba(0, 0, 0, 0.8) 4.2%, rgba(13, 13, 13, 0) 118.3%)',
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 30,
  },
  texto: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    lineHeight: 18,
    letterSpacing: 0.05,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  texto2: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
    lineHeight: 18,
    textAlign: 'center',
    color: '#FFFFFF',
    opacity: 0.8,
  },
});
