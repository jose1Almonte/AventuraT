import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { Background } from '../../Layouts/Background';
import Gradient from '../../Layouts/Gradient';

const LoginScreen = () => {
  return (
    <View style = {styles.bigBox}>
      <Background image = {require('../../images/loginLayout.png')} style={styles.backGround}>
      <Gradient colors = {['#1DB5BE', 'rgba(24, 129, 177, 0.36);', 'rgba(24, 129, 177, 0.26);', 'rgba(24, 129, 177, 0.16);', 'rgba(24, 129, 177, 0);']} locations={[0, 0.25, 0.5, 0.9, 1]} style={styles.linearGradient} >
            <Text>LoginScreen</Text>
      </Gradient>
      </Background>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  backGround:{
    flex: 1,
  },

  linearGradient: {
    flex: 1,
  },

  bigBox: {
    flex: 1,
    backgroundColor: 'red',
  },
});
