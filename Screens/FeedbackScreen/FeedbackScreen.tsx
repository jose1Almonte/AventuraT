import { Text, View, StyleSheet, } from 'react-native';
import React, { useState } from 'react';
import FeedbackForm from '../../Components/FeedbackForm';
import { NavigationProp } from '@react-navigation/native';
import Stars from '../../Components/Stars';
import { PackageI } from '../../models/package.interface';
import { saveStarsToFirestore } from '../../firebase/Firestore';

interface FeedbackScreenProps {
    navigation: NavigationProp<Record<string, object | undefined>>;
    route?: any;
    data?: PackageI;
}

const FeedbackScreen = ({ route, navigation }: FeedbackScreenProps) => {
    let packageIn: PackageI = route.params.data;
    const name = route.params.packageI.name;
    const email = route.params.emailEnterprise;
    const [counter, setCounter] = useState(0);
    /*saveStarsToFirestore(counter,name,email);*/
    return (
        <View style={styles.container}>
            <View style={styles.info}>
                <Stars counter={counter} setCounter={setCounter} route ={route} data = {packageIn}/>
                <View style={styles.topInfo}>
                    <Text style={styles.txt}>Comenta tu experiencia</Text>
                    <FeedbackForm navigation={navigation} />
                </View>
            </View>
        </View>
    );
};

export default FeedbackScreen;

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
        gap: 15,
    },
    txt: {
        color: 'black',
        fontSize: 20,
        fontFamily: 'Poppins-SemiBold',
    },
});
