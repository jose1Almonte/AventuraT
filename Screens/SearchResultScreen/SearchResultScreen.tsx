import { Text, View, StyleSheet, ScrollView, Image, } from 'react-native';
import React from 'react';
import { SvgXml } from 'react-native-svg';
import vectorPerfil from '../../vectores/vectorPerfil';
import PhotoProfile from '../../Components/Profiles/photoProfile';
import EditProfileButton from '../../Components/Profiles/editProfileButton';
import VectorPerfilFlecha from '../../vectores/vectorPerfilFlecha';
import InputSearch from '../../Components/InputSearch';
import PackagesSearch from '../../Components/packagesSearch';
import options from '../../vectores/options';


const CardBoxView = () => {
    return (
        <View style={styles.bigBox}>
            <View style={styles.leftBox}>
                <View style={styles.imageBox}>
                    <Image style={styles.image} source={{uri: 'data:image/jpeg;base64,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'}}/>
                </View>
            </View>
            <View style={styles.rightBox}>
                <View style={styles.textBox}>
                    <Text style={styles.text}> Cayo Muerto </Text>
                </View>
                <View style={styles.textBox}>
                    <Text style={styles.textBlue}> 2 días y 1 noche </Text>
                </View>
                <View style={styles.textBox}>
                    <Text style={styles.textBlue}> $ 22.50 p/p </Text>
                </View>
                <View style={styles.textBox}>
                    <Text style={styles.miniText}> 4.5 | Falcón </Text>
                </View>
            </View>
        </View>
    );
};

const SearchResultScreen = () => {
    return (
        <View style={styles.container}>
            <ScrollView>

                <View style={styles.info}>
                    <View style={styles.topInfo}>
                        <Text style={styles.txt}>Resultados de Busqueda</Text>
                        <InputSearch />

                        <CardBoxView/>

                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default SearchResultScreen;

const styles = StyleSheet.create({

    textBox:{
        width: '95%',
        flex: 1,
        // backgroundColor: 'yellow',
        justifyContent: 'center',
        // borderColor: 'black',
        // borderWidth: 1,
    },

    imageBox:{
        width: '90%',
        height: '90%',
        borderRadius: 4,
        overflow: 'hidden',
    },

    image:{
        width: '100%',
        height: '100%',
    },

    text:{
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontSize: 16,
        lineHeight: 24,
        color: '#000000',
    },
    miniText:{
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontSize: 12,
        lineHeight: 16,
        color: '#000000',
    },
    textBlue:{
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontSize: 16,
        lineHeight: 24,
        color: 'rgba(24, 129, 177, 1)',
    },

    leftBox:{
        width: '45.93%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'red',


    },

    rightBox:{
        width: '54.07%',
        // backgroundColor: 'green',
        alignItems: 'flex-end',
    },

    bigBox:{
        height: 124,
        width: '85%',
        flexDirection: 'row',
        borderColor: 'rgba(230, 230, 230, 1)',
        borderWidth: 1,
    },

    container: {
        flex: 1,
        // backgroundColor: 'white',
        backgroundColor: 'white',
    },
    info: {
        flex: 1,
        display: 'flex',
        margin: 5,
    },
    topInfo: {
        marginTop: 80,
        alignItems: 'center',
        gap: 15,
    },
    info2: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 15,
        gap: 6,
        padding: 20,
    },
    info3: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        padding: 20,
        marginLeft: 15,
    },
    contenedorInfoTop: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    contenedorInfo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    contenedorServicios: {
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        paddingLeft: 20,
        paddingRight: 20,
        marginLeft: 15,
    },
    contenedorPrecio: {
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        paddingLeft: 20,
        marginLeft: 15,
        marginTop: 15,
    },
    contenedorPrecios: {
        display: 'flex',
        flexDirection: 'row',
        gap: 12,
    },
    contenedorEscala: {
        justifyContent: "center",
        display: 'flex',
        borderRadius: 4,
        width: 90,
        height: 35,
        borderColor: '#1881B1',
        borderWidth: 1
    },
    containerButton: {
        display: 'flex',
        alignItems: 'center',
    },
    container2: {
        marginTop: 20,
        height: 42,
        width: 300,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1881B1',
    },
    txt: {
        color: 'black',
        fontSize: 20,
        fontFamily: 'Poppins-SemiBold',
    },
    title: {
        color: 'black',
        fontSize: 16,
        fontFamily: 'Poppins-Medium',
    },
    txtInfo: {
        color: '#323F4B',
        fontSize: 15,
        fontFamily: 'Poppins-Regular',
    },
    txtInfo1: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Poppins-Bold',
    },
    txtInfo2: {
        marginLeft: 10,
        color: '#323F4B',
        fontSize: 15,
        fontFamily: 'Poppins-Regular',
    },
});
