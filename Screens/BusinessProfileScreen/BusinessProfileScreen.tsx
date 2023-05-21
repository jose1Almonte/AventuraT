import {Text, View, StyleSheet} from 'react-native';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import vectorPerfil from '../../vectores/vectorPerfil';
import PhotoProfile from '../../Components/Profiles/photoProfile';
import EditProfileButton from '../../Components/Profiles/editProfileButton';
import vectorLocation from '../../vectores/vectorLocation';
import EditPackageButton from '../../Components/Profiles/editPackagesButton';
import PublishedPackages from '../../Components/Profiles/publishedPackages';
import separator from '../../vectores/separator';
import star from '../../vectores/star';

const UserProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.fondo}>
        <SvgXml xml={vectorPerfil} />
      </View>
      <View style={styles.info}>
        <View style={styles.topInfo}>
          <View style={styles.top}>
            <PhotoProfile size={90}
            imageSource={{
              uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg',
            }}/>
            <SvgXml xml={separator} />
            <View style={styles.contenedorPuntaje}>
              <View style={styles.contenedorEstrella}>
                <Text style={styles.point}>4,5</Text>
                <SvgXml xml={star} />
              </View>

              <Text style={styles.description}>Calificación</Text>
            </View>
          </View>
          <Text style={styles.txt}>nombre usuario</Text>
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
            ducimus consectetur, optio magnam ad quasi eligendi distinctio vel
            dicta est. Ad a totam ipsum. Animi, ut cupiditate. Quia, ducimus
            dolore!
          </Text>
          <View style={styles.location}>
            <SvgXml xml={vectorLocation} />
            <Text style={styles.nameLocation}>Ubicación</Text>
          </View>
          <View style={styles.buttons}>
            <EditProfileButton />
            <EditPackageButton />
          </View>
          <View style={styles.bottomInfo}>
            <Text style={styles.titlePack}>Paquetes publicados</Text>
            <View style={styles.containerPack}>
              <PublishedPackages />
              <PublishedPackages />
            </View>
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
  top: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topInfo: {
    top: 30,
    margin: 35,
    alignItems: 'flex-start',
    gap: 15,
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
  },
  containerPack: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
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
