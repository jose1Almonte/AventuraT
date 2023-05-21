import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { addPackage, checkPackage, uploadImage, getLastPackageId } from '../firebase/Firestore'; // Importa la función getLastPackageId
import { launchImageLibrary } from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';


const DatePickerBox = ({ writingDate, setWritingDate, date, setDate, data, setData}: { writingDate: boolean; date: Date; setWritingDate: (value: boolean) => void; setDate: (value: Date) => void; data: any; setData: any}) => {

  // const tempDate = new Date();

  const handleDateChange = async (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setWritingDate(false);
  };

  if (writingDate) {
      return <DateTimePicker
      style={styles.label}
      value={new Date()}
      mode="date"
      onChange={(event, selectedDate) => {handleDateChange(event, selectedDate);}}
      />;
    }

  return (
      <>
      <Text style={styles.textColor}>{date.toDateString()}</Text>
      </>
    );
};

interface CreateFormData {
  id: number;
  name: string;
  availability: string;
  price: string;
  description: string;
  location: string;
  date: any,
}

const CreateForm = () => {
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
    date: date.toDateString(),
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
    data.date = date.toDateString();
    if (resourcePath === '') {
      console.log(data);
      addPackage(data.id, data.name, data.availability, data.price, data.description, '', data.location, data.date);
      Alert.alert('Veamos la fecha (postData, ya se envió)', data.date);
    } else {
      const url = await uploadImage(resourcePath, filename);
      console.log(url);
      console.log(data);
      await addPackage(data.id, data.name, data.availability, data.price, data.description, url, data.location, data.date);
      Alert.alert('Veamos la fecha (postData, ya se envió)', data.date);
    }
    loadLastId(); // Carga el nuevo último ID después de crear el paquete
  };

  const selectImage = (nombre: string, descripcion: string, disponibilidad: string, precio: string, ubicacion: string) => {
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
      <TouchableOpacity onPress={() => {setWritingDate(true);}} style={styles.label}>
        <DatePickerBox writingDate = {writtingDate} setWritingDate = {setWritingDate}  date={date} setDate={setDate} />
      </TouchableOpacity>

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
  textColor:{
    color: 'black',
  },
});

export default CreateForm;
