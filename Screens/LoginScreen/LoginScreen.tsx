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
            <YourSignInWithGoogleComponent
              styles={styles}
              navigation={navigation}
              destinationNavigationComponentName={'HomeScreen'}
              goToLoginScreen={false}
            />
            <ContinueWithName
              text="Continuar con Empresa"
              ViewStyle={styles.continueWithFacebookBox}
              imageSource={require('../../images/suitcase.png')}
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
  },

  continueWithGoogleBox: {
    flexDirection: 'row',
    width: '86.39%',
    justifyContent: 'center',
    gap: 25,
    alignItems: 'center',
    height: 52,
    marginBottom: '5%',
    paddingHorizontal: '2%',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },

  continueWithFacebookBox: {
    flexDirection: 'row',
    marginBottom: '18%',
    width: '86.39%',
    gap: 25,
    justifyContent: 'center',
    alignItems: 'center',
    height: 52,
    paddingHorizontal: '2%',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },

  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 45,
    lineHeight: 58.5, // Calculado como 45 * 1.3
    marginBottom: '2%',
    color: '#FFFFFF',
  },

  subtitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    lineHeight: 27,
    width: '80%',
    textAlign: 'center',
    color: '#FFFFFF',
  },

  LogoStyles: {
    marginLeft: '5%',
    width: 30,
    height: 30
  },

  normalTextStyle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    color: '#000000',
    paddingRight: '15%',
  },
});
