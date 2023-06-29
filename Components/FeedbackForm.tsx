import React, { Component, useContext, useState } from 'react';
import { View, StyleSheet, Text, Image, TextInput, Alert, TouchableOpacity } from 'react-native';
import calendar from '../vectores/calendar';
import { SvgXml } from 'react-native-svg';
import InputFeedback from './InputFeedback';
import { NavigationProp } from '@react-navigation/native';
import currentLog from '../firebase/UserData';
import Stars from './Stars';
import { updateRaitingEnterprise } from '../firebase/Firestore';
import { ValuesContext } from '../Context/ValuesContext';

interface FeedbackFormProps {
    navigation: NavigationProp<Record<string, object | undefined>>;
    emailEnterprice: string;
}

const FeedbackForm = ({ navigation, emailEnterprice }: FeedbackFormProps) => {

    const user = currentLog();
    const [counter, setCounter] = useState(0);
    const [comment, setComment] = useState('');

    // const {whenUserAddNewComment, setWhenUserAddNewComment} = useContext(ValuesContext);

    const handleOnSend = async () => {
        if (comment !== ''){
            await updateRaitingEnterprise(emailEnterprice, { creator: user, stars: counter, comments: comment });
            Alert.alert('Calificación exitosa', 'Su calificación fue enviada');

            navigation.navigate('RatingsScreen', { email: emailEnterprice });
            } else {Alert.alert('Calificación fallida', 'No deje vacio el comentario');}
    };

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
                        <Text style={styles.textPack}>{user?.email}</Text>

                    </View>
                    <Text style={styles.textPack3}>Añade una puntuación</Text>
                    <View style={styles.container2}>
                        <View style={styles.content2} />
                        <Stars counter={counter} setCounter={setCounter} />
                        <View style={styles.content3} />
                        </View>
                    <TextInput
                        style={styles.textArea}
                        accessibilityHint='Añade una breve descripción'
                        multiline={true}
                        numberOfLines={10}
                        maxLength={290}
                        onChangeText={(text) => { setComment(text) }}
                    />
                    <View style={styles.containerButton}>
                        <TouchableOpacity onPress={() => {handleOnSend();}}>
                            <View style={styles.containerBtn}>
                                <Text style={styles.txtBtn}>Enviar</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

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
        marginTop: '10%',
    },
    containerPack: {
        height: '105%',
        width: '80%',
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
        marginHorizontal: 15,
        marginTop: 5,
        color: 'white',
        fontSize: 9,
        fontFamily: 'Poppins-Medium',
        marginBottom: 5,
    },
    container2: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom:'3%',
      },
      content2: {
        width: 1,
        height: 1,
      },
      content3: {
        width: 1,
        height: 3,
        marginRight:'10%',
      },
    textArea: {
        textAlignVertical: 'top',
        marginVertical: 10,
        marginHorizontal: 15,
        padding: 10,
        color: 'black',
        fontSize: 8,
        fontFamily: 'Poppins-Medium',
        backgroundColor: 'white',
    },
    textPack2: {
        marginVertical: 10,
        marginHorizontal: 15,
        padding: 10,
        color: 'black',
        fontSize: 15,
        fontFamily: 'Poppins-Medium',
        backgroundColor: 'white',
    },
    textPack3: {
        marginHorizontal: 15,
        padding: 10,
        color: 'white',
        fontSize: 10,
        fontFamily: 'Poppins-Medium',
        textAlign: 'right',

    },
    img: {
        width: 35,
        height: 35,
        borderRadius: 20,
        marginLeft: 20,
        marginBottom: 5,
    }
});

export default FeedbackForm;