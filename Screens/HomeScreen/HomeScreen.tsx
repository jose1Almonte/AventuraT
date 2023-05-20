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
import YourSignInWithGoogleComponent, {
  ProfilePicture,
} from '../../firebase/PerfilPicture';
import RegisterEnterprise from '../../Components/registerEnterprise';
import {Image} from 'react-native';
//import UserProfileScreen from '../UserProfileScreen/UserProfileScreen';
//import UserProfileScreen from '../BusinessProfileScreen/BusinessProfileScreen';
import {Carrousel} from '../../Components/Carrusel';
import {NavigationProp} from '@react-navigation/native';
import menuBar from '../../images/vectores/menuBar';
import {SvgXml} from 'react-native-svg';
import InputSearch from '../../Components/InputSearch';
import Califications from '../../Components/califications';
import PopularPackages from '../../Components/PopularPackages';

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
     
        <View style={styles.flex}>
          <SvgXml xml={menuBar} />
          <Text style={styles.Central}>AventuraT</Text>

          <ProfilePicture
            navigation={navigation}
            styles={styles}
            destinationNavigationComponentName="UserProfileScreen"
          />
        </View>
        <InputSearch />
        <View style={styles.Container2}>
          <View style={styles.Caracteristicas}>
            <View style={styles.Sepa}>
              <View style={styles.Redondos}>
                <Image
                  style={styles.Escalado}
                  source={require('../../images/tt.jpg')}></Image>
              </View>
              <Text style={styles.letras}>Montaña</Text>
            </View>
            <View style={styles.Sepa}>
              <View style={styles.Redondos}>
                <Image
                  style={styles.Escalado}
                  source={require('../../images/mas.jpg')}></Image>
              </View>
              <Text style={styles.letras}>Playa</Text>
            </View>
            <View style={styles.Sepa}>
              <View style={styles.Redondos}>
                <Image
                  style={styles.Escalado}
                  source={require('../../images/para.jpg')}></Image>
              </View>
              <Text style={styles.letras}>Full-Day</Text>
            </View>
            <View style={styles.Sepa}>
              <View style={styles.Redondos}>
                <Image
                  style={styles.Escalado}
                  source={require('../../images/lol.jpg')}></Image>
              </View>
              <Text style={styles.letras}>Camping</Text>
            </View>
          </View>
        </View>
        <View style={styles.MyComponent}>
          <Text style={styles.title1}>Destinos Populares</Text>
          <Carrousel />
        </View>
        <View style={styles.Container3}>
          <Text style={styles.title}>Paquetes Populares</Text>
          <View style={styles.ContainerPackages}><PopularPackages/>
          <PopularPackages/>
          <PopularPackages/>
          </View>
          
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
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 30,
    marginRight: 30,
    width: 350,
  },
  Central: {
    fontFamily: 'Sansation',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 30,
    lineHeight: 100,
    letterSpacing: 0.05,
    color: '#FFFFFF',
    opacity: 0.8,
    height: height * 0.13,
  },
  Container2: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 10,
  },
  Caracteristicas: {
    height: height * 0.07,
    marginTop: 15,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Sepa: {
    padding: 5,
    alignItems: 'center',
  },
  Redondos: {
    backgroundColor: '#1881B1',
    borderRadius: 100,
    height: 78,
    width: 78,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Escalado: {
    borderRadius: 100,
    width: 54,
    height: 54,
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
  MyComponent: {
    marginTop: height * 0.03,
    marginBottom: height * 0.01,
  },
  Container3: {
    marginTop: height * 0.03,
    marginBottom: height * 0.01,
    margin: 30,
  },
  ContainerPackages:{
    gap: 7,
    flexDirection: "row",
  },
  title: {
    marginBottom: 15,
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: 'white',
  },
  title1:{
    marginBottom: 15,
    marginLeft: 30,
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: 'white',
  },
  letras: {
    color: 'white',
    marginTop: 10,
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
});
