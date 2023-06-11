import { Text, View, StyleSheet, Pressable, Alert } from 'react-native';
import React from 'react';
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

interface navigationProps {
  navigation: NavigationProp<Record<string, object | undefined>>;
}

const NavbarScreen = ({ navigation }: any) => {

  const { setUser, setLogged } = useUser();
  const logout = async (): Promise<void> => {
    await auth().signOut();
    setUser(null);
    setLogged(false);
  };

  let { isLogged } = useUser();
  const user = currentLog()


  return (
    <>
    {isLogged ? (
    <View style={styles.container} >
      <View style={styles.fondo}>
        <View style={styles.info}>
          <View style={styles.topInfo}>
            <PerfilPictureNav
              navigation={navigation}
              styles={styles}
              destinationNavigationComponentName="LoginScreen"
            />
            <Text style={styles.txt}>{user?.displayName}</Text>
          </View>
          <View style={styles.bottomInfo}>
            <View style={styles.linksInfo}>
              <View style={styles.contenedorLinks}>
                <SvgXml xml={home} />
                <Pressable onPress={() => { navigation.navigate('HomeScreen') }}>
                  <Text style={styles.txtInfo}>Inicio</Text>
                </Pressable>
              </View>
              <View style={styles.contenedorLinks}>
                <SvgXml xml={favorites} />
                <Pressable onPress={() => {
                  if (isLogged) {
                    navigation.navigate('FavoriteScreen')
                  } else {
                    navigation.navigate('LoginScreen');
                  }
                }}>
                  <Text style={styles.txtInfo}>Mis favoritos</Text>
                </Pressable>
              </View>
              <View style={styles.contenedorLinks}>
                <SvgXml xml={profile} />
                <Pressable onPress={() => {
                  if (isLogged) {
                    navigation.navigate('UserProfileScreen')
                  } else {
                    navigation.navigate('LoginScreen');
                  }

                }}>
                  <Text style={styles.txtInfo}>Mi perfil</Text>
                </Pressable>
              </View>
              <View style={styles.contenedorLinks}>
                <SvgXml xml={historial} />
                <Pressable onPress={() => { navigation.navigate('HomeScreen') }}>
                  <Text style={styles.txtInfo}>Mi historial</Text>
                </Pressable>
              </View>
              <View style={styles.contenedorLinks}>
                <SvgXml xml={helpdesk} />
                <Pressable onPress={() => { navigation.navigate('HelpdeskScreen') }}>
                  <Text style={styles.txtInfo}>Atención al cliente</Text>
                </Pressable>
              </View>
              <View style={styles.contenedorLinks}>
                <SvgXml xml={business} />
                <Pressable onPress={() => { navigation.navigate('EnterpriseFormScreen') }}>
                  <Text style={styles.txtInfo}>Registrar empresa</Text>
                </Pressable>
              </View>
            </View>
          </View>
          <View style={styles.logout}>
            <Pressable onPress={() => { logout(); navigation.navigate('HomeScreen'); }}>
              <Text style={styles.title}>Cerrar sesión</Text>
            </Pressable>
          </View>
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
            <View style={styles.linksInfo}>
              <View style={styles.contenedorLinks}>
                <SvgXml xml={home} />
                <Pressable onPress={() => { navigation.navigate('HomeScreen') }}>
                  <Text style={styles.txtInfo}>Inicio</Text>
                </Pressable>
              </View>
              <View style={styles.contenedorLinks}>
                <SvgXml xml={helpdesk} />
                <Pressable onPress={() => { navigation.navigate('HelpdeskScreen') }}>
                  <Text style={styles.txtInfo}>Atención al cliente</Text>
                </Pressable>
              </View>
              <View style={styles.contenedorLinks}>
                <SvgXml xml={business} />
                <Pressable onPress={() => { navigation.navigate('EnterpriseFormScreen') }}>
                  <Text style={styles.txtInfo}>Registrar empresa</Text>
                </Pressable>
              </View>
            </View>
          </View>
          <View style={styles.logout}>
            <Pressable onPress={() => { navigation.navigate('LoginScreen'); }}>
              <Text style={styles.title}>Iniciar sesión/Registrarse</Text>
            </Pressable>
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
    flex: 1,
    marginTop: 50,
    display: 'flex',
    flexDirection: 'column',
  },
  contenedorLinks: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    gap: 20,
  },
  linksInfo: {
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
  logout: {
    marginBottom: 35,
  },
  title: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
});
