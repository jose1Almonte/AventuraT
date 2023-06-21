import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import React, {Component, useState, useEffect} from 'react';
import {NavigationProp} from '@react-navigation/native';
import PhotoProfile from '../../Components/Profiles/photoProfile';
import currentLog from '../../firebase/UserData';
import {useUser} from '../../Context/UserContext';
import {
  LoadingScreenTransparentBackground,
  returnEnterpisePic, updateResponsibleData } from '../../firebase/Firestore';
  import firestore from '@react-native-firebase/firestore';

// import firebase from 'firebase';
// import 'firebase/firestore';


interface UserDataForm {
    id: number
  disName: string;
  responsibleName: string;
  phoneNumber: string;
}

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateNumber = (rif: string): boolean => {
  const numberRegExp = /^[0-9]+$/;
  return numberRegExp.test(rif);
};



const EditProfileScreen = ({
  navigation,
}: {
  navigation: NavigationProp<Record<string, object | undefined>>;
}) => {
  const user = currentLog();
  const [userExists, setUserExists] = useState(false);
  const {setUser, setLogged} = useUser();
  const [loadingSomeThing, setLoadingSomething] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [responsibleEmail, setResponsibleEmail] = useState('');
  const [isFormEdited, setFormEdited] = useState(false);

  //   const [ phoneNumber, s]

  //   const [data, setData] = useState<UserDataForm>({
  //     responsibleName: '',
  //     phoneNumber: '',
  //     disName:'',
  //   });

  //   const handleChange = (text: string) => {
  //     setName(text);
  //     setPhoneNumber(text);
  //     setResponsibleEmail(text)
  //   };

  const handleNameChange = (text: string) => {
    // disName:'';
    setName(text);
    setFormEdited(true);
  };

  const handlePhoneNumberChange = (text: string) => {
    setPhoneNumber(text);
    setFormEdited(true);
  };

  const handleResponsibleEmailChange = (text: string) => {
    setResponsibleEmail(text);
    setFormEdited(true);
  };

  useEffect(() => {
    const fetchEnterprisePic = async () => {
      setLoadingSomething(true);
      const user = currentLog();
      const email = await returnEnterpisePic(user?.email);
      if (email != null) {
        setPhoneNumber(email.phoneNumber);
        setName(user?.displayName);
        setResponsibleEmail(user?.email)
      }
      setLoadingSomething(false);
    };

    fetchEnterprisePic();
  }, []);

//   const [data, setData] = useState<UserDataForm>({
//     id: 0,
//     responsibleName: '',
//     phoneNumber: '',
//     disName:'',
//   });

  const handleSaveChanges = async () => {
    try {
      setLoadingSomething(true);
  const usersCollection2 = firestore().collection('enterprise');
      // Obtenemos la referencia al documento del usuario en la base de datos
      const userRef = usersCollection2
  
      // Realizamos la actualización de los campos necesarios
      await updateResponsibleData({
        responsibleName: name,
        phoneNumber: phoneNumber,
        disName: responsibleEmail,
      });
  
      // Actualizamos los estados necesarios o realiza alguna acción adicional
  
      setLoadingSomething(false);
      // Mostrar mensaje de éxito, navegar a otra pantalla, etc.
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
      // Mostrar mensaje de error al usuario
      setLoadingSomething(false);
    }
  };

  const submit = async () => {
    let isDone = false;
    setLoading(true);

    if (
      name.trim() === '' ||
      phoneNumber.trim() === '' ||
      responsibleEmail.trim() === ''
    ) {
      Alert.alert('Campos Vacíos', 'Por favor, complete todos los campos');
      setLoading(false);
      return;
    }

    if (phoneNumber.trim().length < 11 || phoneNumber.trim().length > 11){
      Alert.alert('Error','Por favor, ingrese un número de teléfono válido (11 dígitos)');
      setLoading(false);
      return;
    }

    if (!validateNumber(phoneNumber.toString())) {
      Alert.alert('Número Teléfono Inválido', 'Por favor, ingrese un número de teléfono válido (11 dígitos)');
      setLoading(false);
      return;
    }

    if (!validateEmail(responsibleEmail.toLowerCase()) ) {
      Alert.alert('Correo Electrónico Inválido', 'Por favor, ingrese un correo electrónico válido');
      setLoading(false);
      return;
    }


    updateResponsibleData(
        responsibleEmail.toLowerCase(),
        phoneNumber,
        name.toLowerCase(),
        );
    //   console.log(name)
      console.log(phoneNumber)
    isDone = true;
    Alert.alert('Cambios guardados', 'Los datos se han guardado exitosamente');
    //   // setLoading(false);
    //   setLoading(false);
    //   if (isDone) {navigation.navigate('HomeScreen');}
    }
    

    



  return (
    <ScrollView style={styles.container}>
      <View style={styles.info}>
        <View style={styles.topInfo}>
          <Text style={styles.text}>Editar información</Text>
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
            <TextInput
              style={styles.input}
              onChangeText={handleNameChange}
              value={name}></TextInput>


              
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>Correo electrónico</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleResponsibleEmailChange}
              value={responsibleEmail}
              ></TextInput>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>Número de teléfono</Text>
            <TextInput
              style={styles.input}
              onChangeText={handlePhoneNumberChange}
              value={phoneNumber}></TextInput>
          </View>
        </View>

        <TouchableOpacity onPress={submit}>
          <View
            style={[
              styles.buttonContainer,
              isFormEdited ? styles.buttonContainerActive : null,
            ]}>
            <Text style={styles.textButton}>Guardar cambios</Text>
            
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    gap: 10,
  },
  input: {
    marginTop: 8,
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    lineHeight: 24,
    color: 'black',
    marginBottom: 3,
  },
  inputContainer: {
    height: 56,
    width: '90%',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginTop: 22,
    // gap: 15
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    // alignContent: 'center',
    height: 40,
    width: 200,
    borderRadius: 50,
    justifyContent: 'center',
    backgroundColor: '#1881b1a6',
    marginTop: '3%',
    marginBottom: '3%',
    alignSelf: 'center',
  },
  buttonContainerActive: {
    backgroundColor: '#1881b1', // Cambia el color a tu elección
  },
  text: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
  },
  textLabel: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: 'black',
    // textAlign: 'center',
  },
  textButton: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: 'white',
  },
});

export default EditProfileScreen;
