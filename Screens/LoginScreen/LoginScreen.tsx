import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Background } from '../../Layouts/Background';

const LoginScreen = () => {
  return (
    <Background image={require('../../images/loginLayout.png')} style={styles.backGround}>
    <View>
      <Text>LoginScreen</Text>
    </View>
    </Background>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  backGround:{
    flex: 1,
  },
});
