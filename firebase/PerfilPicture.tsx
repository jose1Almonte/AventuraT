import React, { useState } from 'react';
import currentLog from './UserData';
import auth from '@react-native-firebase/auth';
import { Image, PixelRatio, TouchableOpacity} from 'react-native';
import {onGoogleButtonPress} from './gmail';
import { ContinueWithName } from '../Screens/LoginScreen/LoginScreen';
import { addUser, checkIfUserExists } from '../firebase/Firestore';
import { NavigationProp} from '@react-navigation/native';



const pixelSize = PixelRatio.getPixelSizeForLayoutSize(30);

interface YourSignInWithGoogleComponentProps{
    navigation: NavigationProp<Record<string, object | undefined>>,
    destinationNavigationComponentName: string,
    goToLoginScreen: boolean,
    styles: any,
}

const YourSignInWithGoogleComponent = ({

    navigation,
    destinationNavigationComponentName,
    goToLoginScreen,
    styles,
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
                    const userExist = await checkIfUserExists(user.email);
                    if (!userExist){
                        await addUser(user.displayName,user.email,user.emailVerified,user.photoURL);
                    }
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

    // async function goLogin(){
    //     navigation.navigate(destinationNavigationComponentName);
    // }

    return (
        <>
            {isLogged ? (
                <>
                {goToLoginScreen ? (
                    <TouchableOpacity style={{ width: pixelSize, height: pixelSize, alignItems: 'center'}}  onPress={() => {logout();}}>
                        <Image source={{ uri: user?.photoURL || 'https://via.placeholder.com/150' }} style={{ width: 42, height: 42, borderRadius:100}} />
                    </TouchableOpacity>

                ) : (
                    <ContinueWithName text = "Continuar con Google" ViewStyle={styles.continueWithGoogleBox} imageSource={require('../images/GoogleLogo.png')} ImageStyle={styles.LogoStyles} TextStyle={styles.normalTextStyle} onPress={() =>{login();}}/>
                )}
                </>
            ) : (
                <>
                {goToLoginScreen ? (
                    <TouchableOpacity style={{ width: pixelSize, height: pixelSize, alignItems: 'center'}}  onPress={() => {navigation.navigate('LoginScreen')}}>
                        <Image source={{ uri: user?.photoURL || 'https://via.placeholder.com/150' }} style={{ width: 42, height: 42, borderRadius:100}} />
                    </TouchableOpacity>
                ) : (
                    <ContinueWithName text = "Continuar con Google" ViewStyle={styles.continueWithGoogleBox} imageSource={require('../images/GoogleLogo.png')} ImageStyle={styles.LogoStyles} TextStyle={styles.normalTextStyle} onPress={() =>{login();}}/>
                )}
            </>
            )}
        </>
    );
};


//Esto sirve para poner el nombre:
//<Text style={{ width: pixelSize, height: pixelSize}} >{user?.displayName || ''}</Text>

export default YourSignInWithGoogleComponent;


