import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Background } from '../../Layouts/Background';
import Gradient from '../../Layouts/Gradient';
import YourSignInWithGoogleComponent, { ProfilePicture } from '../../firebase/PerfilPicture';
import { NavigationProp } from '@react-navigation/native';
import { checkPasswordCorrect, checkResponsibleNameExists } from '../../firebase/Firestore';
import auth from '@react-native-firebase/auth';
import currentLog from '../../firebase/UserData';
import { useUser } from '../../Context/UserContext';

interface EnterpriseSessionScreenProps {
  navigation: NavigationProp<Record<string, object | undefined>>;
}

interface Register{
  Username: string;
  Password:String;
}

interface ContinueWithNameProps {
  imageSource: any;
  text: any;
  ViewStyle: any;
  ImageStyle: any;
  TextStyle: any;
  onPress: any;
}

export const ContinueWithName = ({
  text,
  ViewStyle,
  imageSource,
  ImageStyle,
  TextStyle,
  onPress,
}: ContinueWithNameProps) => {
  return (
    <>
      <TouchableOpacity style={ViewStyle} onPress={onPress}>
        <>
          <Image source={imageSource} style={ImageStyle} />
          <Text style={TextStyle}>{text}</Text>
        </>
      </TouchableOpacity>
    </>
  );
};


const signInWithEmailAndPassword = async (email, password) => {
  try {
    const { user } = await auth().signInWithEmailAndPassword(email, password);
    console.log('Usuario autenticado:', user);
  } catch (error) {
    console.error('Error al autenticar el usuario:', error);
    // Manejar el error de autenticación
  }
};

const makingThis = () => {
  console.log('hello');
  Alert.alert('Hello');
};



const LoginScreenEnterprise = ({ navigation }: EnterpriseSessionScreenProps) => {
  const [data, setData] = useState<Register>({
    Username :'',
    Password : '',
  });

  const { user, setUser, setLogged } = useUser();

  const submit = async () => {
    if (
      data.Password.trim() === '' ||
      data.Username.trim() === ''
    ) {
      Alert.alert('Campos Vacíos', 'Por favor, complete todos los campos');
      return;
    }
    else{
      const responsibleNameExists = await checkResponsibleNameExists(data.Username);
      const passwordExists = await checkResponsibleNameExists(data.Username);
      if (!responsibleNameExists) {
        Alert.alert('Usuario no Existente', 'El usuario no existe en la base de datos');
        return;
      }
      if (await checkPasswordCorrect(data.Username, data.Password)){
        await signInWithEmailAndPassword(data.Username,data.Password);
        setUser(currentLog());
        setLogged(true);
        navigation.navigate('HomeScreen');
      }
      else {
        Alert.alert('Contraseña inválida');
      }
    }};

  return (
    <View style={styles.bigBox}>
      <Background
        image={require('../../images/loginLayout.png')}
        style={styles.backGround}>
        <Gradient
          colors={[
            '#1DB5BE',
            'rgba(24, 129, 177, 0.36);',
            'rgba(24, 129, 177, 0.26);',
            'rgba(24, 129, 177, 0.16);',
            'rgba(24, 129, 177, 0);',
          ]}
          locations={[0, 0.25, 0.5, 0.9, 1]}
          style={styles.linearGradient}>
          <View style={styles.firstBox}>
          <View style={styles.inputContainer}>
          <Text style={styles.label}>Email: </Text>
          <TextInput
                style={styles.input}
                onChangeText={(text) => setData((prevData) => ({ ...prevData, Username: text }))}
              />
          </View>
          <View style={styles.inputContainer}>
          <Text style={styles.label}>Password: </Text>
          <TextInput
                style={styles.input}
                onChangeText={(text) => setData((prevData) => ({ ...prevData, Password: text }))}
              />
          </View>
          <TouchableOpacity style={styles.submitButton} onPress={submit}>
            <Text style={styles.buttonText}>Ingresar sesión</Text>
          </TouchableOpacity>
          </View>

          <View style={styles.secondBox}>
            {/* <GmailRegister ViewStyle={styles.continueWithGoogleBox}/> */}
            <YourSignInWithGoogleComponent
              styles={styles}
              navigation={navigation}
              destinationNavigationComponentName={'HomeScreen'}
              //destinationNavigationComponentName={'FeedbackScreen'}
              goToLoginScreen={false}
            />
            {/* <ContinueWithName text = "Continuar con Google" ViewStyle={styles.continueWithGoogleBox} imageSource={require('../../images/GoogleLogo.png')} ImageStyle={styles.LogoStyles} TextStyle={styles.normalTextStyle} onPress={onGoogleButtonPress}/> */}
            <ContinueWithName
              text="Continuar con Facebook"
              ViewStyle={styles.continueWithFacebookBox}
              imageSource={require('../../images/FacebookLogo.png')}
              ImageStyle={styles.LogoStyles}
              TextStyle={styles.normalTextStyle}
              onPress={() => makingThis()}
            />
          </View>
        </Gradient>
      </Background>
    </View>
  );
};

export default LoginScreenEnterprise;

export const styles = StyleSheet.create({
  backGround: {
    flex: 1,
  },

  linearGradient: {
    flex: 1,
  },

  bigBox: {
    flex: 1,
    // backgroundColor: 'red',
  },

  firstBox: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  secondBox: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: '10%',
  },

  label: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 24,
    color: 'white',
  },

  continueWithGoogleBox: {
    flexDirection: 'row',
    width: '86.39%',
    justifyContent: 'center',
    gap: 25,
    alignItems: 'center',
    height: '10%',
    marginBottom: '5%',
    paddingHorizontal: '2%',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },

  continueWithFacebookBox: {
    flexDirection: 'row',
    marginBottom: '5%',
    width: '86.39%',
    gap: 25,
    justifyContent: 'center',
    alignItems: 'center',
    height: '10%',
    paddingHorizontal: '2%',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },

  title: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 45,
    lineHeight: 58.5, // Calculado como 45 * 1.3
    color: '#FFFFFF',
  },

  inputContainer: {
    height: 52,
    width: '80%',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    marginTop: 22,
  },

  subtitle: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '800',
    fontSize: 18,
    lineHeight: 27,
    textAlign: 'center',
    color: '#FFFFFF',
  },

  LogoStyles: {
    marginLeft: '5%',
  },

  normalTextStyle: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    color: '#000000',
    paddingRight: '15%',
  },
  input: {
    marginTop: 8,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 24,
    color: 'black',
  },

  submitButton: {
    display: 'flex',
    alignItems: 'center',
    height: 40,
    width: 200,
    borderRadius: 5,
    justifyContent: 'center',
    backgroundColor: '#1881B1',
  },

  buttonText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  },
});
