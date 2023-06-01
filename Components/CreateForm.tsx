import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import { addPackage, uploadImage, getLastPackageId } from '../firebase/Firestore'; // Importa la función getLastPackageId
import { launchImageLibrary } from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useUser } from '../Context/UserContext';
import firestore from '@react-native-firebase/firestore';

const DatePickerBox = ({text, writingDate, setWritingDate, date, setEndDate }:{
  text: string;
  writingDate: boolean;
  date: Date;
  setWritingDate: (value: boolean) => void;
  setEndDate: (value: Date) => void;
}) => {
  const handleDateChange = async (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setEndDate(currentDate);
    setWritingDate(false);
  };

  if (writingDate) {
    return (
      <DateTimePicker
        value={date}
        mode="date"
        onChange={(event, selectedDate) => {
          handleDateChange(event, selectedDate);
        }}
      />
    );
  }

  return (
    <>
      <Text style={styles.label1}>
        {text} {date.toDateString()}
      </Text>
    </>
  );
};

interface CreateFormProps {
  navigation: any;
}

interface CreateFormData {
  id: number;
  name: string;
  availability: string;
  price: string;
  description: string;
  location: string;
  endDate: Date;
  startDate: Date;
  emailEnterprise: string;
  nameEnterprise: string;
  rating: number;
}

const CreateForm = ({ navigation }: CreateFormProps) => {
  const [resourcePath, setResourcePath] = useState('');
  const [filename, setFileName] = useState('');
  const [nameEnterprise, setNameEnterprise] = useState('');

  const {user} = useUser();
  const userEmail = user ? user.email : null;

  const [startDate, setStartDate] = useState(new Date());
  const [writtingStartDate, setWritingStartDate] = useState(false);

  const [endDate, setEndDate] = useState(new Date());
  const [writtingEndDate, setWritingEndDate] = useState(false);

  const [data, setData] = useState<CreateFormData>({
    id: 0, // Inicializa el ID en 0
    name: '',
    availability: '',
    price: '',
    description: '',
    location: '',
    endDate: endDate,
    startDate: startDate,
    emailEnterprise: userEmail,
    nameEnterprise: '',
    rating: 0,
  });

  useEffect(() => {
    // Carga el último ID de Firebase al cargar el componente
    loadLastId();
  }, []);

  const loadLastId = async () => {
    const lastId = await getLastPackageId(); // Obtén el último ID de Firebase
    setData(prevData => ({ ...prevData, id: lastId + 1 })); // Incrementa el ID en 1 para el siguiente paquete
  };

  const submit = async () => {

    const querySnapshot = await firestore().collection('users').where('email', '==', userEmail).get();

    querySnapshot.forEach((doc) => {
      setNameEnterprise(doc.data().displayName.toString());
      // console.log('Try again', doc.data().displayName);
      // console.log('Try again', nameEnterprise);
      data.nameEnterprise = doc.data().displayName;
    });


    data.endDate = endDate;
    data.startDate = startDate;

    if (resourcePath === '') {
      console.log(data);
      await addPackage(
        data.id,
        data.name,
        data.availability,
        data.price,
        data.description,
        '',
        data.location,
        data.endDate,
        data.startDate,
        data.emailEnterprise,
        data.nameEnterprise,
        data.rating,
        );
        // Alert.alert('Veamos la fecha (postData, ya se envió)', data.date);
      } else {
        const url = await uploadImage(resourcePath, filename);
        console.log(url);
        console.log(data);
        await addPackage(
          data.id,
          data.name,
          data.availability,
          data.price,
          data.description,
          url,
          data.location,
          data.endDate,
          data.startDate,
          data.emailEnterprise,
          data.nameEnterprise,
          data.rating,
          );
        }
    await loadLastId(); // Carga el nuevo último ID después de crear el paquete
    Alert.alert('Ya se subió el paquete a la base de datos');
    navigation.navigate('HomeScreen');
  };

  const selectImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (response.didCancel) {
        console.log('No se ha elegido una imagen');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
      } else {
        const selectedAsset = response.assets && response.assets[0];
        if (selectedAsset && selectedAsset.uri) {
          setResourcePath(selectedAsset.uri);
          setFileName(
            selectedAsset.uri.substring(selectedAsset.uri.lastIndexOf('/') + 1),
          );
          Alert.alert('Ya se subió la foto');
        }
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>¡Agrega tu paquete con AventuraT!</Text>
      </View>
        <View style={styles.formContainer}>
          <ScrollView style={styles.scrollFormContainer}>
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Nombre del paquete</Text>
                <TextInput style={styles.input} onChangeText={text => setData(prevData => ({ ...prevData, name: text })) }/>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Cantidad de cupos disponibles</Text>
                <TextInput style={styles.input} onChangeText={text => setData(prevData => ({ ...prevData, availability: text })) }/>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Precio por persona</Text>
                <TextInput style={styles.input} onChangeText={text => setData(prevData => ({ ...prevData, price: text })) }/>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Ubicación</Text>
                <TextInput style={styles.input} onChangeText={text => setData(prevData => ({ ...prevData, location: text })) } />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Breve descripción del paquete</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={text =>
                    setData(prevData => ({ ...prevData, description: text }))
                  }
                />
              </View>
              <TouchableOpacity onPress={() => {setWritingStartDate(true);}} style={styles.inputContainer}>
                <DatePickerBox
                  text="El viaje empieza: "
                  writingDate={writtingStartDate}
                  setWritingDate={setWritingStartDate}
                  date={startDate}
                  setEndDate={setStartDate}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {setWritingEndDate(true);}} style={styles.inputContainer}>
                <DatePickerBox
                  text="El paquete caduca: "
                  writingDate={writtingEndDate}
                  setWritingDate={setWritingEndDate}
                  date={endDate}
                  setEndDate={setEndDate}
                />
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={() => selectImage()}>
                <Text style={styles.buttonText}>Subir imagen/logo principal</Text>
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
        <TouchableOpacity style={styles.submitButton} onPress={() => submit()}>
        {/* <TouchableOpacity style={styles.submitButton} onPress={() => reallyUserFinded(userEmail)}> */}
          <Text style={styles.buttonText}>Crear Paquete</Text>
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
  scrollFormContainer:{
    width: '100%',
  },
  formContainer: {
    // height: 550,
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
  label1: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 24,
    color: '#1881B1',
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


export default CreateForm;
