import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { SvgXml } from 'react-native-svg';
import profileVector from '../../vectores/vectorPerfil';
import PhotoProfile from '../../Components/Profiles/photoProfile';
import EditProfileButton from '../../Components/Profiles/editProfileButton';
import profileArrowVector from '../../vectores/vectorPerfilFlecha';
import auth, { firebase } from '@react-native-firebase/auth';
import { NavigationProp } from '@react-navigation/native';
import { useUser } from '../../Context/UserContext';
import currentLog from '../../firebase/UserData';
import { deleteExpiredDocuments } from '../../firebase/DeletePackage';
import { LoadingScreenTransparentBackground, checkResponsibleNameExists } from '../../firebase/Firestore'; // Update the path to the FirebaseFunctions file
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { ValuesContext } from '../../Context/ValuesContext';
import vectorPerfil from '../../vectores/vectorPerfil';

interface UserProfileScreenProps {
  navigation: NavigationProp<Record<string, object | undefined>>,

}

export const UserProfileScreen = ({
  navigation,
}: UserProfileScreenProps) => {

  // const { actualizaPerfil } = useContext(PerfilContext);
  // console.log(actualizaPerfil);
  const { setUser, setLogged } = useUser();
  const logout = async (): Promise<void> => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch { }
    await auth().signOut();
    setUser(null);
    setLogged(false);
    setLoadingSomething(false);
  };

  const user = currentLog();
  const [userExists, setUserExists] = useState(false);

  const [loadingSomeThing, setLoadingSomething] = useState(false);

  useEffect(() => {
    const checkUserExists = async () => {
      setLoadingSomething(true);

      const userEmail = user?.email;

      // console.log(userEmail);
      const exists = await checkResponsibleNameExists(userEmail);
      // console.log(exists);
      setUserExists(exists);
      setLoadingSomething(false);
    };

    checkUserExists();
  }, [user?.email]);

  return (
    <>
      {loadingSomeThing && <LoadingScreenTransparentBackground />}

      <ScrollView style={styles.container}>
        <View style={styles.container}>
          <View style={styles.backGround}>
            <SvgXml xml={vectorPerfil} />
          </View>

          <View style={styles.info}>
            <View style={styles.topInfo}>
              <View style={styles.photoBox}>
                <PhotoProfile
                  size={100}
                  imageSource={
                    user?.photoURL
                      ? user.photoURL
                      : 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg'
                  }
                />
              </View>

              <View style={styles.detailsUserBox}>
                <Text style={styles.txt}>{user?.email}</Text>
              </View>

              <TouchableOpacity style={styles.editProfileButtonBox} onPress={() => { navigation.navigate('EditProfileScreen'); }}>
                <EditProfileButton />
              </TouchableOpacity>
            </View>

            <View style={styles.info2}>
              <Text style={styles.title}>Configuración</Text>

              {userExists && (
                <TouchableOpacity
                  style={styles.containerInfo}
                  onPress={() => {
                    navigation.navigate('BusinessProfileScreen');
                  }}>
                  <Text style={styles.txtInfo}>Perfil empresarial</Text>
                  <SvgXml xml={profileArrowVector} />
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styles.containerInfo}
                onPress={() => navigation.navigate('FavoriteScreen')}>
                <Text style={styles.txtInfo}>Mis Favoritos</Text>
                <SvgXml xml={profileArrowVector} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.containerInfo}
                onPress={() => navigation.navigate('ReservedScreen')}>
                <Text style={styles.txtInfo}>Mis Reservas</Text>
                <SvgXml xml={profileArrowVector} />
              </TouchableOpacity>
              {/* {userExists && (
    <TouchableOpacity style={styles.containerInfo} onPress={deleteExpiredDocuments}>
    <Text style={styles.txtInfo1}>Borrar paquetes caducados</Text>
      <SvgXml xml={profileArrowVector} />
    </TouchableOpacity>
  )} */}
              {/* {userExists && (
                <TouchableOpacity style={styles.containerInfo} onPress={() => { navigation.navigate('BusinessProfileScreen'); }}>
                  <Text style={styles.txtInfo1}>Perfil empresarial</Text>
                  <SvgXml xml={profileArrowVector} />
                </TouchableOpacity>
              )} */}

              {userExists && (
                <TouchableOpacity
                  style={styles.containerInfo}
                  onPress={() => {
                    navigation.navigate('BusinessReservedScreen');
                  }}>
                  <Text style={styles.txtInfo}>
                    Gestión de Pagos de Paquetes
                  </Text>
                  <SvgXml xml={profileArrowVector} />
                </TouchableOpacity>
              )}

              {/*userExists && (
                <TouchableOpacity style={styles.containerInfo} onPress={() => { navigation.navigate('PayPremiumScreen'); }}>
                  <Text style={styles.txtInfo1}>Pasar a AventuraT Nitro</Text>
                  <SvgXml xml={profileArrowVector} />
                </TouchableOpacity>
              )*/}
              {user && (
                <TouchableOpacity
                  style={styles.containerInfo}
                  onPress={() => {
                    logout();
                    navigation.navigate('HomeScreen');
                  }}>
                  <Text style={styles.txtInfo1}>Cerrar sesión</Text>
                  <SvgXml xml={profileArrowVector} />
                </TouchableOpacity>
              )}
            </View>
          </View>

        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1DB5BE',
  },
  info: {
    flex: 1,
    display: 'flex',
    position: 'absolute'
  },
  topInfo: {
    flex: 3.6,
    alignItems: 'center',
    marginTop: 20,
  },
  info2: {
    flex: 5,
    marginTop: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 15,
    padding: 30,
  },

  photoBox: {
    flex: 2,
    marginTop: 80,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  detailsUserBox: {
    flex: 0.5,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  editProfileButtonBox: {
    flex: 0.5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 20,
    marginTop: 10,
  },
  containerButton: {
    display: 'flex',
    alignItems: 'center',
    height: 40,
    width: 145,
    borderRadius: 50,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#1881B1',
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
  backGround: {
    // position: 'relative',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    display: 'flex',
    // height: '100%',
    // width: '100%',
  },
  txt: {
    color: 'black',
    fontSize: 18,
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
  txtButton: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
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
