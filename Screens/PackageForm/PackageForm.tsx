import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { addPackage, uploadImage, getLastPackageId } from '../../firebase/Firestore'; // Importa la función getLastPackageId
import { launchImageLibrary } from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

interface CreateFormData {
  id: number;
  name: string;
  availability: string;
  price: string;
  description: string;
  location: string;
  date: any,
}

const DatePickerBox = ({ writingDate, date, setDate}: { writingDate: boolean; date: Date; setDate: (value: Date) => void;}) => {

  const tempDate = new Date();
  if (writingDate) {

      return <DateTimePicker
      style={styles.label}
      value={new Date()}
      mode="date"
      onChange={(event, selectedDate) => {
          const currentDate = selectedDate || tempDate;
          // console.log('---------------------------------------------');
          // console.log('Date de la variable: ', currentDate);
          // console.log('Date actual: ', tempDate);
          // console.log('Year === 18?: ', tempDate.getFullYear() - currentDate.getFullYear() === 18);
          // const cond1 = !(currentDate.getDay() === tempDate.getDay() && currentDate.getMonth() === tempDate.getMonth() && currentDate.getFullYear() === tempDate.getFullYear());
          // const cond2 = ((((tempDate.getFullYear() - currentDate.getFullYear()) > 21)) || (((tempDate.getFullYear() - currentDate.getFullYear()) === 21)  && (tempDate.getMonth() > currentDate.getMonth())) || (((tempDate.getFullYear() - currentDate.getFullYear()) === 21)  && (tempDate.getMonth() === currentDate.getMonth()) && (tempDate.getDay() > currentDate.getDay())) );

          setDate(currentDate);
          writingDate = false;
      }}
      />;
  }
  return (
    <>
        <Text>{date.toDateString()}</Text>
    </>
  );

  // return null;
};

const CreateForm = () => {
  const [date, setDate] = useState(new Date());
  const [resourcePath, setResourcePath] = useState('');
  const [filename, setFileName] = useState('');
  const [data, setData] = useState<CreateFormData>({
    id: 0, // Inicializa el ID en 0
    name: '',
    availability: '',
    price: '',
    description: '',
    location: '',
    date: null,
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
    if (resourcePath === '') {
      // console.warn(data);
      addPackage(data.id, data.name, data.availability, data.price, data.description, '', data.location, data.date);
    } else {
      const url = await uploadImage(resourcePath, filename);
      // console.log(url);
      // console.warn(data);
      await addPackage(data.id, data.name, data.availability, data.price, data.description, url, data.location, data.date);
    }
    loadLastId(); // Carga el nuevo último ID después de crear el paquete
  };

  const selectImage = (nombre: string, descripcion: string, disponibilidad: string, precio: string, ubicacion: string) => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        Alert.alert('Not Image', 'No se ha elegido una imagen');
        // console.warn('No se ha elegido una imagen');
      } else if (response.errorCode) {
        Alert.alert('ImagePicker Error: ', 'error');
        // console.warn('ImagePicker Error: ', response.errorCode);
      } else {
        const selectedAsset = response.assets && response.assets[0];
        if (selectedAsset) {
          // @ts-ignore
          setResourcePath(selectedAsset.uri);
          // @ts-ignore
          setFileName(selectedAsset.uri.substring(selectedAsset.uri.lastIndexOf('/') + 1));
        }
      }
    });
  };

  return (
    <View style={styles.contenedor}>
      <Text style={styles.label}>Ingrese el nombre del paquete:</Text>
      <TextInput style={styles.textInput} placeholder="Nombre del paquete" onChangeText={(text) => setData((prevData) => ({ ...prevData, name: text }))} />

      <Text style={styles.label}>Ingrese la disponibilidad:</Text>
      <TextInput style={styles.textInput} placeholder="Disponibilidad" onChangeText={(text) => setData((prevData) => ({ ...prevData, availability: text }))} />

      <Text style={styles.label}>Ingrese el precio:</Text>
      <TextInput style={styles.textInput} placeholder="Precio en $ <3" onChangeText={(text) => setData((prevData) => ({ ...prevData, price: text }))} />

      <Text style={styles.label}>Descripción:</Text>
      <TextInput style={styles.textInput} placeholder="Descripcion" onChangeText={(text) => setData((prevData) => ({ ...prevData, description: text }))} />

      <Text style={styles.label}>Ubicación:</Text>
      <TextInput style={styles.textInput} placeholder="Ubicación" onChangeText={(text) => setData((prevData) => ({ ...prevData, location: text }))} />
      
      <Text>Hola que tal, deberia estar aqui bro</Text>
      <DatePickerBox writingDate={true} date={date} setDate={setDate}/>

      <TouchableOpacity style={styles.button} onPress={() => selectImage(data.name, data.description, data.availability, data.price, data.location)}>
        <Text style={styles.buttonText}>Subir imagen principal</Text>
      </TouchableOpacity>

      {resourcePath === '' ? (
        <></>
      ) : (
        <View>
          <Image source={{ uri: resourcePath }} />
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={submit}>
        <Text style={styles.buttonText}>Crear Paquete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1,
  },
  textInput: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#1881B1',
    borderRadius: 25,
    width: 360,
    height: 60,
    gap: 20,
    padding: 20,
    flex: 1,
  },

  label: {
    color: '#1881B1',
    fontFamily: 'Poppins-medium',
    fontSize: 16,
    marginTop: 20,
    marginBottom: 5,
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    height: 40,
    width: 200,
    borderRadius: 50,
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
});

export default CreateForm;
