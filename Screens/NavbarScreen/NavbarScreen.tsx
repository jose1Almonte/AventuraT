import { Text, View, StyleSheet, Pressable, TouchableOpacity, Alert, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SvgXml } from 'react-native-svg';
import { Svg } from 'react-native-svg';
import home from '../../vectores/home';
import favorites from '../../vectores/favorites';
import profile from '../../vectores/profile';
import historial from '../../vectores/historial';
import helpdesk from '../../vectores/helpdesk';
import business from '../../vectores/business';
import { NavigationProp } from '@react-navigation/native';
import { useUser } from '../../Context/UserContext';
import auth from '@react-native-firebase/auth';
import { PerfilPictureNav } from '../../firebase/PerfilPictureNav';
import UserData from '../../firebase/UserData';
import currentLog from '../../firebase/UserData';
import { LoadingScreenTransparentBackground, checkResponsibleNameExists } from '../../firebase/Firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import ScrollViewIndicator from 'react-native-scroll-indicator';

interface navigationProps {
  navigation: NavigationProp<Record<string, object | undefined>>;
  route: any;
}


const NavbarScreen = ({ navigation,route}:navigationProps) => {
  const {actualizaPerfil, setActualizaPerfil} = route.params;
  const { setUser, setLogged } = useUser();
  const [loadingSomeThing, setLoadingSomething] = useState(false);
  const logout = async (): Promise<void> => {
    setLoadingSomething(true);
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    }
    catch {

    }
    await auth().signOut();
    setUser(null);
    setLogged(false);
    setLoadingSomething(false);
  };

  let { isLogged } = useUser();

  const user = currentLog();
  const [userExists, setUserExists] = useState(false);



  useEffect(() => {
    const checkUserExists = async () => {
      setLoadingSomething(true);
      try {
        const userEmail = user?.email;
        const exists = await checkResponsibleNameExists(userEmail);
        setUserExists(exists);
      } catch (error) {
      }
      setLoadingSomething(false);
    };
    checkUserExists();
  }, [user?.email]);


  return (
    <>
    {LoadingScreenTransparentBackground ? (

    <View style={styles.container} >
       {loadingSomeThing && (
      <LoadingScreenTransparentBackground />
      )}
      <View style={styles.fondo}>
        <View style={styles.info}>
          <TouchableOpacity style={styles.topInfo} onPress={() => { navigation.navigate('UserProfileScreen',{actualizaPerfil: actualizaPerfil, setActualizaPerfil: setActualizaPerfil});}}>
            <PerfilPictureNav
              navigation={navigation}
              styles={styles}
              destinationNavigationComponentName="LoginScreen"
            />
            <Text style={styles.txt}>{user?.displayName}</Text>
          </TouchableOpacity>
          <View style={styles.bottomInfo}>
            <ScrollViewIndicator
    shouldIndicatorHide={false}
    flexibleIndicator={false}
    scrollIndicatorStyle={{ backgroundColor: '#1881B1' }}
    scrollIndicatorContainerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
              <View>
                <TouchableOpacity style={styles.contenedorLinks} onPress={() => { navigation.navigate('HomeScreen'); }}>
                  <SvgXml xml={home} />
                  <Text style={styles.txtInfo}>Inicio</Text>
                </TouchableOpacity>
              </View>
              {userExists && (
                <View>
                <TouchableOpacity style={styles.contenedorLinks} onPress={() => { navigation.navigate('BusinessProfileScreen'); }}>
                  <SvgXml xml={business} />
                  <Text style={styles.txtInfo2}>Perfil empresarial</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.contenedorLinks} onPress={() => {
                  navigation.navigate("PayPremiumScreen");
              }}>
                <SvgXml xml={business} />
                <Text style={styles.txtInfo2}>Pagar Nitro</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.contenedorLinks} onPress={() => { navigation.navigate('BusinessReservedScreen'); }}>
                  <SvgXml xml={business} />
                  <Text style={styles.txtInfo2}>Gestión de Pagos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.contenedorLinks} onPress={() => {navigation.navigate('AdministratePackagesScreen');}}>
                  <SvgXml xml={business} />
                  <Text style={styles.txtInfo2}>Mis paquetes</Text>
                </TouchableOpacity>
                </View>
              )}
              <View>
                <TouchableOpacity style={styles.contenedorLinks} onPress={() => {
                  if (isLogged) {
                    navigation.navigate('FavoriteScreen')
                  } else {
                    navigation.navigate('LoginScreen');
                  }
                }}>
                  <SvgXml xml={favorites} />
                  <Text style={styles.txtInfo}>Mis favoritos</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity style={styles.contenedorLinks} onPress={() => {
                  if (isLogged) {
                    navigation.navigate('UserProfileScreen',{actualizaPerfil: actualizaPerfil, setActualizaPerfil: setActualizaPerfil});
                  } else {
                    navigation.navigate('LoginScreen');
                  }

                }}>
                  <SvgXml xml={profile} />
                  <Text style={styles.txtInfo}>Mi perfil</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.contenedorLinks} onPress={() => navigation.navigate('ReservedScreen')}>
                  <SvgXml xml={business} />
                  <Text style={styles.txtInfo}>Mis Reservas</Text>
                </TouchableOpacity>
              </View>
              {/*<View style={styles.contenedorLinks}>
                <SvgXml xml={historial} />
                <Pressable onPress={() => { navigation.navigate('HomeScreen') }}>
                  <Text style={styles.txtInfo}>Mi historial</Text>
                </Pressable>
              </View>*/}
              <View>
                <TouchableOpacity style={styles.contenedorLinks} onPress={() => { navigation.navigate('HelpdeskScreen') }}>
                  <SvgXml xml={helpdesk} />
                  <Text style={styles.txtInfo}>Atención al cliente</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity style={styles.contenedorLinks} onPress={() => { navigation.navigate('EnterpriseFormScreen') }}>
                  <SvgXml xml={business} />
                  <Text style={styles.txtInfo}>Registrar empresa</Text>
                </TouchableOpacity>
              </View>
            </ScrollViewIndicator>
          </View>
          <View style={styles.logout}>
              {userExists && (
                <View>
              <Text style={styles.txtInfo3}>◉ Opciones de empresa</Text>
              <Text style={styles.txtInfo4}>◉ Opciones de usuario</Text>
              </View>)}
          </View>
         { user ?(
          <View style={styles.logout}>
            <TouchableOpacity onPress={() => { logout(); navigation.navigate('HomeScreen'); }}>
              <Text style={styles.title}>Cerrar sesión</Text>
            </TouchableOpacity>
          </View>
          ) : (
          <View style={styles.logout}>
            <TouchableOpacity onPress={() => { navigation.navigate('LoginScreen'); }}>
              <Text style={styles.title}>Iniciar sesión/Registrarse</Text>
            </TouchableOpacity>
          </View>

          )}
        </View>
      </View>
    </View >
    ):(
      <>
       <View style={styles.container} >
      <View style={styles.fondo}>
        <View style={styles.info}>
          <View style={styles.topInfo}>
            <PerfilPictureNav
              navigation={navigation}
              styles={styles}
              destinationNavigationComponentName="LoginScreen"
            />
            <Text style={styles.txt}>¡Bienvenido!</Text>
          </View>
          <View style={styles.bottomInfo}>
            <ScrollView style={styles.linksInfo}>
              <View>
                <TouchableOpacity style={styles.contenedorLinks} onPress={() => { navigation.navigate('HomeScreen') }}>
                  <SvgXml xml={home} />
                  <Text style={styles.txtInfo}>Inicio</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity style={styles.contenedorLinks} onPress={() => { navigation.navigate('HelpdeskScreen') }}>
                  <SvgXml xml={helpdesk} />
                  <Text style={styles.txtInfo}>Atención al cliente</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.contenedorLinks}>
              {user && (
                <TouchableOpacity style={styles.contenedorLinks} onPress={() => { navigation.navigate('EnterpriseFormScreen') }}>
                <SvgXml xml={business} />
                  <Text style={styles.txtInfo}>Registrar empresa</Text>
                </TouchableOpacity>)}
              </View>
            </ScrollView>
          </View>
          <View style={styles.logout}>
            <TouchableOpacity onPress={() => { navigation.navigate('LoginScreen'); }}>
              <Text style={styles.title}>Iniciar sesión/Registrarse</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View >
      </>
    )}
    </>
  );
};

export default NavbarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1DB5BE',
  },
  fondo: {
    width: 280,
    flex: 1,
    display: 'flex',
    backgroundColor: 'white',
  },
  info: {
    flex: 1,
    display: 'flex',
    margin: 20,
  },
  topInfo: {
    display: 'flex',
    marginTop: 20,
    flexDirection: 'column',
    gap: 90,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomInfo: {
    width:'107%',
    height:'40%',
    marginTop: '20%',
    marginBottom:'20%',
    maxHeight:'35%',
  },
  contenedorLinks: {
    marginBottom:'10%',
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    gap: 20,
  },
  linksInfo: {
    marginBottom:'10%',
    gap: 20,
  },
  txt: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center'
  },
  txtInfo: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  txtInfo2: {
    color: '#1881B1',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  txtInfo3: {
    color: '#1881B1',
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
  },
  txtInfo4: {
    color: 'black',
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
  },
  logout: {
    marginBottom: 35,
  },
  title: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    marginBottom:'10%',
  },
  scrollViewContent: {
    backgroundColor:'#7affe4',
    paddingBottom: 20,
  },
});
