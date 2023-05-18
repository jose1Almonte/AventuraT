import React from 'react';
import { View, Text, StyleSheet,Dimensions, ImageBackground } from 'react-native';

const{height,width} = Dimensions.get('window');

export const CustomComponent1 = () => (
  <View style={styles.contenedor}>
    <ImageBackground style={styles.reescala} source={require('../images/eee.jpg')}>
        <Text style={styles.texto}>Titulo</Text>
        <Text style={styles.texto2}>Texto dentro de la imagen</Text>
      </ImageBackground>
  </View>
);

export const CustomComponent2 = () => (
    <View style={styles.contenedor}>
      <ImageBackground style={styles.reescala} source={require('../images/bonito.jpeg')}>
        <Text style={styles.texto}>Titulo</Text>
        <Text style={styles.texto2}>Texto dentro de la imagen</Text>
      </ImageBackground>
    </View>
  );

  export const CustomComponent3 = () => (
    <View style={styles.contenedor}>
      <ImageBackground style={styles.reescala} source={require('../images/mas.jpg')}>
        <Text style={styles.texto}>Titulo</Text>
        <Text style={styles.texto2}>Texto dentro de la imagen</Text>
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

    reescala:{
      width:width*0.4,
      height:height*0.23,
      borderRadius: width*0.05,
    },

    texto: {
      fontFamily: 'Sansation',
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: 16,
      lineHeight: 18,
      letterSpacing: 0.05,
      color: '#FFFFFF',
      flex: 0,
      order: 0,
      flexGrow: 0,
      textAlign: 'center',
      bottom: '40%',
      position: 'absolute',  // Ajusta la posición vertical del texto según tus necesidades
      left: '5%', // Ajusta la posición horizontal del texto según tus necesidades
      right: '5%',
    },

    texto2: {
      fontFamily: 'Montserrat',
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: width * 0.04, // Ajusta el tamaño de fuente según tus necesidades
      lineHeight: width * 0.048, // Ajusta la altura de línea según tus necesidades
      textAlign: 'center',
      color: '#FFFFFF',
      opacity: 0.8,
      flex: 0,
      order: 0,
      flexGrow: 0,
      bottom: '15%',
      position: 'absolute',  // Ajusta la posición vertical del texto según tus necesidades
      left: '5%', // Ajusta la posición horizontal del texto según tus necesidades
      right: '5%',
    },
});

