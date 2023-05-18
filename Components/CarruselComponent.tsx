import React from 'react';
import { View, Text, Image, StyleSheet,Dimensions } from 'react-native';

const{height,width} = Dimensions.get('window');

export const CustomComponent1 = () => (
  <View style={styles.contenedor}>
    <Image style={styles.reescala} source={require('../images/eee.jpg')}></Image>
  </View>
);

export const CustomComponent2 = () => (
    <View style={styles.contenedor}>
      <Image style={styles.reescala} source={require('../images/bonito.jpeg')}></Image>
    </View>
  );

  export const CustomComponent3 = () => (
    <View style={styles.contenedor}>
      <Image style={styles.reescala} source={require('../images/mas.jpg') }></Image>
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
      borderRadius:30,
    },
});

