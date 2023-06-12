import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Alert} from 'react-native';
import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import BusinessReservedPackages from '../../Components/BusinessReservedPackages';
//import { useUser } from '../../Context/UserContext';

interface BusinessReservedScreenProps {
    navigation: NavigationProp<Record<string, object | undefined>>;
}

const BusinessReservedScreen = ({ navigation }: BusinessReservedScreenProps) => {
    //let { isLogged } = useUser();
    return (
        <ScrollView style={styles.container}>
            <View style={styles.info}>
                <View style={styles.topInfo}>
                    <Text style={styles.txt}>Gestión de Pagos</Text>
                    <Text style={styles.txt}>de Paquetes</Text>
                </View>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('DetailReservedScreen');
                    }}>
                    <BusinessReservedPackages/>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default BusinessReservedScreen;

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
    },
    txt: {
        color: 'black',
        fontSize: 20,
        fontFamily: 'Poppins-SemiBold',
    },
});