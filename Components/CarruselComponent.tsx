import React from 'react';
import { View, Text, Image } from 'react-native';

export const CustomComponent1 = () => (
  <View style={{ width: 200, height: 200, backgroundColor: 'red' }}>
    <Text>Componente 1</Text>
    <Image source={require('../images/mas.jpg')}></Image>
  </View>
);

export const CustomComponent2 = () => (
    <View style={{ width: 200, height: 200, backgroundColor: 'red' }}>
      <Text>Componente 2</Text>
      <Image source={require('../images/mas.jpg')}></Image>
    </View>
  );

  export const CustomComponent3 = () => (
    <View style={{ width: 200, height: 200, backgroundColor: 'red' }}>
      <Text>Componente 3</Text>
      <Image source={require('../images/mas.jpg')}></Image>
    </View>
  );

