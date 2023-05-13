import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async () => {
        try {
            const userData = await auth().createUserWithEmailAndPassword(email, password);
            Alert.alert('Yea', 'Usuario registrado exitosamente');
            console.log('Usuario registrado exitosamente: ', userData.user?.email);
        } catch (error) {
            Alert.alert('Nope', 'Error al registrar usuario');
            console.log('Error al registrar usuario: ', error);
        }
    };

    return (
    <View>
        <TextInput
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        />
        <TextInput
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
        />
        <Button title="Sign Up" onPress={handleSignUp} />
    </View>
    );
};

export default SignUp;
