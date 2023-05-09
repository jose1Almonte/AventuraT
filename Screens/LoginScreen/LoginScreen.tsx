import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { LoginBackground } from '../../Layouts/Background';

const LoginScreen = () => {
  return (
    <LoginBackground image={require('../../images/loginLayout.png')} style={styles.backGround}>

    <View>
      <Text>LoginScreen</Text>
    </View>
    </LoginBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  backGround:{
    flex: 1,
  },
});
