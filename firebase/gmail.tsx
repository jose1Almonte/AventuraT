import React, { useState } from 'react';
import { StyleSheet, View, Alert} from 'react-native';
import { GoogleSignin, GoogleSigninButton} from '@react-native-google-signin/google-signin';
import { firebase } from '@react-native-firebase/auth';

GoogleSignin.configure({
    webClientId: '638631763713-0on48aa795gnpfotr2v3f1odra0j4fqq.apps.googleusercontent.com',
    offlineAccess: true,
    forceCodeForRefreshToken: true,
});


const GmailRegister: React.FC = () => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const refreshPage = () => {
      setRefresh(!refresh);
    };

    const onGoogleButtonPress = async () => {
      if (!isProcessing) {
        setIsProcessing(true);
        try {
            await GoogleSignin.hasPlayServices();
            const { idToken }  = await GoogleSignin.signIn();
            const googleCredential = firebase.auth.GoogleAuthProvider.credential(idToken);
            await firebase.auth().signInWithCredential(googleCredential);
            Alert.alert('yes', 'El usuario acaba de entrar');
          // Si llegamos a este punto, la autenticación fue exitosa
        } catch (error) {
            Alert.alert('nopee', 'No entraste');
            console.log(error);
        } 
        setIsProcessing(false);
      }
    };

  return (
    <View>
      <GoogleSigninButton
        style={styles.googleButton}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}
        onPress={() => {
          onGoogleButtonPress();
          refreshPage();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleButton: {
    width: 192,
    height: 48,
  },
});

export default GmailRegister;
