import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import { addEnterprise, uploadImage, getLastEnterpriseId, checkEnterpriseExists, checkResponsibleNameExists, createUserWithEmailAndPassword, addUser, checkIfUserExists } from '../../firebase/Firestore';
import { launchImageLibrary } from 'react-native-image-picker';
import { useUser } from '../../Context/UserContext';
import currentLog from '../../firebase/UserData';

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

const EnterpriseFormScreen = () => {
  const [resourcePath, setResourcePath] = useState('');
  const [resourcePath2, setResourcePath2] = useState('');
  const [filename, setFileName] = useState('');
  const [filename2, setFileName2] = useState('');
  const { setUser, setLogged } = useUser();
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
    if (
      data.nameEnterprise.trim() === '' ||
      data.responsibleName.trim() === '' ||
      data.location.trim() === '' ||
      data.description.trim() === '' ||
      data.rif.trim().length < 6 ||
      data.password.trim() === '' ||
      data.phoneNumber.trim() === '' ||
      data.disName.trim() === ''
    ) {
      Alert.alert('Campos Vacíos', 'Por favor, complete todos los campos');
      return;
    }

    if (!validateEmail(data.responsibleName) ) {
      Alert.alert('Correo Electrónico Inválido', 'Por favor, ingrese un correo electrónico válido');
      return;
    }

    const enterpriseExists = await checkEnterpriseExists(data.nameEnterprise);
    if (enterpriseExists) {
      Alert.alert('Empresa Existente', 'La empresa ya existe en la base de datos');
      return;
    }

    const responsibleNameExists = await checkResponsibleNameExists(data.responsibleName);
    if (responsibleNameExists) {
      Alert.alert('Nombre de Responsable Existente', 'El nombre de responsable ya existe en la base de datos');
      return;
    }

    if (resourcePath === '' || resourcePath2 === '') {
        Alert.alert('Error', 'Dude introduce pictures vale');
    } else {
      uploadImage(resourcePath, filename).then((url) => {
        addEnterprise(
        data.nameEnterprise,
        data.rif,
        data.responsibleName,
        data.location,
        data.description,
        data.vip,
        data.password,
        data.phoneNumber
        ).then(() => {
        });
      });
      if (resourcePath2 !== ''){
        Alert.alert('Empresa creada', 'La empresa se ha creado exitosamente');
        await createUserWithEmailAndPassword(data.responsibleName, data.password,data.phoneNumber,resourcePath2, data.disName);
        if (await checkIfUserExists(data.responsibleName) === false) {
          await addUser([''],data.disName,data.responsibleName,false,resourcePath2,);
        }
        loadLastId();
        setUser(currentLog());
        setLogged(true);
      }
    }
  };

  const selectImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        Alert.alert('Not Image', 'No se ha elegido una imagen');
      } else if (response.errorCode) {
        Alert.alert('ImagePicker Error', response.errorMessage || 'Error');
      } else {
        const selectedAsset = response.assets && response.assets[0];
        if (selectedAsset) {
          setResourcePath(selectedAsset.uri);
          setFileName(selectedAsset.uri.substring(selectedAsset.uri.lastIndexOf('/') + 1));
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
        if (selectedAsset2) {
          setResourcePath2(selectedAsset2.uri);
          setFileName2(selectedAsset2.uri.substring(selectedAsset2.uri.lastIndexOf('/') + 1));
        }
      }
    });
  };

  return (
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
              <TextInput
                style={styles.input}
                onChangeText={(text) => setData((prevData) => ({ ...prevData, rif: text, password: text }))}
              />
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
                onChangeText={(text) => setData((prevData) => ({ ...prevData, phoneNumber: text }))}
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={selectImage}>
              <Text style={styles.buttonText}>Subir imagen/logo principal de la empresa</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={selectImage2}>
              <Text style={styles.buttonText}>Subir imagen/propia</Text>
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
  input: {
    marginTop: 8,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 24,
    color: 'black',
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    height: 40,
    width: 200,
    borderRadius: 5,
    justifyContent: 'center',
    backgroundColor: '#1881B1',
    marginTop: 40,
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
