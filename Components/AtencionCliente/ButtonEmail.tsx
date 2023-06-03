import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

class ButtonEmail extends Component {
  render() {
    return (
      <View style={styles.containerButton}>
        <View style={styles.container}>
          <Text style={styles.text}>Correo electrónico</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerButton: {
    display: 'flex',
    alignItems: 'center'
  },
  container: {
    height: 45,
    width: 190,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1881B1',
  },
  text: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
});

export default ButtonEmail;
