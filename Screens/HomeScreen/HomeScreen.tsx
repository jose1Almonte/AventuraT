import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  PixelRatio,
  Dimensions,
  BackHandler,
} from 'react-native';
import React, {useEffect} from 'react';
//import RegisterEnterprise from '../../Components/registerEnterprise';
import YourSignInWithGoogleComponent from '../../firebase/PerfilPicture';
import RegisterEnterprise from '../../Components/registerEnterprise';
import {Image} from 'react-native';
//import UserProfileScreen from '../UserProfileScreen/UserProfileScreen';
//import UserProfileScreen from '../BusinessProfileScreen/BusinessProfileScreen';
import {Carrousel} from '../../Components/Carrusel';
import {NavigationProp} from '@react-navigation/native';
import menuBar from '../../images/vectores/menuBar';
import {SvgXml} from 'react-native-svg';
import InputSearch from '../../Components/InputSearch';

interface HomeScreenProps {
  navigation: NavigationProp<Record<string, object | undefined>>;
}

const {height, width} = Dimensions.get('window');


const HomeScreen = ({navigation}: HomeScreenProps) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => backHandler.remove();
  }, []);
  return (
    <ScrollView style={styles.backGround}>
      <View style={styles.container}>
        <View style={styles.flex}>
          <SvgXml xml={menuBar} />
          <Text style={styles.Central}>AventuraT</Text>
          <View>
            <YourSignInWithGoogleComponent
              styles={styles}
              goToLoginScreen={true}
              destinationNavigationComponentName="LoginScreen"
              navigation={navigation}
            />
          </View>
        </View>
      </View>
      <InputSearch/>
      <View style={styles.Container2}>
        <View style={styles.Caracteristicas}>
          <View style={styles.Sepa}>
            <View style={styles.Redondos}><Image style={styles.Escalado} source={require('../../images/tt.jpg')}></Image></View>
            <Text style={styles.letritas}>Montaña</Text>
          </View>
          <View style={styles.Sepa}>
            <View style={styles.Redondos}><Image style={styles.Escalado} source={require('../../images/mas.jpg')}></Image></View>
            <Text style={styles.letritas3}>Playa</Text>
          </View>
          <View style={styles.Sepa}>
            <View style={styles.Redondos}><Image style={styles.Escalado} source={require('../../images/para.jpg')}></Image></View>
            <Text style={styles.letritas2}>Full-Day</Text>
          </View >
          <View style={styles.Sepa}>
            <View style={styles.Redondos}><Image style={styles.Escalado} source={require('../../images/lol.jpg')}></Image></View>
            <Text style={styles.letritas}>Camping</Text>
          </View>
        </View>
      </View>
      <Text style={styles.MyComponent}>Destinos Populares</Text>
      <View>
        <Carrousel/>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

export const styles = StyleSheet.create({
  backGround: {
    backgroundColor: '#1DB5BE',
    flex: 1,
  },
  Sepa: {
    padding: 4,
  },
  Escalado: {
    width: width * 0.14,
    height: height * 0.07,
  },
  flex: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  container: {
    flex: 1,
    margin: 25,
  },
  Container2: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 10,
  },
  Caracteristicas: {
    height: height * 0.07,
    width: width * 0.88,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Redondos: {
    backgroundColor: '#1881B1',
    borderRadius: 100,
    height: height * 0.1,
    width: height * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Central: {
    fontFamily: 'Sansation',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 30,
    lineHeight: 70,
    letterSpacing: 0.05,
    color: '#FFFFFF',
    opacity: 0.8,
    height: height*0.13
  },
  Central2: {
    fontFamily: 'Sansation',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 15,
    lineHeight: 30,
    letterSpacing: 0.05,
    color: '#FFFFFF',
    opacity: 0.8,
  },

  MyComponent:{
  fontFamily: 'Poppins',
  fontStyle: 'normal',
  fontWeight: '700',
  fontSize: 18,
  lineHeight: 27,
  color: '#FFFFFF',
  marginTop: height*0.03,
  marginBottom: height*0.01,
  marginLeft: width*0.10,
},

letritas:{
  fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '600',
    color: '#FFFDFD',
    marginLeft: width*0.025,
},

letritas2:{
  fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '600',
    color: '#FFFDFD',
    marginLeft: width*0.03,

},

letritas3:{
  fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '600',
    color: '#FFFDFD',
    marginLeft: width*0.055,

},

});
