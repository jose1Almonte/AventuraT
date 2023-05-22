import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { addPackage, uploadImage, getLastPackageId } from '../firebase/Firestore'; // Importa la función getLastPackageId
import { launchImageLibrary } from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const DatePickerBox = ({ writingDate, setWritingDate, date, setDate}: { writingDate: boolean; date: Date; setWritingDate: (value: boolean) => void; setDate: (value: Date) => void;}) => {

  // const tempDate = new Date();

  const handleDateChange = async (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setWritingDate(false);
  };

  if (writingDate) {
      return <DateTimePicker
      // style={styles.label}
      value={new Date()}
      mode="date"
      onChange={(event, selectedDate) => {handleDateChange(event, selectedDate);}}
      />;
    }

  return (
      <>
      <Text style={styles.textColor}> El paquete caduca: {date.toDateString()}</Text>
      </>
    );
};

interface CreateFormProps {
  navigation: any,
}

interface CreateFormData {
  id: number;
  name: string;
  availability: string;
  price: string;
  description: string;
  location: string;
  date: any,
}

const CreateForm = ({navigation}: CreateFormProps) => {
  const [resourcePath, setResourcePath] = useState('');
  const [filename, setFileName] = useState('');

  const [date, setDate] = useState(new Date());
  const [writtingDate, setWritingDate] = useState(false);

  const [data, setData] = useState<CreateFormData>({
    id: 0, // Inicializa el ID en 0
    name: '',
    availability: '',
    price: '',
    description: '',
    location: '',
    date: date,
  });

  useEffect(() => {
    // Carga el último ID de Firebase al cargar el componente
    loadLastId();
  }, []);

  const loadLastId = async () => {
    const lastId = await getLastPackageId(); // Obtén el último ID de Firebase
    setData((prevData) => ({ ...prevData, id: lastId + 1 })); // Incrementa el ID en 1 para el siguiente paquete
  };

  const submit = async () => {
    data.date = date;
    if (resourcePath === '') {
      console.log(data);
      await addPackage(data.id, data.name, data.availability, data.price, data.description, '', data.location, data.date);
      // Alert.alert('Veamos la fecha (postData, ya se envió)', data.date);
    } else {
      const url = await uploadImage(resourcePath, filename);
      console.log(url);
      console.log(data);
      await addPackage(data.id, data.name, data.availability, data.price, data.description, url, data.location, data.date);
    }
    await loadLastId(); // Carga el nuevo último ID después de crear el paquete
    Alert.alert('Ya se subió el paquete a la base de datos');
    navigation.navigate('HomeScreen');
  };

  const selectImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('No se ha elegido una imagen');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
      } else {
        const selectedAsset = response.assets && response.assets[0];
        if (selectedAsset) {
          setResourcePath(selectedAsset.uri);
          setFileName(selectedAsset.uri.substring(selectedAsset.uri.lastIndexOf('/') + 1));
          Alert.alert('Ya se subió la foto');
        }
      }
    });

  };

  return (
    <View style={styles.giantBox}>

      <View style={styles.firstBox}>
        <Text style= {styles.title}>¡Agrega tu paquete con AventuraT!</Text>
      </View>

      <View style={styles.secondBox}>

      <View style={styles.secondBoxMiniBox}>
      {/* <Text style={styles.label}>Ingrese el nombre del paquete:</Text> */}
      <TextInput style={styles.textInput} placeholder="Ingrese el nombre del paquete" placeholderTextColor={'#323F4B'} onChangeText={(text) => setData((prevData) => ({ ...prevData, name: text }))} />
      </View>

      <View style={styles.secondBoxMiniBox}>
      {/* <Text style={styles.label}>Ingrese la disponibilidad:</Text> */}
      <TextInput style={styles.textInput} placeholder="Nro de cupos disponibles" placeholderTextColor={'#323F4B'} onChangeText={(text) => setData((prevData) => ({ ...prevData, availability: text }))} />
      </View>

      <View style={styles.secondBoxMiniBox}>
      {/* <Text style={styles.label}>Ingrese el precio:</Text> */}
      <TextInput style={styles.textInput} placeholder="Precio en Bs." placeholderTextColor={'#323F4B'} onChangeText={(text) => setData((prevData) => ({ ...prevData, price: text }))} />
      </View>

      <View style={styles.secondBoxMiniBox}>
      {/* <Text style={styles.label}>Descripción:</Text> */}
      <TextInput style={styles.textInput} placeholder="Ingrese una breve descrip. del paq." placeholderTextColor={'#323F4B'} onChangeText={(text) => setData((prevData) => ({ ...prevData, description: text }))} />
      </View>

      <View style={styles.secondBoxMiniBox}>
      {/* <Text style={styles.label}>Ubicación:</Text> */}
      <TextInput style={styles.textInput} placeholder="Ubicación" placeholderTextColor={'#323F4B'} onChangeText={(text) => setData((prevData) => ({ ...prevData, location: text }))} />
      </View>

      <TouchableOpacity onPress={() => {setWritingDate(true);}} style={styles.secondBoxMiniBox}>
        <DatePickerBox writingDate = {writtingDate} setWritingDate = {setWritingDate}  date={date} setDate={setDate} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => selectImage(data.name, data.description, data.availability, data.price, data.location)}>
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

      <View style={styles.thirdBox}>
      <TouchableOpacity style={styles.button} onPress={() => {submit();}}>
        <Text style={styles.buttonText}>Crear Paquete</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  giantBox: {
    alignItems: 'center',
    backgroundColor: '#1DB5BE',
    flex: 1,
  },

  firstBox:{
    flex: 20.625,
    // backgroundColor: 'red',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  secondBox:{
    flex: 65.875,
    // backgroundColor: 'green',
    width: '100%',
    alignItems: 'center',
  },
  thirdBox:{
    flex: 13.5,
    // backgroundColor: 'black',
    width: '100%',
    alignItems: 'center',
  },

  secondBoxMiniBox:{
    height: '10.882%',
    width: '80.278%',
    // backgroundColor: 'grey',
    justifyContent: 'center',
    marginTop: '1%',
    marginBottom: '2%',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },

  title: {
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 36,
    textAlign: 'center',
    color: '#FFFFFF',
    width: '90%',
    // backgroundColor: 'black',
    marginBottom: '3%',
  },

  textInput:{
    // fontFamily: 'Poppins',
    // fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    color: 'white',
  },

  button: {
    display: 'flex',
    alignItems: 'center',
    height: 40,
    width: 200,
    borderRadius: 5,
    justifyContent: 'center',
    backgroundColor: '#1881B1',
    marginTop: 20,
    marginBottom: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  },
  textColor:{
    color: 'black',
  },
});

export default CreateForm;
