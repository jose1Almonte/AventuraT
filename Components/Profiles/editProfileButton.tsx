import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Alert} from 'react-native';

class EditProfileButton extends Component {
  render() {
    return (
      <TouchableOpacity style={styles.containerButton} onPress={()=>(Alert.alert('Nada','Todavía no hago nada xd'))}>
        <View style={styles.container}>
          <Text style={styles.txt}>Editar perfil</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  containerButton: {
    display: 'flex',
    alignItems: 'center',
  },
  container: {
    height: 40,
    width: 140,
    borderRadius: 5,
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
