import React, { useState } from 'react';
import currentLog from './UserData';
import auth from '@react-native-firebase/auth';
import { Button, Image,View, PixelRatio} from 'react-native';
import {onGoogleButtonPress} from './gmail';
import { ContinueWithName, styles } from '../Screens/LoginScreen/LoginScreen';
import { addUser, checkIfUserExists } from '../firebase/Firestore';
import { NavigationProp} from '@react-navigation/native';



const pixelSize = PixelRatio.getPixelSizeForLayoutSize(30);

interface YourSignInWithGoogleComponentProps{
    navigation: NavigationProp<Record<string, object | undefined>>,
    destinationNavigationComponentName: string,
}

const YourSignInWithGoogleComponent = ({

    navigation,
    destinationNavigationComponentName,
}:YourSignInWithGoogleComponentProps) => {
    const [user, setUser] = useState(currentLog());
    const [isLogged, setLogged] = useState(!!user);

    const logout = async () => {
        await auth().signOut();
        setUser(null);
        setLogged(false);
    };

    async function login() {
        try {
            const isReallyLogged = await onGoogleButtonPress();
            if (isReallyLogged){
                setUser(currentLog());
                setLogged(true);
                if (user && user.displayName && user.email && user.emailVerified && user.photoURL) {
                    await checkIfUserExists(user.email);
                    await addUser(user.displayName,user.email,user.emailVerified,user.photoURL);
                }
                navigation.navigate(destinationNavigationComponentName);

            } else {
                logout;
            }

        } catch (e){
            logout;
        }
        // ...continuar con más acciones
    }

    return (
        <>
            {isLogged ? (
            <View style={{ width: pixelSize, height: pixelSize, alignItems: 'center'}} >
                <Image source={{ uri: user?.photoURL || 'https://via.placeholder.com/150' }} style={{ width: 42, height: 42, borderRadius:100}} />
                <View style={{ width: pixelSize-10, height: pixelSize-50}} >
                    <Button title="Logout"  onPress={()=> {
                    logout();
                    }}/>
                </View>
            </View>
            ) : (
            <ContinueWithName text = "Continuar con Google" ViewStyle={styles.continueWithGoogleBox} imageSource={require('../images/GoogleLogo.png')} ImageStyle={styles.LogoStyles} TextStyle={styles.normalTextStyle} onPress={() =>{login();}}/>)}
        </>
    );
};


//Esto sirve para poner el nombre:
//<Text style={{ width: pixelSize, height: pixelSize}} >{user?.displayName || ''}</Text>

export default YourSignInWithGoogleComponent;


