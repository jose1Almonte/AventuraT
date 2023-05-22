import { Text, View, StyleSheet } from 'react-native';
import React from 'react';
import { SvgXml } from 'react-native-svg';
import PhotoProfile from '../../Components/Profiles/photoProfile';
import { Svg } from 'react-native-svg';
import home from '../../vectores/home';
import favorites from '../../vectores/favorites';
import profile from '../../vectores/profile';
import historial from '../../vectores/historial';
import helpdesk from '../../vectores/helpdesk';
import business from '../../vectores/business';
import { NavigationProp } from '@react-navigation/native';

interface navigationProps {
  navigation: NavigationProp<Record<string, object | undefined>>;
}

const NavbarScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.fondo}>
        <View style={styles.info}>
          <View style={styles.topInfo}>
            <PhotoProfile size={90}
              imageSource={{
                uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg',
              }} />
            <Text style={styles.txt}>nombre usuario</Text>
          </View>
          <View style={styles.bottomInfo}>
            <View style={styles.linksInfo}>
              <View style={styles.contenedorLinks}>
                <SvgXml xml={home} />
                <Text style={styles.txtInfo}>Inicio</Text>
              </View>
              <View style={styles.contenedorLinks}>
                <SvgXml xml={favorites} />
                <Text style={styles.txtInfo}>Mis favoritos</Text>
              </View>
              <View style={styles.contenedorLinks}>
                <SvgXml xml={profile} />
                <Text style={styles.txtInfo}>Mi perfil</Text>
              </View>
              <View style={styles.contenedorLinks}>
                <SvgXml xml={historial} />
                <Text style={styles.txtInfo}>Mi historial</Text>
              </View>
              <View style={styles.contenedorLinks}>
                <SvgXml xml={helpdesk} />
                <Text style={styles.txtInfo}>Atención al cliente</Text>
              </View>
              <View style={styles.contenedorLinks}>
                <SvgXml xml={business} />
                <Text style={styles.txtInfo}>Registrar empresa</Text>
              </View>
            </View>
          </View>
          <View style={styles.logout}>
            <Text style={styles.title}>Cerrar sesión</Text>
          </View>
        </View>
      </View>
    </View>
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
    gap: 20,
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
    fontFamily: 'Poppins-Regular',
  },
  txtInfo: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  logout: {
    marginBottom: 25,
  },
  title: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
});
