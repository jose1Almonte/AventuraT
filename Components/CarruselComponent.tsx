import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export const CustomComponent1 = () => (
  <View style={styles.contenedor}>
    <Text>Componente 1</Text>
    <Image source={require('../images/mas.jpg')}></Image>
  </View>
);

export const CustomComponent2 = () => (
    <View style={styles.contenedor}>
      <Text>Componente 2</Text>
      <Image source={require('../images/mas.jpg')}></Image>
    </View>
  );

  export const CustomComponent3 = () => (
    <View style={styles.contenedor}>
      <Text>Componente 3</Text>
      <Image source={require('../images/mas.jpg')}></Image>
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
        width: 200,
        height: 200,
        backgroundColor: 'red',
    },
    contenedor2: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 1,
        height: 1,
    },

});

