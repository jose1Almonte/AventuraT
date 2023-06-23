import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import PhotoProfile from '../../Components/Profiles/photoProfile';
import currentLog from '../../firebase/UserData';
import {useUser} from '../../Context/UserContext';
import {
    LoadingScreenTransparentBackground,
    checkIfUserExists,
    checkResponsibleNameExists,
  fetchUserId2,
  returnEnterpisePic,
  updateDataUser,
  updateUser,
} from '../../firebase/Firestore';

const validateNumber = (number: string): boolean => {
  const numberRegExp = /^[0-9]+$/;
  return numberRegExp.test(number);
};

const validateLetters = (letter: string): boolean => {
  const ExpRegSoloLetras = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/;
  return ExpRegSoloLetras.test(letter);
};



const EditProfileEnterprise = ({
  navigation,
}: {
  navigation: NavigationProp<Record<string, object | undefined>>;
}) => {
  const user = currentLog();
  const [loadingSomeThing, setLoadingSomething] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isFormEdited, setFormEdited] = useState(false);

  const handleNameChange = (text: string) => {
    setName(text);
    setFormEdited(true);
  };

  const handlePhoneNumberChange = (text: string) => {
    setPhoneNumber(text);
    setFormEdited(true);
  };

//   useEffect(() => {
//     const fetchEnterprisePic = async () => {
//       setLoadingSomething(true);
//       const user = currentLog();
//       const email = await returnEnterpisePic(user?.email);
//       if (email != null) {
//         // setPhoneNumber(user?.displayName);
//         setName(email.displayName);
//         setUserEmail(email.email);
//       }
//       setLoadingSomething(false);
//     };

//     fetchEnterprisePic();
//   }, []);

const [userExists, setUserExists] = useState(false);

useEffect(() => {
    const checkUserExists = async () => {
      setLoadingSomething(true);

      const userEmail = user?.email;

      // console.log(userEmail);
      const exists = await checkIfUserExists(userEmail);

      if (exists != null) {
        setName(exists.displayName)
      setUserEmail(userEmail)
      setUserExists(exists);
      setLoadingSomething(false);
      }
      // console.log(exists);
    //   setName(exists.displayName)
    //   setUserEmail(userEmail)
    //   setUserExists(exists);
    //   setLoadingSomething(false);
    };

    checkUserExists();
  }, [user?.email]);

  if (loadingSomeThing){
    return (
      <LoadingScreenTransparentBackground />
    );}
  const submit = async () => {
    if (
      name.trim() === '' ||
      phoneNumber.trim() === '' ||
      userEmail.trim() === ''
    ) {
      Alert.alert('Campos Vacíos', 'Por favor, complete todos los campos');
      return;
    }

    if (phoneNumber.trim().length !== 11) {
      Alert.alert(
        'Error',
        'Por favor, ingrese un número de teléfono válido (11 dígitos)',
      );
      return;
    }

    if (!validateNumber(phoneNumber.toString())) {
      Alert.alert(
        'Número Teléfono Inválido',
        'Por favor, ingrese un número de teléfono válido (11 dígitos)',
      );
      return;
    }

    if(!validateLetters(name.toString())){
      Alert.alert(
        'Dato Inválido',
        'Por favor, ingrese un nombre válido',
      );
      return;
    }

    Alert.alert(
      'Confirmar Actualización',
      '¿Estás seguro de que deseas guardar los cambios?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Aceptar',
          onPress: async () => {
            setLoading(true);

            const userId = await fetchUserId2(userEmail.toLowerCase());
            if (userId) {
              const dataToUpdate = {
                // responsibleName: responsibleEmail.toLowerCase(),
                displayName: name,
                phoneNumber: phoneNumber,
                
              };

              await updateDataUser(userId, dataToUpdate);
              // console.log(responsibleEmail);
              console.log(name)
              console.log(user?.displayName)
              console.log(user?.email)
              console.log(phoneNumber)

              Alert.alert(
                'Actualización Exitosa',
                'Los cambios se han guardado correctamente',
              );

              setLoading(false);
              setFormEdited(false);
            } else {
              console.log(
                'No se encontró ningún usuario con el correo electrónico especificado',
              );
              Alert.alert(
                'Usuario no encontrado',
                'No se encontró ningún usuario con el correo electrónico especificado',
              );
              setLoading(false);
            }
          },
        },
      ],
    );
  };

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
              value={name}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>Correo electrónico</Text>
            <TextInput
              style={styles.textEmail}
              //No es editable porque se está utilizando el correo electrónico como Id del usuario para acceder a sus datos en la base de datos
              editable={false}
              value={userEmail}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>Número de teléfono</Text>
            <TextInput
              style={styles.input}
              onChangeText={handlePhoneNumberChange}
              value={phoneNumber}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={selectImage}>
              <Text style={styles.buttonText}>Subir imagen/logo principal de la empresa</Text>
            </TouchableOpacity>
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
  },
  info: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  topInfo: {
    marginTop: '20%',
    alignItems: 'center',
    gap: 25,
  },
  bottomInfo: {
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
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
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
    backgroundColor: '#1881b1',
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
  },
  textButton: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: 'white',
  },
  textEmail: {
    color: '#787272',
    marginTop: 8,
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    lineHeight: 24,
    marginBottom: 3,
  },
});

export default EditProfileEnterprise;
