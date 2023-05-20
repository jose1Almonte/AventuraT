import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import vectorPerfil from '../../vectores/vectorPerfil';
import PhotoProfile from '../../Components/Profiles/photoProfile';
import EditProfileButton from '../../Components/Profiles/editProfileButton';
import VectorPerfilFlecha from '../../vectores/vectorPerfilFlecha';
import auth from '@react-native-firebase/auth';
import { NavigationProp } from '@react-navigation/native';
// import currentLog from '../../firebase/UserData';
import { useUser } from '../../Context/UserContext';


interface UserProfileScreenProps{
  navigation: NavigationProp<Record<string, object | undefined>>,
  // destinationNavigationComponentName: string,
  // goToLoginScreen: boolean,
  // styles: any,
}



export const UserProfileScreen = ({
  navigation,
}:UserProfileScreenProps) => {

    const {  setUser, setLogged } = useUser();
    const logout = async (): Promise<void> => {
        await auth().signOut();
        setUser(null);
        setLogged(false);
    };


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
            <TouchableOpacity style={styles.contenedorInfo}  onPress={() => {logout(); navigation.navigate('HomeScreen');}}>
            <Text style={styles.txtInfo1}>Cerrar sesión</Text>
            <SvgXml xml={VectorPerfilFlecha} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
    marginBottom: 650,
  },
  topInfo: {
    alignItems: 'center',
    gap: 15,
  },
  info2: {
    marginTop: 30,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 15,
    padding: 30,
  },
  contenedorInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 344,
    borderBottomWidth: 1,
    borderBottomColor: '#CFD8E2',
    padding: 2,
  },
  fondo: {
    flex: 1,
    display: 'flex',
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
});
