import { ScrollView, Text, StyleSheet } from 'react-native';
import React from 'react';

const DetailsScreen = () => {
  return (
    <ScrollView style={styles.backGround}>

      <Text>DetailsScreen</Text>
    </ScrollView>

  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  backGround:{
    backgroundColor: '#1DB5BE',
    // flex: 1,
  },
});
