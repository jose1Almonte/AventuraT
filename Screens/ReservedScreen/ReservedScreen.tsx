import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Alert} from 'react-native';
import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import ReservedPackages from '../../Components/ReservedPackages';

interface ReservedScreenProps {
    navigation: NavigationProp<Record<string, object | undefined>>;
}

const ReservedScreen = ({ navigation }: ReservedScreenProps) => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.info}>
                <View style={styles.topInfo}>
                    <Text style={styles.txt}>Paquetes reservados</Text>
                </View>
                <Text style={styles.txt2}>(Viajes pendientes)</Text>
                <TouchableOpacity onPress={() => {
                    if (true) { // si es estatus R...
                        navigation.navigate('MobilePaymentConfirmScreen');
                    } 
                    }}>
                    <ReservedPackages/>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default ReservedScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        gap: 5,
    },
    txt: {
        color: 'black',
        fontSize: 20,
        fontFamily: 'Poppins-SemiBold',
    },
    txt2: {
        color: 'black',
        fontSize: 16,
        fontFamily: 'Poppins-Light',
        textAlign: 'right',
        paddingHorizontal: 50,
    },
});