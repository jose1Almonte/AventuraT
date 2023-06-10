import { Text, View, StyleSheet, Pressable, ScrollView, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SvgXml } from 'react-native-svg';
// import vectorPerfil from '../../vectores/vectorPerfil';
import PhotoProfile from '../../Components/Profiles/photoProfile';
// import EditProfileButton from '../../Components/Profiles/editProfileButton';
import vectorLocation from '../../vectores/vectorLocation';
// import EditPackageButton from '../../Components/Profiles/editPackagesButton';
// import PublishedPackages from '../../Components/Profiles/publishedPackages';
import separator from '../../vectores/separator';
import star from '../../vectores/star';
import { NavigationProp } from '@react-navigation/native';
import currentLog from '../../firebase/UserData';
import { LoadingScreenTransparentBackground, returnEnterpisePic } from '../../firebase/Firestore';
import profileVector from '../../vectores/vectorPerfil';
import { PackageI } from '../../models/package.interface';
import firestore from '@react-native-firebase/firestore';
import PublishedPackages2 from '../../Components/Profiles/publishedPackages2';


interface businessProfileProps {
  navigation: NavigationProp<Record<string, object | undefined>>;
  route?: any;
  data?: PackageI;
  // userData?: Partial<Record<string, any>>;
}

const BusinessProfileScreen = ({ navigation, route }) => {
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
    console.log('userData: ',userData);
    const fetchData = async () => {
      setLoadingSomething(true);
      // console.log('packageIn?.emailEnterprise: ' ,packageIn.emailEnterprise);
      if (packageIn && packageIn.emailEnterprise) {

        // console.log('meee: ',packageIn.emailEnterprise);
        const querySnapshot = await firestore().collection('users').where('email', '==', packageIn.emailEnterprise).get();

        querySnapshot.forEach((doc) => {
          // console.log(doc.data().displayName);
          // console.log(userData.displayName);
          setNameEnterprise(doc.data().displayName);
          setEmailEnterprise(doc.data().responsibleName);
          setEmpresa(doc.data().urlEmpresa);
          setDescription(doc.data().description);
          setLocation(doc.data().location);
        });
        // const user = currentLog();
        const pic = await returnEnterpisePic(packageIn.emailEnterprise);
        if (pic != null){
          setEmpresa2(pic.urlEmpresa);
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

        {loadingSomeThing && (
            <LoadingScreenTransparentBackground/>
        )}

    <ScrollView style={styles.scroll}>
        <View style={styles.backGround}>
          <SvgXml xml={profileVector} />
        </View>

      <View>
        <View style={styles.info}>
          <View style={styles.topInfo}>
            <View style={styles.top}>

            <View>
            {empresa2 &&
            <>
              <PhotoProfile size={90} imageSource={empresa2}/>
              {/* <Image style = {styles.imagesStyles} source={{uri: empresa2}}/> */}
            </>
            }
            </View>
              <SvgXml xml={separator} />
              <View style={styles.contenedorPuntaje}>
                <View style={styles.contenedorEstrella}>
                  <Text style={styles.point}>4,5</Text>
                  <SvgXml xml={star} />
                </View>
                <Text style={styles.description}>Calificación</Text>
              </View>
            </View>
            <View style={stylesBtn.positionContainer}>
              <Pressable onPress={() => {
                navigation.navigate('RatingsScreen');
              }}>
                <View style={stylesBtn.containerButton}>
                  <View style={stylesBtn.container}>
                    <Text style={stylesBtn.txt}>Ver calificaciones</Text>
                  </View>
                </View>
              </Pressable>
              <Pressable onPress={() => {
                navigation.navigate('FeedbackScreen');
              }}>
                <View style={stylesBtn.containerButton}>
                  <View style={stylesBtn.container}>
                    <Text style={stylesBtn.txt}>¡Calificanos!</Text>
                  </View>
                </View>
              </Pressable>
            </View>
            {packageIn.mainImageUrl &&
            <Text style={styles.txt}>Empresa: {nameEnterprise2}</Text>
            // <Text style={styles.txt}>Empresa: {userData.displayName}</Text>
            }
            {/* <Text style={styles.txt}>Encargado: {nameEnterprise}</Text> */}
            <Text style={styles.txt}>Encargado: {userData.displayName}</Text>
            <Text style={styles.description}>
              {description}
            </Text>
            <View style={styles.location}>
              <SvgXml xml={vectorLocation} />
              <Text style={styles.nameLocation}>{location}</Text>
            </View>
            <View style={styles.bottomInfo}>
              <Text style={styles.titlePack}>Paquetes publicados</Text>
            </View>
          </View>
        </View>


        <View style={styles.containerPack}>
          {/* <View style={styles.containerPack2}> */}
          {/* <View style={styles.containerPack3}> */}
          {packageIn.emailEnterprise !== undefined && (
            <PublishedPackages2 email={packageIn.emailEnterprise} />
          )}
          {/* </View> */}
          {/* </View> */}
        </View>
      </View>

    </ScrollView>
    </>

  );
};

export default BusinessProfileScreen;

const stylesBtn = StyleSheet.create({
  giantBox:{
    flex: 1,
  },

  containerButton: {
    display: 'flex',
    alignItems: 'center',
    marginVertical: 5,
  },
  positionContainer: {
    paddingStart: 220,
  },
  container: {
    height: 40,
    width: 140,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1881B1',
  },
  txt: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
});



const styles = StyleSheet.create({

  profileView:{
    backgroundColor: 'red',
    height: 100,
    width: 100,
    overflow: 'hidden',
  },

  imagesStyles:{
    width: '100%',
    height: '100%',
  },
  backGround: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
    // display: 'flex',
    backgroundColor: '#1DB5BE',
  },

  container: {
    flex: 1,
    backgroundColor: '#1DB5BE',
  },
  info: {
    flex: 1,
    // marginBottom: 20,
    // backgroundColor: '#1DB5BE',
    // backgroundColor: 'red',
  },
  scroll:{
    backgroundColor: 'white',
    // backgroundColor: 'blue',
    // flex:1,
  },
  top: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignContent: 'center',
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
    fontFamily: 'Poppins-Regular',
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
    color:'black',
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  nameLocation: {
    color:'black',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
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
    alignItems:'center',
    textAlign:'center',
  },
  containerPack: {
    // width: '100%',
    // justifyContent: 'center',
    // alignItems: 'center',
    // alignContent: 'center',
    // backgroundColor: '#3d9bba',
    backgroundColor: 'white',
    width: '100%',
    // borderRadius:20,
    justifyContent: 'space-between',
    marginTop:'5%',
    // marginBottom:'5%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
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
