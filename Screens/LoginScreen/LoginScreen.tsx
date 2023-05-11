import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { Background } from '../../Layouts/Background';
import Gradient from '../../Layouts/Gradient';

// declare global {
//   namespace JSX {
//     interface IntrinsicElements {
//       continueWithName: continueWithNameProps;
//     }
//   }
// }

interface ContinueWithNameProps{
  imageSource: any,
  text: any;
  ViewStyle: any;
  // ImageStyle: any;
  // TextStyle: any;
}

const ContinueWithName = ({
  text,
  ViewStyle,
  imageSource,
}: ContinueWithNameProps) => {
  return (

    <View style={ViewStyle}>
      <Image source={imageSource}/>
      <Text>{text}</Text>
    </View>
  );

};

const LoginScreen = () => {
  return (
    <View style = {styles.bigBox}>
      <Background image = {require('../../images/loginLayout.png')} style={styles.backGround}>
      <Gradient colors = {['#1DB5BE', 'rgba(24, 129, 177, 0.36);', 'rgba(24, 129, 177, 0.26);', 'rgba(24, 129, 177, 0.16);', 'rgba(24, 129, 177, 0);']} locations={[0, 0.25, 0.5, 0.9, 1]} style={styles.linearGradient} >
            <View>
              <Text>¡Bienvenido!</Text>
              <Text>Descubre grandes experiencias a tu alrededor</Text>
            </View>

            <View>
              {/* <continueWithName text='Continuar con google' ViewStyle = {styles.continueWithGoogleBox}/> */}
              <ContinueWithName text = 'Registrate con Google' ViewStyle={styles.continueWithGoogleBox} imageSource={require('../../images/GoogleLogo.png')}/>
            </View>
      </Gradient>
      </Background>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  backGround:{
    flex: 1,
  },

  linearGradient: {
    flex: 1,
  },

  bigBox: {
    flex: 1,
    backgroundColor: 'red',
  },

  continueWithGoogleBox:{
    backgroundColor: 'red',
  },

});
