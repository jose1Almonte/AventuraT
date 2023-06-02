import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { Background } from '../../Layouts/Background';
import Gradient from '../../Layouts/Gradient';
import YourSignInWithGoogleComponent from '../../firebase/PerfilPicture';
import { NavigationProp } from '@react-navigation/native';

interface LoginScreenProps {
  navigation: NavigationProp<Record<string, object | undefined>>;
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

const makingThis = () => {
  console.log('hello');
  Alert.alert('Hello');
};


const LoginScreen = ({ navigation }: LoginScreenProps) => {
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
            <Text style={styles.title}>¡Bienvenido!</Text>
            <Text style={styles.subtitle}>
              Descubre grandes experiencias a tu alrededor
            </Text>
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
            <ContinueWithName
              text="Continuar con Empresa"
              ViewStyle={styles.continueWithFacebookBox}
              imageSource={require('../../images/images.png')}
              ImageStyle={styles.LogoStyles}
              TextStyle={styles.normalTextStyle}
              onPress={() => navigation.navigate('EnterpriseSessionScreen')}
            />
          </View>
        </Gradient>
      </Background>
    </View>
  );
};

export default LoginScreen;

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
});
