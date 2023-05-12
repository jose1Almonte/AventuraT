import { ScrollView, Text, StyleSheet } from 'react-native';
import React from 'react';
import RegisterEnterprise from '../../Components/registerEnterprise';

const HomeScreen = () => {
  return (

    <ScrollView style={styles.backGround}>
      <Text>HomeScreen</Text>
      <RegisterEnterprise></RegisterEnterprise>
    </ScrollView>
  );
};

export default HomeScreen;


const styles = StyleSheet.create({
  backGround:{
    backgroundColor: '#1DB5BE',
    // flex: 1,
  },
});
