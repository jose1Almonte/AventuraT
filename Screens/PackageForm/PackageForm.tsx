import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { addPackage, checkPackage, uploadImage, getLastPackageId } from '../firebase/Firestore'; // Importa la función getLastPackageId

import { launchImageLibrary } from 'react-native-image-picker';

interface CreateFormData {
  id: number;
  nombre: string;
  disponibilidad: string;
  precio: string;
  descripcion: string;
  ubicacion: string;
}

const CreateForm = () => {
  const [resourcePath, setResourcePath] = useState('');
  const [filename, setFileName] = useState('');
  const [data, setData] = useState<CreateFormData>({
    id: 0, // Inicializa el ID en 0
    nombre: '',
    disponibilidad: '',
    precio: '',
    descripcion: '',
    ubicacion: '',
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
      console.warn(data);
      addPackage(data.id, data.nombre, data.disponibilidad, data.precio, data.descripcion, '', data.ubicacion);
    } else {
      const url = await uploadImage(resourcePath, filename);
      console.log(url);
      console.warn(data);
      await addPackage(data.id, data.nombre, data.disponibilidad, data.precio, data.descripcion, url, data.ubicacion);
    }
    loadLastId(); // Carga el nuevo último ID después de crear el paquete
  };

  const selectImage = (nombre: string, descripcion: string, disponibilidad: string, precio: string, ubicacion: string) => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.warn('No se ha elegido una imagen');
      } else if (response.errorCode) {
        console.warn('ImagePicker Error: ', response.errorCode);
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
      <TextInput style={styles.textInput} placeholder="Nombre del paquete" onChangeText={(text) => setData((prevData) => ({ ...prevData, nombre: text }))} />

      <Text style={styles.label}>Ingrese la disponibilidad:</Text>
      <TextInput style={styles.textInput} placeholder="Disponibilidad" onChangeText={(text) => setData((prevData) => ({ ...prevData, disponibilidad: text }))} />

      <Text style={styles.label}>Ingrese el precio:</Text>
      <TextInput style={styles.textInput} placeholder="Precio en $ <3" onChangeText={(text) => setData((prevData) => ({ ...prevData, precio: text }))} />

      <Text style={styles.label}>Descripción:</Text>
      <TextInput style={styles.textInput} placeholder="Descripcion" onChangeText={(text) => setData((prevData) => ({ ...prevData, descripcion: text }))} />

      <Text style={styles.label}>Ubicación:</Text>
      <TextInput style={styles.textInput} placeholder="Ubicación" onChangeText={(text) => setData((prevData) => ({ ...prevData, ubicacion: text }))} />

      <TouchableOpacity style={styles.button} onPress={() => selectImage(data.nombre, data.descripcion, data.disponibilidad, data.precio, data.ubicacion)}>
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
