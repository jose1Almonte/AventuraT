import { Text, View, StyleSheet, ScrollView, Image, } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SvgXml } from 'react-native-svg';
import vectorPerfil from '../../vectores/vectorPerfil';
import PhotoProfile from '../../Components/Profiles/photoProfile';
import EditProfileButton from '../../Components/Profiles/editProfileButton';
import VectorPerfilFlecha from '../../vectores/vectorPerfilFlecha';
import InputSearch from '../../Components/InputSearch';
import PackagesSearch from '../../Components/packagesSearch';
import options from '../../vectores/options';
// import { NavigationProp } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import InputSearch2 from '../../Components/InputSearch2';

// interface Item {
//     id: string;
//     name: string;
//     description: string;
//     location: string;
//     price: string;
//     type: string;
//     mainImageUrl: string;
//   }

const CardBoxView = ({data}:{data: any}) => {
    return (
        <View style={styles.bigBox}>
            <View style={styles.leftBox}>
                <View style={styles.imageBox}>
                    <Image style={styles.image} source={{uri: data?.mainImageUrl}}/>
                </View>
            </View>
            <View style={styles.rightBox}>
                <View style={styles.textBox}>
                    <Text style={styles.text}> {data.name} </Text>
                </View>
                <View style={styles.textBox}>
                    <Text style={styles.textBlue}> {data.description} </Text>
                </View>
                <View style={styles.textBox}>
                    <Text style={styles.textBlue}> $ {data.price} p/p </Text>
                </View>
                <View style={styles.textBox}>
                    <Text style={styles.miniText}> {data.rating} | {data.location} </Text>
                </View>
            </View>
        </View>
    );
};

const SearchResultScreen = ({navigation, route}) => {
    const {name: initialSearchValue, type: type} = route.params;
    const [searchKeyword, setSearchKeyword] = useState(initialSearchValue);
    const [items, setItems] = useState<Document[]>([]);
    // const [resultOffset, setResultOffset] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            if (searchKeyword.trim() === '') {
                setItems([]);
                return;
            }
            const uppercaseKeyword = searchKeyword.charAt(0).toUpperCase() + searchKeyword.slice(1);

            const snapshot = await firestore()
                .collection('package')
                .where(type, '>=', uppercaseKeyword)
                .where(type, '<=', uppercaseKeyword + '\uf8ff')
                .orderBy(type)
                .get();

            console.log('searchKeyword', searchKeyword);
            // snapshot.forEach((doc) => {

            //      console.log('doc:', doc);
            //  });
            const docs = snapshot.docs.map((doc) => doc.data());
            setItems(docs);

            console.log(items);
        };

        fetchData();

    }, [searchKeyword]);


    return (
        <View style={styles.container}>
            <ScrollView>

                <View style={styles.info}>
                    <View style={styles.topInfo}>
                        <Text style={styles.txt}> Resultados de Busqueda </Text>
                        <Text style={styles.txt}> Estas Buscando por: {type} </Text>
                        <InputSearch2 navigation={navigation} areYouInSearchResult={true} defaultValue={initialSearchValue} searchKeyword = {searchKeyword} setSearchKeyword = {setSearchKeyword}/>

                        {items.map((document, index) => (
                    <CardBoxView key={index} data={document}/>
                    ))}

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

