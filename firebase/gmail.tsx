import { Alert } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { firebase } from '@react-native-firebase/auth';
import { addUser, checkIfUserExists } from '../firebase/Firestore';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

GoogleSignin.configure({
  webClientId: '638631763713-0on48aa795gnpfotr2v3f1odra0j4fqq.apps.googleusercontent.com',
  offlineAccess: true,
  forceCodeForRefreshToken: true,
});

export const onGoogleButtonPress = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = firebase.auth.GoogleAuthProvider.credential(idToken);
    await firebase.auth().signInWithCredential(googleCredential);
    Alert.alert('¡Ingreso exitoso!', 'Haz logrado iniciar sesión con Google');

    // Escuchar cambios en la autenticación para obtener el usuario actualizado
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user: FirebaseAuthTypes.User | null) => {
      unsubscribe(); // Dejar de escuchar después de obtener el usuario actualizado

      if (user) {
        const userEmail = user.email;

        if (userEmail && user.displayName && user.email && user.emailVerified && user.photoURL) {
          if (await checkIfUserExists(userEmail) === false) {
            await addUser([''], user.displayName, user.email, user.emailVerified, user.photoURL, '');
          }
        }
      }
    });

    return true;
  } catch (error) {
    Alert.alert('Ingreso fallido', `${error}`);
    console.log(error);
    return false;
  }
};
