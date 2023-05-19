import React, {Component, useEffect, useState} from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { addPackage, checkPackage } from '../firebase/Firestore';


function CreateForm() {
    const data = {
    nombre: "",
    disponibilidad: "",
    precio: "",
}
    
    const [loading, setLoading] = useState(false)

    useEffect(() => { }, [loading])

    const submit = () => {
        setLoading(true)
        console.warn(data)
        addPackage(data.nombre, data.disponibilidad, data.precio)   
        setLoading(false)
        
    }
    return loading == false ? (
            <View style={styles.contenedor}>
                <Text style={styles.label}>Ingrese el nombre del paquete:</Text>
                <TextInput style={styles.textInput} placeholder='Nombre del paquete' onChangeText={(text) => { data.nombre = text }}></TextInput>

                <Text style={styles.label}>Ingrese la disponibilidad:</Text>
                <TextInput style={styles.textInput} placeholder='Disponibilidad' onChangeText={(text) => { data.disponibilidad = text }}></TextInput>

                <Text style={styles.label}>Ingrese el precio:</Text>
                <TextInput style={styles.textInput} placeholder='Precio en $ <3' onChangeText={(text) => { data.precio = text }}></TextInput>

                <TouchableOpacity style={styles.button} onPress={() => { submit() }}>
                    <Text style={styles.buttonText}>Crear Paquete</Text>
                </TouchableOpacity>

            </View>
    ) : <View style={styles.contenedor}><Text>Loading...</Text></View>;
        
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

export default CreateForm;