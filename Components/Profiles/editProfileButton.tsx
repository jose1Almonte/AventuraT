import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';

class EditProfileButton extends Component {
  render() {
    return (
      <View style={styles.containerButton}>
        <View style={styles.container}>
          <Text style={styles.txt}>Editar perfil</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerButton: {
    display: 'flex',
    alignItems: "center"
  },
  container: {
    height: 40,
    width: 140,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1881B1',
  },
  txt: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
});

export default EditProfileButton;