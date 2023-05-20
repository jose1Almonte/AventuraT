import React, {Component, useEffect, useState} from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { addPackage, checkPackage } from '../firebase/Firestore';
import { launchImageLibrary } from 'react-native-image-picker';

    const data = {
    nombre: "",
    disponibilidad: "",
    precio: "",
    descripcion: "",
}

    
export default class CreateForm extends Component {
    constructor(props: any) {
        super(props);
        this.state = {
            resourcePath: "",
        };
    }
    render() {
        return <View style={styles.contenedor}>
            <Text style={styles.label}>Ingrese el nombre del paquete:</Text>
            <TextInput style={styles.textInput} placeholder='Nombre del paquete' onChangeText={(text) => { data.nombre = text }}></TextInput>

            <Text style={styles.label}>Ingrese la disponibilidad:</Text>
            <TextInput style={styles.textInput} placeholder='Disponibilidad' onChangeText={(text) => { data.disponibilidad = text }}></TextInput>

            <Text style={styles.label}>Ingrese el precio:</Text>
            <TextInput style={styles.textInput} placeholder='Precio en $ <3' onChangeText={(text) => { data.precio = text }}></TextInput>

            <Text style={styles.label}>Descripción:</Text>
            <TextInput style={styles.textInput} placeholder='Precio en $ <3' onChangeText={(text) => { data.descripcion = text }}></TextInput>

            <TouchableOpacity style={styles.button} onPress={() => {
                launchImageLibrary(
                    { mediaType: "photo" },
                    (response) => {
                        console.log(response);
                        this.setState({ resourcePath: response.assets[0].uri });
                        console.log(this.state.resourcePath);    
                    })
                
            }}>
                <Text style={styles.buttonText}>Subir foto</Text>
            </TouchableOpacity>

            <View>  
                <Image source={{uri: this.state.resourcePath }}/>
            </View>

            <TouchableOpacity style={styles.button} onPress={() => { submit() }}>
                <Text style={styles.buttonText}>Crear Paquete</Text>
            </TouchableOpacity>

        </View>
    
    }
}

const submit = () => {

        console.warn(data)
        addPackage(data.nombre, data.disponibilidad, data.precio, data.descripcion)   
        
}
    
const styles = StyleSheet.create({
    contenedor: {
        alignItems: 'center',
        backgroundColor: '#1DB5BE',
    },
    textInput: {

    },
    label: {

    },
    button: {
        
    },
    buttonText: {
        
    },
});
