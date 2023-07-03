import { Text, View, StyleSheet, } from 'react-native';
import React from 'react';
import FeedbackForm from '../../Components/FeedbackForm';
import { NavigationProp } from '@react-navigation/native';


interface FeedbackScreenProps {
    navigation: NavigationProp<Record<string, object | undefined>>;
    route?: any;
}

const FeedbackScreen = ({ route, navigation }: FeedbackScreenProps) => {
    const email = route.params.email;

    return (
        <View style={styles.container}>
            <View style={styles.info}>
                <View style={styles.topInfo}>
                    <Text style={styles.txt}>Comentanos tu experiencia</Text>
                    <FeedbackForm navigation={navigation} emailEnterprice={email} />
                </View>
            </View>
        </View>
    );
};

export default FeedbackScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1DB5BE',
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
        color: 'white',
        fontSize: 20,
        fontFamily: 'Poppins-SemiBold',
    },
});
