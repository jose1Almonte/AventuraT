import {Text, View, StyleSheet, Pressable, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SvgXml} from 'react-native-svg';
import vectorPerfil from '../../vectores/vectorPerfil';
import PhotoProfile from '../../Components/Profiles/photoProfile';
import EditProfileButton from '../../Components/Profiles/editProfileButton';
import vectorLocation from '../../vectores/vectorLocation';
import EditPackageButton from '../../Components/Profiles/editPackagesButton';
import PublishedPackages from '../../Components/Profiles/publishedPackages';
import separator from '../../vectores/separator';
import star from '../../vectores/star';
import {NavigationProp} from '@react-navigation/native';
import currentLog from '../../firebase/UserData';
import {returnEnterpisePic} from '../../firebase/Firestore';
import profileVector from '../../vectores/vectorPerfil';
import {PackageI} from '../../models/package.interface';
import firestore from '@react-native-firebase/firestore';
import PublishedPackages2 from '../../Components/Profiles/publishedPackages2';

interface businessProfileProps {
  navigation: NavigationProp<Record<string, object | undefined>>;
  route?: any;
  data?: PackageI;
}

const BusinessProfileScreen = ({navigation, route}: businessProfileProps) => {
  let packageIn: PackageI = route.params.data;
  const {userData: userData} = route.params;
  const [nameEnterprise, setNameEnterprise] = useState(null);
  const [emailEnterprise, setEmailEnterprise] = useState('');
  const [description, setDescription] = useState(null);
  const [location, setLocation] = useState(null);
  const [empresa, setEmpresa] = useState(null);
  const [nameEnterprise2, setNameEnterprise2] = useState(null);
  const [description2, setDescription2] = useState(null);
  const [location2, setLocation2] = useState(null);
  const [empresa2, setEmpresa2] = useState(null);

  const [loadingSomeThing, setLoadingSomething] = useState(false);

  useEffect(() => {
    console.log('userData: ', userData);
    const fetchData = async () => {
      setLoadingSomething(true);
      // console.log('packageIn?.emailEnterprise: ' ,packageIn.emailEnterprise);
      if (packageIn && packageIn.emailEnterprise) {
        // console.log('meee: ',packageIn.emailEnterprise);
        const querySnapshot = await firestore()
          .collection('users')
          .where('email', '==', packageIn.emailEnterprise)
          .get();
        querySnapshot.forEach(doc => {
          // console.log(doc.data().displayName);
          // console.log(userData.displayName);
          setNameEnterprise(doc.data().displayName);
          setEmailEnterprise(doc.data().responsibleName);
          setEmpresa(doc.data().urlEmpresa);
          setDescription(doc.data().description);
          setLocation(doc.data().location);
        });
        const pic = await returnEnterpisePic(packageIn.emailEnterprise);
        if (pic != null) {
          setEmpresa2(pic.urlEmpresa);
          console.log(empresa2);
          console.log('urlEmpresa', pic.urlEmpresa);
          setDescription2(pic.description);
          setLocation2(pic.location);
          setNameEnterprise2(pic.nameEnterprise);
        }
      }
      setLoadingSomething(false);
    };
    fetchData();
  }, [packageIn, packageIn.emailEnterprise]);

  return (
    <>
      <ScrollView style={styles.scroll}>
        <View style={styles.backGround}>
          <SvgXml xml={profileVector} />
        </View>

        <View>
          <View style={styles.info}>
            <View style={styles.topInfo}>
              <View style={styles.top}>
                <View>
                  {empresa2 && (
                    <>
                      <PhotoProfile size={100} imageSource={empresa2} />
                    </>
                  )}
                </View>
                <SvgXml xml={separator} />

                <View style={stylesBtn.positionContainer}>
                  <Pressable
                    onPress={() => {
                      navigation.navigate('RatingsScreen');
                    }}>
                    <View style={stylesBtn.containerButton}>
                      <View style={stylesBtn.container}>
                        <Text style={stylesBtn.txt}>Ver calificaciones</Text>
                      </View>
                    </View>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      navigation.navigate('FeedbackScreen');
                    }}>
                    <View style={stylesBtn.containerButton}>
                      <View style={stylesBtn.container2}>
                        <Text style={stylesBtn.txt}>¡Califícanos!</Text>
                        <SvgXml xml={star} width={20} height={20} />
                      </View>
                    </View>
                  </Pressable>
                </View>
              </View>

              {packageIn.mainImageUrl && (
                <Text style={styles.txt}>Empresa: {nameEnterprise2}</Text>
              )}
              <View style={styles.containerManager}>
                <Text style={styles.txt}>Encargado: </Text>
                <Text style={styles.txtManager}>{nameEnterprise}</Text>
              </View>
              {/* <Text style={styles.description}>{packageIn.description}</Text> */}
              {/* <View style={styles.location}>
                <SvgXml xml={vectorLocation} />
                <Text style={styles.nameLocation}>{packageIn.location}</Text>
              </View> */}
              <View style={styles.bottomInfo}>
                <Text style={styles.titlePack}>Paquetes publicados</Text>
              </View>
            </View>
          </View>
          <View style={styles.containerPack}>
            {packageIn.emailEnterprise !== undefined && (
              <PublishedPackages2 email={packageIn.emailEnterprise} />
            )}
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default BusinessProfileScreen;

const stylesBtn = StyleSheet.create({
  giantBox: {
    flex: 1,
  },

  containerButton: {
    display: 'flex',
    alignItems: 'center',
    marginVertical: 5,
  },
  positionContainer: {
    // marg
    // justifyContent: 'center',
    alignSelf: 'flex-end',
    // marginBottom: 20,
    // backgroundColor: "red"
  },
  container: {
    height: 40,
    width: 150,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1881B1',
  },
  container2: {
    height: 40,
    width: 150,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1DB5BE',
    flexDirection: 'row',
    gap: 8,
  },

  txt: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
});

const styles = StyleSheet.create({
  backGround: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
    backgroundColor: '#1DB5BE',
  },

  container: {
    flex: 1,
    backgroundColor: '#1DB5BE',
  },
  info: {
    flex: 1,
  },
  scroll: {
    backgroundColor: 'white',
  },
  top: {
    marginTop: 110,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  containerManager: {
    flexDirection: 'row',
  },
  txtManager: {
    color: '#1881B1',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  topInfo: {
    top: 30,
    margin: 35,
    alignItems: 'flex-start',
    gap: 5,
  },
  bottomInfo: {
    marginTop: 15,
    display: 'flex',
    justifyContent: 'center',
    gap: 15,
    width: '100%',
    flexDirection: 'column',
  },
  fondo: {
    flex: 1,
    display: 'flex',
  },
  txt: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  title: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  txtInfo: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  txtInfo1: {
    color: '#1881B1',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  description: {
    color: 'black',
    textAlign: 'justify',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  location: {
    color: 'black',
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  nameLocation: {
    color: 'black',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    alignSelf: 'flex-end',
    flexDirection: 'row',
    width: '100%',
  },
  titlePack: {
    color: 'black',
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    alignItems: 'center',
    textAlign: 'center',
  },
  containerPack: {
    justifyContent: 'center',
    backgroundColor: 'white',
    width: '100%',
    marginTop: '5%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 5,
  },
  contenedorPuntaje: {
    flexDirection: 'column',
  },
  contenedorEstrella: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    fontFamily: 'Poppins-Bold',
  },
  point: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'Poppins-Bold',
  },
});
