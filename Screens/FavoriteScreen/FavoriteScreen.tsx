import { Text, View, StyleSheet, ScrollView, } from 'react-native';
import React from 'react';
import { SvgXml } from 'react-native-svg';
import vectorPerfil from '../../vectores/vectorPerfil';
import PhotoProfile from '../../Components/Profiles/photoProfile';
import EditProfileButton from '../../Components/Profiles/editProfileButton';
import VectorPerfilFlecha from '../../vectores/vectorPerfilFlecha';
import InputSearch from '../../Components/InputSearch';
import PackagesSearch from '../../Components/packagesSearch';
import options from '../../vectores/options';

const FavoriteScreen = () => {
    return (
        <ScrollView>
            <View style={styles.container}>
                {/* <View style={styles.fondo}>

      </View> */}
                <View style={styles.info}>
                    <View style={styles.topInfo}>
                        <Text style={styles.txt}>Paquetes Favoritos</Text>
                        <InputSearch />
                        <PackagesSearch />
                        <PackagesSearch />
                        <PackagesSearch />
                        <PackagesSearch />
                        <PackagesSearch />
                        <PackagesSearch />
                        <PackagesSearch />
                        <PackagesSearch />
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    info: {
        flex: 1,
        display: 'flex',
        margin: 5
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
