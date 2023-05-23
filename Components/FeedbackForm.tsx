import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TextInput } from 'react-native';
import calendar from '../vectores/calendar';
import { SvgXml } from 'react-native-svg';
import InputFeedback from './InputFeedback';

class FeedbackForm extends Component {
    render() {
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
                            <Text style={styles.textPack}>Carlos Suarez</Text>
                            
                        </View>
                        <Text style={styles.textPack3}>Añade una puntuación</Text>
                        <TextInput style={styles.textPack2}  keyboardType="numeric" />
                        <TextInput 
                        style={styles.textPack2} 
                        accessibilityHint='Añade una breve descripción'
                        multiline={true}
                        numberOfLines={15}
                        />
                        <View style={styles.containerButton}>
                            <View style={styles.containerBtn}>
                            <Text style={styles.txtBtn}>Enviar</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerButton: {
        display: 'flex',
        alignItems: "center"
      },
      containerBtn: {
        height: 40,
        width: 140,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1881B1',
      },
      txtBtn: {
        color: 'white',
        fontSize: 12,
        fontFamily: 'Poppins-Medium',
      },
    contain: {
        display: 'flex',
        flexDirection: 'row',
        marginTop:25,
    },
    containerPack: {
        height: 500,
        width: 330,
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
    },
    textPack: {
        marginHorizontal:15,
        marginTop: 5,
        color: 'white',
        fontSize: 18,
        fontFamily: 'Poppins-Medium',
        marginBottom:5,
    },
    textPack2: {
        marginVertical: 10,
        marginHorizontal: 15,
        padding: 10,
        color: 'black',
        fontSize: 15,
        fontFamily: 'Poppins-Medium',
        backgroundColor: 'white'
    },
    textPack3: {
        marginHorizontal: 15,
        padding: 10,
        color: 'white',
        fontSize: 15,
        fontFamily: 'Poppins-Medium',
        textAlign: 'right',
    },
    img: {
        width: 35,
        height: 35,
        borderRadius: 20,
        marginLeft: 20,
        marginBottom:5,
    }
});

export default FeedbackForm;