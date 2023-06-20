import {Text, StyleSheet, View, TextInput, TouchableOpacity} from 'react-native';
import React, {Component, useState} from 'react';
import {NavigationProp} from '@react-navigation/native';
import PhotoProfile from '../../Components/Profiles/photoProfile';
import currentLog from '../../firebase/UserData';

const EditProfileScreen = ({
  navigation,
}: {
  navigation: NavigationProp<Record<string, object | undefined>>;
}) => {
  const user = currentLog();
  const [userExists, setUserExists] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <View style={styles.topInfo}>
          <Text style={styles.text}>Editar</Text>
          <PhotoProfile
            size={100}
            imageSource={
              user?.photoURL
                ? user.photoURL
                : 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg'
            }
          />
        </View>
        <View style={styles.bottomInfo}>
          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>Nombre completo</Text>
            <TextInput style={styles.input} placeholder='Nombre completo'/>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>Correo electrónico</Text>
            <TextInput style={styles.input} placeholder='Correo electrónico'/>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>Número de teléfono</Text>
            <TextInput style={styles.input} placeholder='Número de teléfono'/>
          </View>
        </View>

        <TouchableOpacity>
            <View style={styles.buttonContainer}>
                <Text style={styles.textButton}>Guardar cambios</Text>
            </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'green',
  },
  info: {
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignContent: 'center',
    // alignItems: 
  },
  topInfo: {
    // backgroundColor: 'purple',
    marginTop: '20%',
    alignItems: 'center',
    gap: 25,
  },
  bottomInfo: {
    // backgroundColor: 'blueviolet',
    margin: '10%',
    gap: 10
  },
  input: {
    marginTop: 8,
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    lineHeight: 24,
    color: 'black',
    marginBottom: 3
  },
  inputContainer: {
    height: 52,
    width: '90%',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginTop: 22,
    // gap: 15
  },
  buttonContainer:{
    display: 'flex',
    alignItems: 'center',
    // alignContent: 'center',
    height: 40,
    width: 200,
    borderRadius: 50,
    justifyContent: 'center',
    backgroundColor: '#1881B1',
    marginTop: '3%',
    marginBottom:'3%',
    alignSelf: 'center'
  },
  text: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
  },
  textLabel:{
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: 'black',
    // textAlign: 'center',
  },
  textButton:{
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color:'white'
  }
});

export default EditProfileScreen;
