import React from 'react'
import { StyleSheet } from 'react-native';
import { View, Image, Text, TouchableOpacity, Dimensions } from 'react-native';
import { ButtonLikes } from './ButtonLikes';
import { SvgXml } from 'react-native-svg';
import vectorLocation from '../vectores/vectorLocation';
import { NavigationProp } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

interface Package {
    availability?: string;
    description?: string;
    id?: number;
    location?: string;
    mainImageUrl?: string;
    name?: string;
    price?: string;
    rating?: string;
    startDate?: any;
    endDate?: any;
    // nameEnterprise?: string;
    emailEnterprise?: string;
    expireDate?: any;
    isPublic?: boolean;
    isVIP?: boolean;
}

interface popularPackageProps {
    data: Package,
    navigation: NavigationProp<Record<string, object | undefined>>;
}



export default function PopularPackage({ data, navigation }: popularPackageProps) {


    

    return (
        <>
        <TouchableOpacity style={styles.container} onPress={() => {navigation.navigate('DetailsScreenUser', { data })}}>
        <FastImage
        source={require('../images/fiesta.gif')}
        style={styles.loadingGif}>
            <View style={styles.container1}>
                <View style={styles.ContainerLikes}>
                <ButtonLikes packageDetails={data} />
                </View>
                <Image
                style={styles.img}
                source={{ uri: data.mainImageUrl }}
                alt="photo"
                />
            </View>
            <View style={styles.ContainerText}>
                <Text style={styles.textPack}>{data.name}</Text>
                <View style={styles.ContainerLocation}>
                <SvgXml xml={vectorLocation} height={12} width={12} />
                <Text style={styles.textLocation}>{data.location}</Text>
                </View>
            </View>
        </FastImage>
        </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 115,
        height: 200,
        backgroundColor: '#ebfffb',
        borderRadius: 15,
    },
    container1: {
        flexDirection: 'column',
        gap: 6,
        alignItems: 'center',
    },
    loadingGif:{
        width:'100%',
        height:'100%',
        borderRadius:15,

      },
    star: {
        width: 12,
        height: 12,
    },
    textPack: {
        // padding: 6,
        color: '#a80f35',
        fontSize: 8,
        fontFamily: 'Poppins-Medium',
        justifyContent: "center",
        backgroundColor:'#ffffff',
        marginRight:'6%',
    },
    ContainerText: {
        marginTop: 90,
        display: 'flex',
        marginLeft: 8,
        justifyContent: 'center',
    },
    img: {
        marginTop: 3,
        width: '95%',
        height: 120,
        borderRadius: 15,
        position: "absolute"
    },
    ContainerLocation: {
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
        gap: 5,
        backgroundColor:'#ffffff',
        marginRight:'6%',
    },
    ContainerLikes: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        display: 'flex',
        width: 26,
        height: 26,
        padding: 10,
        marginTop: 10,
        zIndex: 1,
    },
    textLocation: {
        color: '#a80f35',
        fontFamily: 'Poppins-Regular',
        fontSize: 8,
        backgroundColor:'#ffffff',
        marginRight:'30%',
    },
});

