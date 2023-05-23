import { Text, View, StyleSheet, } from 'react-native';
import React from 'react';
import FeedbackForm from '../../Components/FeedbackForm';


const FeedbackScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.info}>
                <View style={styles.topInfo}>
                    <Text style={styles.txt}>Comenta tu experiencia</Text>
                    <FeedbackForm/>
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
});
