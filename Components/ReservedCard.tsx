import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';

const ReservedCard = () => {
    return (
        <View style={styles.container}>
            <View style={styles.containerPack}>
                <View style={styles.containerPack2}>
                    <View style={styles.contain}>
                        <Image
                            style={styles.img}
                            source={{
                                uri: 'https://media.meer.com/attachments/71d38e2818914225a1196a8f1d3ae4961c2d75c9/store/fill/1090/613/1e8eb3a92a4ebbf7b825e3a2b30dce85c5c9fdee0eaee9fe889aed2f7299/Parque-Nacional-Morrocoy-Venezuela.jpg',
                            }}
                            alt="photo"
                        />
                        <Text style={styles.textPack}>Norangel Marin</Text>
                    </View>
                    <Text style={styles.textPack2}>Fecha de Pago:  20/06/2023</Text>
                    <Text style={styles.textPack2}>Monto:  200 Bs</Text>
                    <Text style={styles.textPack2}>Referencia:  123456789</Text>
                    <View style={styles.containButtons}>
                        <TouchableOpacity onPress={() => {}}>
                            <Text style={styles.button1}>Confirmar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {}}>
                            <Text style={styles.button2}>Rechazar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    contain: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 20,
    },
    containerPack: {
        width: '90%',
        borderRadius: 20,
        backgroundColor: '#1881B1',
    },
    containerPack2: {
        display: 'flex',
        justifyContent: 'space-around',
    },
    container: {
        flexDirection: 'row',
        gap: 20,
        marginTop: 15,
    },
    textPack: {
        marginHorizontal: 15,
        color: 'white',
        fontSize: 18,
        fontFamily: 'Poppins-Medium',
        marginBottom: 5,
    },
    textPack2: {
        marginHorizontal: 70,
        color: 'white',
        fontSize: 12,
        fontFamily: 'Poppins-Medium',
    },
    img: {
        width: 35,
        height: 35,
        borderRadius: 20,
        marginLeft: 20,
        marginBottom: 5,
    },
    containButtons:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal:30,
        paddingVertical:10,
    },
    button1:{
        paddingHorizontal: 30,
        paddingVertical: 15,
        backgroundColor: '#1DB5BE',  
        color: '#fff',
        borderRadius:30,
    },
    button2:{
        paddingHorizontal: 30,
        paddingVertical: 15,
        backgroundColor: '#730F0F',  
        color: '#fff',
        borderRadius:30,
    },
});

export default ReservedCard;