import { Alert} from 'react-native';
import { GoogleSignin} from '@react-native-google-signin/google-signin';
import { firebase } from '@react-native-firebase/auth';
import { addUser, checkIfUserExists } from '../firebase/Firestore';
import auth from '@react-native-firebase/auth';

export const user = auth().currentUser;

GoogleSignin.configure({
    webClientId: '638631763713-0on48aa795gnpfotr2v3f1odra0j4fqq.apps.googleusercontent.com',
    offlineAccess: true,
    forceCodeForRefreshToken: true,
});

export const onGoogleButtonPress = async () => {

try {
    await GoogleSignin.hasPlayServices();

    const { idToken }  = await GoogleSignin.signIn();

    const googleCredential = firebase.auth.GoogleAuthProvider.credential(idToken);

    await firebase.auth().signInWithCredential(googleCredential);
    Alert.alert('¡Ingreso exitoso!', 'Haz logrado iniciar sesión con Google');
  // Si llegamos a este punto, la autenticación fue exitosa
    const userEmail = user?.email;
    if (userEmail && user.displayName && user.email && user.emailVerified && user.photoURL) {
      if (await checkIfUserExists(userEmail) === false){
        await addUser(user.displayName,user.email,user.emailVerified,user.photoURL);
      }
    }
    return true;
} catch (error) {
  Alert.alert('Ingreso fallido', `${error}`);
  console.log(error);
  return false;
}
};

// interface GmailRegisterProps{
//   imageSource: any,
//   text: any;
//   ViewStyle: any;
//   ImageStyle: any;
//   TextStyle: any;
// }

// const GmailRegister = ({
//   // ViewStyle,
//   // imageSource,
//   // text,
//   // ImageStyle,
//   // TextStyle,
// }:GmailRegisterProps) => {

//   return (
//     <>
//       <GoogleSigninButton
//         style={styles.googleButton}
//         size={GoogleSigninButton.Size.Wide}
//         color={GoogleSigninButton.Color.Light}
//         onPress={onGoogleButtonPress}
//       />
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   // container: {
//   //   flex: 1,
//   //   justifyContent: 'center',
//   //   alignItems: 'center',
//   // },
//   // googleButton: {
//   //   flexDirection: 'row',
//   //   width: '86.39%',
//   //   justifyContent: 'space-between',
//   //   alignItems: 'center',
//   //   height: '13%',
//   //   marginBottom: '5%',
//   //   paddingHorizontal: '2%',
//   //   // backgroundColor: '#FFFFFF',
//   //   borderRadius: 8,
//   // },
// });

// export default GmailRegister;
