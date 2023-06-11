import { Text, View, StyleSheet, } from 'react-native';
import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import ReservedCard from '../../Components/Califications';

interface DetailReservedScreenProps {
    navigation: NavigationProp<Record<string, object | undefined>>;
}

const DetailReservedScreen = ({ navigation }: DetailReservedScreenProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.info}>
                <View style={styles.topInfo}>
                    <Text style={styles.txt}>Reservas por confirmar del Paquete:</Text>
                    <Text style={styles.txt2}>Mochima</Text>
                    <ReservedCard calification={undefined}/>
                </View>
            </View>
        </View>
    );
};

export default DetailReservedScreen;

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
    txt: {
        color: 'black',
        fontSize: 20,
        fontFamily: 'Poppins-SemiBold',
    },
    txt2: {
        color: 'black',
        fontSize: 20,
        fontFamily: 'Poppins-Light',
        textAlign: 'right',
    },
});