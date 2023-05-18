import { ScrollView, Text, StyleSheet } from 'react-native';
import React from 'react';

const CreatePackageScreen = () => {
    return (
        <ScrollView style={styles.backGround}>

        <Text>CreatePackageScreen</Text>

        </ScrollView>

    );
};

export default CreatePackageScreen;

const styles = StyleSheet.create({
    backGround:{
        backgroundColor: '#1DB5BE',
        // flex: 1,
    },
});
