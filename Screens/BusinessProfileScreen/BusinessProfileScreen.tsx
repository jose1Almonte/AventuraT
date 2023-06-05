import { Text, View, StyleSheet, Pressable, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SvgXml } from 'react-native-svg';
import vectorPerfil from '../../vectores/vectorPerfil';
import PhotoProfile from '../../Components/Profiles/photoProfile';
import EditProfileButton from '../../Components/Profiles/editProfileButton';
import vectorLocation from '../../vectores/vectorLocation';
import EditPackageButton from '../../Components/Profiles/editPackagesButton';
import PublishedPackages from '../../Components/Profiles/publishedPackages';
import separator from '../../vectores/separator';
import star from '../../vectores/star';
import { NavigationProp } from '@react-navigation/native';
import currentLog from '../../firebase/UserData';
import { returnEnterpisePic } from '../../firebase/Firestore';

interface businessProfileProps {
  navigation: NavigationProp<Record<string, object | undefined>>;
}

const BusinessProfileScreen = ({ navigation }: businessProfileProps) => {

  const [empresa, setEmpresa] = useState(null);
  const [description, setDescription] = useState(null);
  const [location, setLocation] = useState(null);
  const [nameEnterprise, setNameEnterprise] = useState(null);

  useEffect(() => {
    const fetchEnterprisePic = async () => {
      const user = currentLog();
      const pic = await returnEnterpisePic(user?.email);
      if(pic!=null){
        setEmpresa(pic.urlEmpresa);
        setDescription(pic.description);
        setLocation(pic.location);
        setNameEnterprise(pic.nameEnterprise);
      }
    };

    fetchEnterprisePic();
  }, []);


  return (
    <ScrollView style={styles.scroll}>
      <View>
      <View style={styles.info}>
        <View style={styles.topInfo}>
          <View style={styles.top}>

          <View>
          {empresa &&
            <PhotoProfile size={90} imageSource={empresa}/>
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
          <Text style={styles.txt}>{nameEnterprise}</Text>
          <Text style={styles.description}>
            {description}
          </Text>
          <View style={styles.location}>
            <SvgXml xml={vectorLocation} />
            <Text style={styles.nameLocation}>{location}</Text>
          </View>
          <View style={styles.buttons}>
            <EditProfileButton />
            <EditPackageButton />
          </View>
          <View style={styles.bottomInfo}>
            <Text style={styles.titlePack}>Paquetes publicados</Text>
          </View>
        </View>
      </View>
      </View>
      <View style={styles.containerPack}>
        <View style={styles.containerPack2}>
        <View style={styles.containerPack3}>
              <PublishedPackages />
        </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default BusinessProfileScreen;

const stylesBtn = StyleSheet.create({
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
  container: {
    flex: 1,
    backgroundColor: '#1DB5BE',
  },
  info: {
    flex: 1,
    marginBottom: 20,
    backgroundColor: '#1DB5BE',
  },
  scroll:{
    backgroundColor: '#1DB5BE',
    flex:1},
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
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  nameLocation: {
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
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  containerPack2: {
    backgroundColor: '#3d9bba',
    width: '50%',
    borderRadius:20,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    
  },
  containerPack3: {
    backgroundColor: 'black',
    width: '85%',
    borderRadius:20,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    marginTop:'5%',
    marginBottom:'5%',
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
