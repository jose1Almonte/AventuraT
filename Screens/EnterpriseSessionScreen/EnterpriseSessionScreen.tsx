import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Background} from '../../Layouts/Background';
import Gradient from '../../Layouts/Gradient';
import YourSignInWithGoogleComponent, {
  ProfilePicture,
} from '../../firebase/PerfilPicture';
import {NavigationProp} from '@react-navigation/native';
import {
  checkPasswordCorrect,
  checkResponsibleNameExists,
} from '../../firebase/Firestore';
import auth from '@react-native-firebase/auth';
import currentLog from '../../firebase/UserData';
import {useUser} from '../../Context/UserContext';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import hidePassword from '../../vectores/hidePassword';
import showPasswords from '../../vectores/showPasswords';
import { SvgXml } from 'react-native-svg';

interface EnterpriseSessionScreenProps {
  navigation: NavigationProp<Record<string, object | undefined>>;
}

interface Register {
  Username: string;
  Password: String;
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
    const {user} = await auth().signInWithEmailAndPassword(email, password);
    console.log('Usuario autenticado:', user);
  } catch (error) {
    // Manejar el error de autenticación
  }
};

const makingThis = () => {
  console.log('hello');
  Alert.alert('Hello');
};

const LoginScreenEnterprise = ({navigation}: EnterpriseSessionScreenProps) => {
  const [data, setData] = useState<Register>({
    Username: '',
    Password: '',
  });

  const {user, setUser, setLogged} = useUser();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const submit = async () => {
    if (data.Password.trim() === '' || data.Username.trim() === '') {
      Alert.alert('Campos Vacíos', 'Por favor, complete todos los campos');
      return;
    } else {
      const responsibleNameExists = await checkResponsibleNameExists(
        data.Username,
      );
      if (!responsibleNameExists) {
        Alert.alert(
          'Usuario no existente',
          'El usuario no existe en la base de datos',
        );
        return;
      }
      if (await checkPasswordCorrect(data.Username, data.Password)) {
        await signInWithEmailAndPassword(data.Username, data.Password);
        setUser(currentLog());
        setLogged(true);
        navigation.navigate('HomeScreen');
      } else {
        Alert.alert('Contraseña inválida');
      }
    }
  };

  const handleScreenPress = () => {
    Keyboard.dismiss(); // Ocultar el teclado al pulsar en la pantalla
  };

  return (
    <TouchableWithoutFeedback style={styles.bigBox} onPress={handleScreenPress}>
      <View style={{ flex: 1 }}>
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
              <Text style={styles.label}>Correo electrónico: </Text>
              <TextInput
                style={styles.input}
                onChangeText={text =>
                  setData(prevData => ({...prevData, Username: text}))
                }
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Contraseña: </Text>
              <View style={styles.containerPassword}>
              <TextInput
                secureTextEntry={!showPassword}
                style={styles.input}
                onChangeText={text =>
                  setData(prevData => ({...prevData, Password: text}))
                }
              />

                <TouchableOpacity onPress={togglePasswordVisibility}>
                <>
                  {showPassword ? (
                    <SvgXml xml={hidePassword} />
                  ) : (
                    <SvgXml xml={showPasswords} />
                  )}
                </>
              </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity style={styles.submitButton} onPress={submit}>
              <Text style={styles.buttonText}>Iniciar sesión</Text>
            </TouchableOpacity>
          </View>
        
          <View style={styles.secondBox}>
            <YourSignInWithGoogleComponent
              styles={styles}
              navigation={navigation}
              destinationNavigationComponentName={'HomeScreen'}
              goToLoginScreen={false}
            />
          </View>
        </Gradient>
      </Background>
      </View>
    </TouchableWithoutFeedback>
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
  },

  firstBox: {
    flex: 2,
    marginTop: '25%',
    marginBottom: '6%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  secondBox: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: '15%',
  },

  label: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    lineHeight: 24,
    color: 'white',
  },

  continueWithGoogleBox: {
    flexDirection: 'row',
    width: '86.39%',
    justifyContent: 'center',
    gap: 25,
    alignItems: 'center',
    height: 52,
    marginBottom: '2%',
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
    height: 52,
    paddingHorizontal: '2%',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },
  inputContainer: {
    height: 52,
    width: '80%',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    marginTop: 30,
  },

  containerPassword:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
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
    fontFamily: 'Poppins-Regular',
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
    color: 'white',
  },

  submitButton: {
    display: 'flex',
    alignItems: 'center',
    height: 40,
    width: 200,
    borderRadius: 8,
    marginTop: 25,
    justifyContent: 'center',
    backgroundColor: '#1881B1',
  },

  buttonText: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  },
});
