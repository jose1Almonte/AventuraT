import React, { Component } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import calendar from '../vectores/calendar';
import { SvgXml } from 'react-native-svg';
import { ButtonLikesFav } from './ButtonLikesFav';

class PackagesSearch extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.containerPack}>
                    <View style={styles.containerText}>
                        <Text style={styles.textPack}>Cayo Sal</Text>
                        <Text style={styles.textPack2}>Aladdins Tours</Text>
                        <View style={styles.contenedorCalendario}>
                            <ButtonLikesFav />
                            <SvgXml xml={calendar} />
                            <Text style={styles.date}>Mayo, 15</Text>
                        </View>
                    </View>
                    <Image
                        style={styles.img}
                        source={{
                            uri: 'https://media.meer.com/attachments/71d38e2818914225a1196a8f1d3ae4961c2d75c9/store/fill/1090/613/1e8eb3a92a4ebbf7b825e3a2b30dce85c5c9fdee0eaee9fe889aed2f7299/Parque-Nacional-Morrocoy-Venezuela.jpg',
                        }}
                        alt="photo"
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerPack: {
        height: 140,
        width: 350,
        borderRadius: 20,
        justifyContent: 'flex-end',
        alignItems: 'center',
        display: 'flex',
    },
    container: {
        flexDirection: 'row',
        gap: 20,
    },
    textPack2: {
        marginLeft: 15,
        color: 'black',
        fontSize: 12,
        fontFamily: 'Poppins-Medium',
        fontWeight: 'bold',
    },
    textPack: {
        marginLeft: 15,
        color: 'black',
        fontSize: 14,
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
    contenedorCalendario: {
        marginRight: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 4,
    },
    date: {
        color: 'black',
        fontSize: 11,
        fontFamily: 'Poppins-Regular',
    },
    img: {
        width: '100%',
        height: 140,
        borderRadius: 20,
        position: 'absolute',
    },
});

export default PackagesSearch;
