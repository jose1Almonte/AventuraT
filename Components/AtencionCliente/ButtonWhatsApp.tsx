import React, { Component } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

class ButtonWhatsApp extends Component {
  render() {
    return (
      <View style={styles.containerButton}>
        <View style={styles.container}>
          <Image
            style={styles.icon}
            source={require('../../images/WhatsApp_icon.png')}
            alt="icon whatsapp"
          />
          <Text style={styles.text}>WhatsApp</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerButton: {
    display: 'flex',
    alignItems: 'center',
  },
  container: {
    height: 45,
    width: 190,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1DB5BE',
    flexDirection: 'row',
    gap: 10,
  },
  text: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
  icon: {
    width: 30,
    height: 30,
  },
});

export default ButtonWhatsApp;
