import { ScrollView, Text, StyleSheet } from 'react-native';
import React from 'react';

const HomeScreen = () => {
  return (

    <ScrollView style={styles.backGround}>
      <Text>HomeScreen</Text>
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
