import React from 'react'
import { StyleSheet } from 'react-native';
import { View, Image, Text, TouchableOpacity, Dimensions } from 'react-native';
import { ButtonLikes } from './ButtonLikes';
import { SvgXml } from 'react-native-svg';
import vectorLocation from '../vectores/vectorLocation';
import { NavigationProp } from '@react-navigation/native';

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
        </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 115,
        height: 200,
        backgroundColor: '#ffffff',
        borderRadius: 15,
    },
    container1: {
        flexDirection: 'column',
        gap: 6,
        alignItems: 'center',
    },
    star: {
        width: 12,
        height: 12,
    },
    textPack: {
        // padding: 6,
        color: 'black',
        fontSize: 12,
        fontFamily: 'Poppins-Medium',
        justifyContent: "center",
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
        color: 'rgba(0, 0, 0, 0.74)',
        fontFamily: 'Poppins-Regular',
        fontSize: 11,
    },
});

