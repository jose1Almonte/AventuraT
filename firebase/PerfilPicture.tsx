import React, { useState } from 'react';
import currentLog from './UserData';
import auth from '@react-native-firebase/auth';
import { View, Button, Image,Text} from 'react-native';
import {onGoogleButtonPress} from './gmail';
import { ContinueWithName, styles } from '../Screens/LoginScreen/LoginScreen';
import { addUser, checkIfUserExists } from '../firebase/Firestore';

const TuComponente = () => {
    const [user, setUser] = useState(currentLog());
    const [isLogged, setLogged] = useState(!!user);


    const logout = async () => {
    await auth().signOut();
    setUser(null);
    setLogged(false);
};

async function login() {
    await onGoogleButtonPress();
    await setUser(currentLog());
    await setLogged(true);
    
    if (user && user.displayName && user.email && user.emailVerified && user.photoURL) {
      await checkIfUserExists(user.email);
      await addUser(user.displayName,user.email,user.emailVerified,user.photoURL);
    }
    // ...continuar con más acciones
}

return (
    <View>
        {isLogged ? (
        <>
            <Image source={{ uri: user?.photoURL || 'https://via.placeholder.com/150' }} style={{ width: 150, height: 150 }} />
            <Text>{user?.displayName || ''}</Text>
            <Button title="Logout" onPress={logout} />
        </>
        ) : (
        <ContinueWithName text = "Continuar con Google" ViewStyle={styles.continueWithGoogleBox} imageSource={require('../images/GoogleLogo.png')} ImageStyle={styles.LogoStyles} TextStyle={styles.normalTextStyle} onPress={() =>{login()}}/>)}
    </View>
    );
};

export default TuComponente;
