import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import { addEnterprise, uploadImage, getLastEnterpriseId, checkEnterpriseExists, checkResponsibleNameExists, createUserWithEmailAndPassword, addUser, checkIfUserExists, LoadingScreenTransparentBackground } from '../../firebase/Firestore';
import { launchImageLibrary } from 'react-native-image-picker';
import { useUser } from '../../Context/UserContext';
import currentLog from '../../firebase/UserData';
import { LoadingScreen } from '../../firebase/Firestore';
import { NavigationProp } from '@react-navigation/native';

interface EnterpriseFormData {
  id: number;
  nameEnterprise: string;
  responsibleName: string;
  location: string;
  description: string;
  rif: string;
  vip: boolean;
  password: string;
  phoneNumber: string;
  disName: string;
}

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateNumber= (rif: string): boolean => {
  const numberRegExp = /^[0-9]+$/;
  return numberRegExp.test(rif);
}

const EnterpriseFormScreen = ({navigation}: {navigation: NavigationProp<Record<string, object | undefined>>}) => {
  const [resourcePath, setResourcePath] = useState('');
  const [resourcePath2, setResourcePath2] = useState('');
  const [filename, setFileName] = useState('');
  const [filename2, setFileName2] = useState('');
  const { setUser, setLogged } = useUser();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<EnterpriseFormData>({
    id: 0,
    nameEnterprise: '',
    responsibleName: '',
    location: '',
    description: '',
    rif: '',
    vip: false,
    password: '',
    phoneNumber: '',
    disName:'',
  });

  useEffect(() => {
    loadLastId();
  }, []);

  const loadLastId = async () => {
    const lastId = await getLastEnterpriseId();
    setData((prevData) => ({ ...prevData, id: lastId + 1 }));
  };

  const submit = async () => {
    let isDone = false;
    setLoading(true);

    if (
      data.nameEnterprise.trim() === '' ||
      data.responsibleName.trim() === '' ||
      data.location.trim() === '' ||
      data.description.trim() === '' ||
      data.password.trim() === '' ||
      data.phoneNumber.trim() === '' ||
      data.disName.trim() === ''
    ) {
      Alert.alert('Campos Vacíos', 'Por favor, complete todos los campos');
      setLoading(false);
      return;
    }

      const passwordInt = parseInt(data.password);

      const phoneNumberInt = parseInt(data.phoneNumber);

      if (Number.isInteger(passwordInt) && Number.isInteger(phoneNumberInt) ){}
      else {
        Alert.alert('Revise el rif o el numero de teléfono no son números');
        setLoading(false);
        return;
      }

    if (data.rif.trim().length < 6){
      Alert.alert('Error','El Rif es demasiado corto');
      setLoading(false);
      return;
    }

    if (!validateNumber(data.rif.toString())) {
      Alert.alert('Rif Inválido', 'Por favor, ingrese un rif válido (Sólo caracteres numéricos)');
      setLoading(false);
      return;
    }

    if (data.phoneNumber.trim().length < 11 || data.phoneNumber.trim().length > 11){
      Alert.alert('Error','Por favor, ingrese un número de teléfono válido (11 dígitos)');
      setLoading(false);
      return;
    }

    if (!validateNumber(data.phoneNumber.toString())) {
      Alert.alert('Número Teléfono Inválido', 'Por favor, ingrese un número de teléfono válido (11 dígitos)');
      setLoading(false);
      return;
    }

    if (!validateEmail(data.responsibleName.toLowerCase()) ) {
      Alert.alert('Correo Electrónico Inválido', 'Por favor, ingrese un correo electrónico válido');
      setLoading(false);
      return;
    }

    const enterpriseExists = await checkEnterpriseExists(data.nameEnterprise);
    if (enterpriseExists) {
      Alert.alert('Empresa Existente', 'La empresa ya existe en la base de datos');
      setLoading(false);
      return;
    }

    const responsibleNameExists = await checkResponsibleNameExists(data.responsibleName.toLowerCase());
    if (responsibleNameExists) {
      Alert.alert('Nombre de Responsable Existente', 'El nombre de responsable ya existe en la base de datos');
      setLoading(false);
      return;
    }

    if (resourcePath === '' || resourcePath2 === '') {
      Alert.alert('Error', 'Agrega una imagen');
      setLoading(false);
      return;
    } else {

      const url1 = await uploadImage(resourcePath, filename);
      const url2 = await uploadImage(resourcePath2, filename2);
        
        addEnterprise(
          data.nameEnterprise,
          data.rif,
          data.responsibleName.toLowerCase(),
          data.disName,
          data.location,
          data.description,
          data.vip,
          data.password,
          data.phoneNumber,
          url1,
          url2
          );
        if (resourcePath2 !== ''){
          // setLoading(true);
          await createUserWithEmailAndPassword(data.responsibleName.toLowerCase(), data.password,data.phoneNumber,url2, data.disName);
          if (await checkIfUserExists(data.responsibleName.toLowerCase()) === false && url2) {
            await addUser([''],data.disName,data.responsibleName.toLowerCase(),false,url2,data.phoneNumber);
          }
          loadLastId();
          setUser(currentLog());
          setLogged(true);
          // setLoading(false); // Ocultar la pantalla de carga después de 3 segundos

        }
        isDone = true;
        Alert.alert('Empresa creada', 'La empresa se ha creado exitosamente');
        // setLoading(false);

      }
      setLoading(false);
      if (isDone) {navigation.navigate('HomeScreen');}

    };

    const selectImage = () => {
      launchImageLibrary({ mediaType: 'photo' }, (response) => {
        if (response.didCancel) {
          Alert.alert('Not Image', 'No se ha elegido una imagen');
        } else if (response.errorCode) {
          Alert.alert('ImagePicker Error', response.errorMessage || 'Error');
        } else {
          const selectedAsset = response.assets && response.assets[0];
          if (selectedAsset && selectedAsset.uri) {
            setResourcePath(selectedAsset.uri);
            setFileName(selectedAsset.uri.substring(selectedAsset.uri.lastIndexOf('/') + 1));
            Alert.alert('Done', 'Image uploaded');
          }
        }
      });
    };

    const selectImage2 = () => {

      launchImageLibrary({ mediaType: 'photo' }, (response) => {
        if (response.didCancel) {
          Alert.alert('Not Image', 'No se ha elegido una imagen');
        } else if (response.errorCode) {
          Alert.alert('ImagePicker Error', response.errorMessage || 'Error');
        } else {
          const selectedAsset2 = response.assets && response.assets[0];
          if (selectedAsset2 && selectedAsset2.uri) {
            setResourcePath2(selectedAsset2.uri);
            setFileName2(selectedAsset2.uri.substring(selectedAsset2.uri.lastIndexOf('/') + 1));
            Alert.alert('Done', 'picture uploaded');
          }
        }
      });
    };

    // if (loading) {
      //   return <LoadingScreen />;
      // }
      return (
        <>
    {loading && (
      <LoadingScreenTransparentBackground/>
      )}
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>¡Agrega tu Empresa con AventuraT!</Text>
      </View>
      <View style={styles.formContainer}>
        <ScrollView style={styles.scrollFormContainer}>
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nombre de la empresa</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) => setData((prevData) => ({ ...prevData, nameEnterprise: text }))}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>RIF</Text>
              <View style={styles.flexEnRaw}>
              <Text style={styles.label2}>J-</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  onChangeText={(text) => setData((prevData) => ({ ...prevData, rif: text, password: text }))}
                />
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nombre de la persona responsable</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) => setData((prevData) => ({ ...prevData, disName: text }))}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Correo de la persona responsable</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) => setData((prevData) => ({ ...prevData, responsibleName: text }))}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Ubicación de la empresa</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) => setData((prevData) => ({ ...prevData, location: text }))}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Breve descripción</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) => setData((prevData) => ({ ...prevData, description: text }))}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Numero de teléfono</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                onChangeText={(text) => setData((prevData) => ({ ...prevData, phoneNumber: text }))}
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={selectImage}>
              <Text style={styles.buttonText}>Subir imagen/logo principal de la empresa</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={selectImage2}>
              <Text style={styles.buttonText}>Subir imagen/Responsable</Text>
            </TouchableOpacity>
            {resourcePath === '' ? (
              <></>
            ) : (
              <View>
                <Image source={{ uri: resourcePath }} />
              </View>
            )}
          </View>
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.submitButton} onPress={submit}>
          <Text style={styles.buttonText}>Crear Empresa</Text>
        </TouchableOpacity>
      </View>
    </View>
  </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#1DB5BE',
  },
  header: {
    flex: 3,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollFormContainer: {
    width: '100%',
  },
  formContainer: {
    flex: 14.5,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  inputContainer: {
    height: 52,
    width: '80%',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginTop: 22,
  },
  flexEnRaw:{
    flexDirection:'row',
    alignItems:'center',
    gap:8,
  },
  title: {
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 36,
    textAlign: 'center',
    color: '#FFFFFF',
    width: '90%',
  },
  label: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 24,
    color: 'black',
  },
  label2: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    lineHeight: 18,
    color: 'black',

  },
  input: {
    marginTop: 10,
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    lineHeight: 24,
    color: 'black',
  },
  input2: {
    marginTop: 10,
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    lineHeight: 16,
    color: 'black',
    width:'100%',
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
    marginBottom:'3%',
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  },
  footer: {
    flex: 2,
    width: '100%',
    marginTop: 50,
    alignItems: 'center',
  },
  submitButton: {
    display: 'flex',
    alignItems: 'center',
    height: 40,
    width: 200,
    borderRadius: 5,
    justifyContent: 'center',
    backgroundColor: '#1881B1',
  },
});

export default EnterpriseFormScreen;
