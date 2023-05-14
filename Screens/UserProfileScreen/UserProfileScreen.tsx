import {Text, View, StyleSheet} from 'react-native';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import vectorPerfil from '../../images/vectorPerfil';
import PhotoProfile from '../../Components/photoProfile';
import EditProfileButton from '../../Components/editProfileButton';
import VectorPerfilFlecha from '../../images/vectorPerfilFlecha';

const UserProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.fondo}>
        <SvgXml xml={vectorPerfil} />
      </View>
      <View style={styles.info}>
        <View style={styles.topInfo}>
          <PhotoProfile />
          <Text style={styles.txt}>correo electrónico</Text>
          <EditProfileButton />
        </View>
        <View style={styles.info2}>
          <Text style={styles.title}>Configuración</Text>
          <View style={styles.contenedorInfo}>
            <Text style={styles.txtInfo}>Información personal</Text>
            <SvgXml xml={VectorPerfilFlecha} />
          </View>
          <View style={styles.contenedorInfo}>
            <Text style={styles.txtInfo}>Opciones de pago</Text>
            <SvgXml xml={VectorPerfilFlecha} />
          </View>
          <View style={styles.contenedorInfo}>
            <Text style={styles.txtInfo1}>Cerrar sesión</Text>
            <SvgXml xml={VectorPerfilFlecha} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1DB5BE',
  },
  info: {
    flex: 1,
    display: 'flex',
    marginBottom: 650,
  },
  topInfo: {
    alignItems: 'center',
    gap: 15,
  },
  info2: {
    marginTop: 40,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 15,
    padding: 20,
  },
  contenedorInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 344,
    borderBottomWidth: 1,
    borderBottomColor: "#CFD8E2",
  },
  fondo: {
    flex: 1,
    display: 'flex',
  },
  txt: {
    color: 'black',
    fontSize: 20,
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
});
