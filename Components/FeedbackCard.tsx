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
                        <Image
                            style={styles.img}
                            source={{
                                uri: 'https://media.meer.com/attachments/71d38e2818914225a1196a8f1d3ae4961c2d75c9/store/fill/1090/613/1e8eb3a92a4ebbf7b825e3a2b30dce85c5c9fdee0eaee9fe889aed2f7299/Parque-Nacional-Morrocoy-Venezuela.jpg',
                            }}
                            alt="photo"
                        />
                        <Text style={styles.textPack}>Carlos Suarez</Text>
                        <Califications />
                        <Text style={styles.textPack2}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerPack: {
        height: 130,
        width: 350,
        borderRadius: 20,
        backgroundColor: '#1881B1'
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
        marginLeft: 15,
        color: 'white',
        fontSize: 18,
        fontFamily: 'Poppins-Medium',
    },
    textPack2: {
        marginHorizontal: 15,
        color: 'white',
        fontSize: 12,
        fontFamily: 'Poppins-Medium',
    },
    containerText: {
        display: 'flex',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderBottomStartRadius: 20,
        borderBottomEndRadius: 20,
        width: 350,
        height: 73,
        gap: 5,
        zIndex: 1,
    },
    img: {
        width: 50,
        height: 50,
        borderRadius: 20,
        margin: 10,
    }
});

export default FeedbackCard;