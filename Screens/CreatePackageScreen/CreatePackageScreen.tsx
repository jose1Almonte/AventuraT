import { ScrollView, Text, StyleSheet, View } from 'react-native';
import React from 'react';
import CreateForm from '../../Components/CreateForm';
import { Background } from '../../Layouts/Background';

const CreatePackageScreen = () => {
    return (

        <ScrollView style={styles.backGround}>
            <View style={styles.container1}>
                <Text style={styles.titulo}>Crea un Paquete!</Text>
            </View>
            <View style={styles.container}>
                <CreateForm />
            </View>
        </ScrollView>


    );
};

export default CreatePackageScreen;

const styles = StyleSheet.create({
    backGround:{
        backgroundColor: '#1DB5BE',
        // flex: 1,
    },
    container1: {
        height: 150,
        backgroundColor: "#91D1FF",
        alignItems: "center",
        justifyContent:"center",
    },
    titulo: {
        fontSize: 30,
        textAlign: "center",
        color:"white",
    },
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: 'white',
    }
    
});
