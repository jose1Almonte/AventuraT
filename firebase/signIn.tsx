import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';

const SignInInterface = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSignInButton = async () => {
    try {
        await auth().signInWithEmailAndPassword(email, password);
        Alert.alert('Yea', 'Usuario autenticado exitosamente');
        console.log('Usuario autenticado exitosamente');
    } catch (error) {
        Alert.alert('Nope', 'Error al autenticar usuario');
        console.log('Error al autenticar usuario: ', error);
    }
    };

    return (
    <View>
        <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
        />
        <TextInput
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
        />
        <Button title="Ingresar" onPress={onSignInButton} />
    </View>
    );
};

export default SignInInterface;
