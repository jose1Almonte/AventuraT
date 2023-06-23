import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,
  BackHandler,
  Pressable,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from "react";
//import RegisterEnterprise from '../../Components/registerEnterprise';
import { ProfilePicture } from '../../firebase/PerfilPicture';
// import RegisterEnterprise from '../../Components/registerEnterprise';
import { Image } from 'react-native';
//import UserProfileScreen from '../UserProfileScreen/UserProfileScreen';
//import UserProfileScreen from '../BusinessProfileScreen/BusinessProfileScreen';
import { Carrousel } from '../../Components/Carrousel';
import { NavigationProp } from '@react-navigation/native';
import menuBar from '../../vectores/menuBar';
import { SvgXml } from 'react-native-svg';
import InputSearch from '../../Components/InputSearch';
import PopularPackages from '../../Components/PopularPackages';
import { LoadingScreenTransparentBackground } from '../../firebase/Firestore';
import FastImage from 'react-native-fast-image';

interface HomeScreenProps {
  navigation: NavigationProp<Record<string, object | undefined>>;
}

const { height } = Dimensions.get('window');

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  // const [showForm, setShowForm] = useState(false);

  // const handleOpenForm = () => {
  //   setShowForm(true);
  // };
  const [searchKeyword, setSearchKeyword] = useState('');
  const [loadingSomeThing, setLoadingSomething] = useState(false);
  const [actualizaPerfil, setActualizaPerfil] = useState(false);
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => backHandler.remove();
  }, []);
  return (
    <>

      {loadingSomeThing && (
        <LoadingScreenTransparentBackground />
      )}

      <ScrollView style={styles.background}>
        <View style={styles.navbar}>
          <View>
            <TouchableOpacity style={styles.colorRed} onPress={() => { navigation.navigate('NavbarScreen', {actualizaPerfil: actualizaPerfil});}}>
              <SvgXml xml={menuBar} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => {
                navigation.navigate('HomeScreen');
              }}>
          <Text style={styles.Central}>AventuraT</Text>
          </TouchableOpacity>
          <ProfilePicture
            navigation={navigation}
            styles={styles}
            destinationNavigationComponentName="UserProfileScreen"
            actualizaPerfil= {actualizaPerfil}
            setActualizaPerfil = {setActualizaPerfil}
          />
        </View>
        <InputSearch navigation={navigation} areYouInSearchResult={false} searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} defaultValue={undefined} />
        <View style={styles.Container2}>
          <View style={styles.Caracteristicas}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('VistaPorTipoScreen', { parameter: 'Montaña' });
              }}>
              <View style={styles.Sepa}>
                <View style={styles.Redondos}>
                  <Image
                    style={styles.Escalado}
                    source={require('../../images/tt.jpg')}
                  />
                </View>
                <Text style={styles.letras}>Montaña</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('VistaPorTipoScreen', { parameter: 'Playa' });
              }}>
              <View style={styles.Sepa}>
                <View style={styles.Redondos}>
                  <Image
                    style={styles.Escalado}
                    source={require('../../images/mas.jpg')}
                  />
                </View>
                <Text style={styles.letras}>Playa</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('VistaPorTipoScreen', {
                  parameter: 'Full-Day'
                });
              }}>
              <View style={styles.Sepa}>
                <View style={styles.Redondos}>
                  <Image
                    style={styles.Escalado}
                    source={require('../../images/para.jpg')}
                  />
                </View>
                <Text style={styles.letras}>Full-Day</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('VistaPorTipoScreen', { parameter: 'Camping' });
              }}>
              <View style={styles.Sepa}>
                <View style={styles.Redondos}>
                  <Image
                    style={styles.Escalado}
                    source={require('../../images/lol.jpg')}
                  />
                </View>
                <Text style={styles.letras}>Camping</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.MyComponent}>
          <Text style={styles.title1}>Destinos Populares</Text>
          <Carrousel navigation={navigation} setLoadingSomething={setLoadingSomething} />
        </View>
        <View style={styles.Container3}>
          <View style={styles.ContainerPackages}>
            <PopularPackages navigation={navigation} />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default HomeScreen;

export const styles = StyleSheet.create({
  background: {
    backgroundColor: '#1DB5BE',
    flex: 1,
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '12%',
    // backgroundColor: 'blue'
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
    marginLeft:'20%',
  },
  Container2: {
    marginTop: height * 0.03,
    marginBottom: height * 0.01,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    // backgroundColor: 'red',
    // alignSelf: 'center'
  },
  Caracteristicas: {
    height: height * 0.07,
    marginTop: 40,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'blue'
  },
  Sepa: {
    padding: 5,
    alignItems: 'center',
  },
  colorRed: {
    height: '30%',
    width: '200%',
    marginLeft: '5%',
    marginTop:'30%',
    justifyContent: 'center',
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
  showMore: {
    width: 100,
    height: 35,
    marginTop: '10%',
    marginBottom: '20%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 12
  },
  moreText: {
    color: 'black',
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
  },
  ContainerPackages: {
    gap: 7,
    flexDirection: 'row',
  },
  title: {
    marginBottom: 15,
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: 'white',
  },
  title1: {
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#1881B1',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  container4: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button4: {
    backgroundColor: '#1881B1',
    padding: 10,
    borderRadius: 5,
  },
  buttonText4: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
