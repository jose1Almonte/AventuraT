import React, { Component } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import calendar from '../vectores/calendar';
import { SvgXml } from 'react-native-svg';
import Califications from './Califications';

class FeedbackCard extends Component {
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
                            <Califications />
                        </View>
                        <Text style={styles.textPack2}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    contain: {
        display: 'flex',
        flexDirection: 'row',
        marginTop:20,
    },
    containerPack: {
        height: 130,
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
        marginHorizontal:30,
        color: 'white',
        fontSize: 18,
        fontFamily: 'Poppins-Medium',
        marginBottom:5,
    },
    textPack2: {
        marginHorizontal: 15,
        padding: 10,
        color: 'white',
        fontSize: 15,
        fontFamily: 'Poppins-Medium',
    },
    img: {
        width: 35,
        height: 35,
        borderRadius: 20,
        marginLeft: 20,
        marginBottom:5,
    }
});

export default FeedbackCard;