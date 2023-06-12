import { Text, View, StyleSheet, Pressable, ScrollView, Alert, TouchableOpacity } from 'react-native';
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
import { LoadingScreenTransparentBackground, returnEnterpisePic } from '../../firebase/Firestore';
import profileVector from '../../vectores/vectorPerfil';
import profileArrowVector from '../../vectores/vectorPerfilFlecha';

interface businessProfileProps {
  navigation: NavigationProp<Record<string, object | undefined>>;
}

const BusinessProfileScreen = ({ navigation }: businessProfileProps) => {
  const [empresa, setEmpresa] = useState(null);
  const [description, setDescription] = useState(null);
  const [location, setLocation] = useState(null);
  const [nameEnterprise, setNameEnterprise] = useState(null);

  const [loadingSomeThing, setLoadingSomeThing] = useState(false);
  const [userExists, setUserExists] = useState(false);

  useEffect(() => {
    const fetchEnterprisePic = async () => {
      setLoadingSomeThing(true);
      const user = currentLog();
      const pic = await returnEnterpisePic(user?.email);
      if (pic!=null){
        setEmpresa(pic.urlEmpresa);
        setDescription(pic.description);
        setLocation(pic.location);
        setNameEnterprise(pic.nameEnterprise);
      }
      setLoadingSomeThing(false);
    };

    fetchEnterprisePic();
  }, []);
  return (
    <>
    {loadingSomeThing && (
        <LoadingScreenTransparentBackground/>
    )}
    <ScrollView style={styles.scroll}>
      <View style={styles.backGround}>
        <SvgXml xml={vectorPerfil} />
      </View>

      <View style={styles.container}>
        <View style={styles.info}>
          <View style={styles.topInfo}>
            <View style={styles.top}>
              <View>
                {empresa && <PhotoProfile size={100} imageSource={empresa} />}
              </View>
              <SvgXml xml={separator} />

              <View style={stylesBtn.positionContainer}>
                <Pressable
                  onPress={() => {
                    navigation.navigate('RatingsScreen');
                  }}
                >
                  <View style={stylesBtn.containerButton}>
                    <View style={stylesBtn.container}>
                      <Text style={stylesBtn.txt}>Ver calificaciones</Text>
                    </View>
                  </View>
                </Pressable>
                  
                <Pressable onPress={() => {
                  navigation.navigate("PayPremiumScreen");
              }}>
                <View style={stylesBtn.containerButton}>
                  <View style={stylesBtn.containerN}>
                    <Text style={stylesBtn.txt}>AventuraT Nitro</Text>
                  </View>
                </View>
                </Pressable>
              </View>
                

            </View>

            <View style={styles.infoUser}>
              <Text style={styles.txt}>{nameEnterprise}</Text>
              <Text style={styles.description}>{description}</Text>
              <View style={styles.location}>
                <SvgXml xml={vectorLocation} />
                <Text style={styles.nameLocation}>{location}</Text>
              </View>
            </View>

            <View style={styles.buttons}>
              <EditProfileButton />
              <EditPackageButton navigation={navigation} />

              {userExists && (
            <TouchableOpacity style={styles.containerInfo} onPress={() => { navigation.navigate('CreatePackageFormScreen');}}>
              <Text style={styles.txtInfo1}>Crear paquete</Text>
              <SvgXml xml={profileArrowVector} />
            </TouchableOpacity>
          )}
            </View>
            <View style={styles.bottomInfo}>
              <Text style={styles.titlePack}>Paquetes publicados</Text>
            </View>
          </View>
        </View>

        <View style={styles.containerPack}>
        <PublishedPackages navigation={navigation} setLoadingSomeThing={setLoadingSomeThing}/>
        </View>
      </View>
    </ScrollView>
    </>
  );
};

export default BusinessProfileScreen;

const stylesBtn = StyleSheet.create({
  positionContainer: {
    alignSelf: 'flex-end',
    marginBottom: '10%',
  },
  containerButton: {
    display: 'flex',
    alignItems: 'center',
    marginVertical: 5,
  },
  container: {
    height: 40,
    width: 140,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1881B1',
  },
  containerN: {
    height: 40,
    width: 140,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFE403',
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
  },
  info: {
    flex: 1,
  },
  scroll: {
    backgroundColor: 'white',
  },
  infoUser: {
    gap: 8,
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
  topInfo: {
    top: 30,
    margin: 35,
    alignItems: 'flex-start',
    gap: 5,
  },
  bottomInfo: {
    marginTop: '10%',
    display: 'flex',
    justifyContent: 'center',
    gap: 15,
    width: '100%',
    flexDirection: 'column',
  },
  txt: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  description: {
    color: 'black',
    textAlign: 'justify',
    fontSize: 13,
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
    fontSize: 13,
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
    marginTop: '10%',
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
  containerInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 344,
    borderBottomWidth: 1,
    borderBottomColor: '#CFD8E2',
    padding: 2,
  },
  txtInfo1: {
    color: '#1881B1',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
});
