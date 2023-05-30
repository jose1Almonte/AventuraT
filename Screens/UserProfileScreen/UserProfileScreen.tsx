import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { SvgXml } from 'react-native-svg';
import profileVector from '../../vectores/vectorPerfil';
import PhotoProfile from '../../Components/Profiles/photoProfile';
import EditProfileButton from '../../Components/Profiles/editProfileButton';
import profileArrowVector from '../../vectores/vectorPerfilFlecha';
import auth from '@react-native-firebase/auth';
import { NavigationProp } from '@react-navigation/native';
import { useUser } from '../../Context/UserContext';
import currentLog from '../../firebase/UserData';
import { deleteExpiredDocuments } from '../../firebase/DeletePackage';


interface UserProfileScreenProps {
  navigation: NavigationProp<Record<string, object | undefined>>,
}



export const UserProfileScreen = ({
  navigation,
}: UserProfileScreenProps) => {

  const { setUser, setLogged } = useUser();
  const logout = async (): Promise<void> => {
    await auth().signOut();
    setUser(null);
    setLogged(false);
  };

  const user = currentLog();


  return (
    <View style={styles.container}>
      <View style={styles.backGround}>
        <SvgXml xml={profileVector} />
      </View>
      <View style={styles.info}>
        <View style={styles.topInfo}>
          <PhotoProfile size={90}
            imageSource = {user?.photoURL} />
          <Text style={styles.txt}>{user?.displayName}</Text>
          <Text style={styles.txt}>{user?.email}</Text>
          <EditProfileButton />
        </View>
        <View style={styles.info2}>
          <Text style={styles.title}>Configuración</Text>
          <View style={styles.containerInfo}>
            <Text style={styles.txtInfo}>Información personal</Text>
            <SvgXml xml={profileArrowVector} />
          </View>
          <TouchableOpacity style={styles.containerInfo} onPress={() => navigation.navigate('FavoriteScreen')}>
            <Text style={styles.txtInfo}>Favoritos</Text>
            <SvgXml xml={profileArrowVector} />
          </TouchableOpacity>

          <View style={styles.containerInfo}>
            <Text style={styles.txtInfo}>Opciones de pago</Text>
            <SvgXml xml={profileArrowVector} />
          </View>
          <TouchableOpacity style={styles.containerInfo} onPress={deleteExpiredDocuments}>
            <Text style={styles.txtInfo1}>Borrar paquetes caducados</Text>
            <SvgXml xml={profileArrowVector} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.containerInfo} onPress={() => { logout(); navigation.navigate('HomeScreen'); }}>
            <Text style={styles.txtInfo1}>Cerrar sesión</Text>
            <SvgXml xml={profileArrowVector} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.containerInfo} onPress={() => { navigation.navigate('CreatePackageFormScreen');}}>
            <Text style={styles.txtInfo1}>Abrir formulario</Text>
            <SvgXml xml={profileArrowVector} />
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
