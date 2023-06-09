import React, { useState, useEffect, useContext } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import PhotoProfile from '../../Components/Profiles/photoProfile';
import currentLog from '../../firebase/UserData';
import { useUser } from '../../Context/UserContext';
import {
  LoadingScreenTransparentBackground,
  checkUserExist,
  fetchUserId,
  getUser,
  returnEnterpisePic,
  updateProfile,
  updateResponsibleData,
  updateUserDataByEmail,
  uploadImage,
} from '../../firebase/Firestore';
import { launchImageLibrary } from 'react-native-image-picker';
import { ValuesContext } from '../../Context/ValuesContext';

const validateNumber = (number: string): boolean => {
  const numberRegExp = /^[0-9]+$/;
  return numberRegExp.test(number);
};

const validateLetters = (letter: string): boolean => {
  const ExpRegSoloLetras = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/;
  return ExpRegSoloLetras.test(letter);
};
interface EditProfileScreenProps {
  navigation: NavigationProp<Record<string, object | undefined>>;
}

const EditProfileScreen = ({ navigation }: EditProfileScreenProps) => {
  const { actualizaPerfil, setActualizaPerfil } = useContext(ValuesContext);
  const [resourcePath, setResourcePath] = useState('');
  const [filename, setFileName] = useState('');
  const user = currentLog();
  const [loadingSomeThing, setLoadingSomething] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [responsibleEmail, setResponsibleEmail] = useState('');
  const [isFormEdited, setFormEdited] = useState(false);
  const [email, setEmail] = useState('');

  const handleNameChange = (text: string) => {
    setName(text);
    setFormEdited(true);
  };

  const handlePhoneNumberChange = (text: string) => {
    setPhoneNumber(text);
    setFormEdited(true);
  };

  useEffect(() => {
    const fetchEnterprisePic = async () => {
      setLoadingSomething(true);
      setLoading(true);
      const emailUser = await checkUserExist(user?.email);
      const emailEnterprise = await returnEnterpisePic(user?.email);

      if (emailUser != null) {
        setPhoneNumber(emailUser.phoneNumber);
        setName(emailUser.displayName);
        setResponsibleEmail(user?.email);
        setFileName(user?.photoURL);
        setLoading(false);
        setLoadingSomething(false);
      } else if (emailEnterprise != null) {
        setPhoneNumber(emailEnterprise.phoneNumber);
        setName(emailEnterprise.disName);
        setResponsibleEmail(user?.email);
        setFileName(user?.photoURL);
        setLoading(false);
        setLoadingSomething(false);
      } else {
        setPhoneNumber(user?.phoneNumber);
        setName(user?.displayName);
        setResponsibleEmail(user?.email);
        setFileName(user?.photoURL);
        setLoading(false);
        setLoadingSomething(false);
      }
    };

    fetchEnterprisePic();
  }, []);

  const submit = async () => {
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

    if (phoneNumber.trim().length !== 11) {
      Alert.alert(
        'Error',
        'Por favor, ingrese un número de teléfono válido (11 dígitos)',
      );
      setLoading(false);
      return;
    }

    if (!validateNumber(phoneNumber.toString())) {
      Alert.alert(
        'Número Teléfono Inválido',
        'Por favor, ingrese un número de teléfono válido (11 dígitos)',
      );
      setLoading(false);
      return;
    }

    if (!validateLetters(name.toString())) {
      Alert.alert('Dato Inválido', 'Por favor, ingrese un nombre válido');
      setLoading(false);
      return;
    }

    if (resourcePath === '') {
      Alert.alert(
        'Por favor seleccione una foto',
      );
      setLoading(false);
      return;
    }
    const url1 = await uploadImage(resourcePath, filename);
    setLoading(false);
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

            const userId = await fetchUserId(responsibleEmail.toLowerCase());
            if (userId) {
              const dataToUpdate = {
                disName: name,
                phoneNumber: phoneNumber,
                photoURL: url1,
              };

              await updateResponsibleData(userId, dataToUpdate);

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
              setLoading(false);
            }

            await updateUserDataByEmail(user?.email, name, url1, phoneNumber);
            await updateProfile(name, url1);

            await setActualizaPerfil(!actualizaPerfil);
            navigation.navigate('HomeScreen');
          },
        },
      ],
    );
  };

  const selectImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (response.didCancel) {
        Alert.alert('No se ha elegido una imagen');
      } else if (response.errorCode) {
        Alert.alert('ImagePicker Error', response.errorMessage || 'Error');
      } else {
        const selectedAsset = response.assets && response.assets[0];
        if (selectedAsset && selectedAsset.uri) {
          setResourcePath(selectedAsset.uri);
          setFileName(
            selectedAsset.uri.substring(selectedAsset.uri.lastIndexOf('/') + 1),
          );
          // Alert.alert('Imagen subida');
        }
      }
    });
  };

  return (
    <>
      {loading && <LoadingScreenTransparentBackground />}
      <ScrollView style={styles.container}>
        <View style={styles.info}>
          <View style={styles.topInfo}>
            <Text style={styles.text}>Editar información</Text>
            <TouchableOpacity onPress={selectImage}>
              <PhotoProfile
                size={100}
                imageSource={
                  user?.photoURL ||
                  'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg'
                }
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer2}
              onPress={selectImage}>
              <Text style={styles.textButton2}>Cambiar foto</Text>
            </TouchableOpacity>
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
                value={responsibleEmail}
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
    </>
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
    fontSize: 14,
    lineHeight: 24,
    color: 'black',
    height: '100%'
  },
  inputContainer: {
    height: 56,
    width: '90%',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginTop: 22,
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    height: 40,
    width: 200,
    borderRadius: 5,
    justifyContent: 'center',
    backgroundColor: '#1881B1',
    marginTop: '3%',
    marginBottom: '3%',
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
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
  buttonContainer2: {
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
  textButton2: {
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

export default EditProfileScreen;
