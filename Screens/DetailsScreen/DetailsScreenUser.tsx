import React, { useEffect, useState } from 'react';
import { ScrollView, Text, StyleSheet, View, Image, BackHandler, Pressable, Alert } from 'react-native';
import { SvgXml } from 'react-native-svg';
import star from '../../vectores/star';
import PhotoProfile from '../../Components/Profiles/photoProfile';
import vectorSalida from '../../vectores/vectorSalida';
import vectorRetorno from '../../vectores/vectorRetorno';
import vectorPrecio from '../../vectores/vectorPrecio';
import { ButtonLikes } from '../../Components/ButtonLikes';
import { PackageI } from '../../models/package.interface';
import { NavigationProp } from '@react-navigation/native';
import { useUser } from '../../Context/UserContext';

interface detailProps {
  navigation: NavigationProp<Record<string, object | undefined>>;
  route?: any;
  data?: PackageI;
}



const DetailsScreenUser = ({ navigation, data, route }: detailProps) => {
  let { isLogged } = useUser();
  let packageIn: PackageI = route.params.data;
  return (
    <ScrollView style={styles.background}>
      <View style={styles.container}>
        <View style={styles.containerPack}>
          <View style={styles.containerText}>
            <Text style={styles.textPack}>{packageIn.name}</Text>
            <View style={styles.containerCalification}>
              <Text style={styles.ratingText}>{packageIn.raiting}</Text>
              <SvgXml xml={star} width={22} height={22} />
            </View>
          </View>
          <Image
            style={styles.containerPhotoPack}
            source={{
              uri: packageIn.mainImageUrl //'https://media.meer.com/attachments/71d38e2818914225a1196a8f1d3ae4961c2d75c9/store/fill/1090/613/1e8eb3a92a4ebbf7b825e3a2b30dce85c5c9fdee0eaee9fe889aed2f7299/Parque-Nacional-Morrocoy-Venezuela.jpg',
            }}
          />
        </View>
      </View>

      <View style={styles.containerInfoBusiness}>
        <View style={styles.info}>
          <PhotoProfile
            size={40}
            imageSource={'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg'}
          />
          <Pressable onPress={() => { navigation.navigate('BusinessProfileScreen') }}>
            <Text style={styles.text}>{packageIn.nameEnterprice}</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.contenedorInfo}>
        <View style={styles.contenedorInformacion}>
          <SvgXml xml={vectorSalida} />
          <Text style={styles.titulo}>Salida</Text>
          <Text style={styles.subtitulo}>{packageIn.start}</Text>
        </View>
        <View style={styles.contenedorInformacion}>
          <SvgXml xml={vectorRetorno} />
          <Text style={styles.titulo}>Retorno</Text>
          <Text style={styles.subtitulo}>{packageIn.end}</Text>
        </View>
        <View style={styles.contenedorInformacion}>
          <SvgXml xml={vectorPrecio} />
          <Text style={styles.titulo}>Precio</Text>
          <Text style={styles.subtitulo}>${packageIn.price}</Text>
        </View>
      </View>

      <View style={styles.infoServicios}>
        <Text style={styles.titulo}>Incluye</Text>
        <Text style={styles.subtitulo}>Transporte privado</Text>
        <Text style={styles.subtitulo}>Guía Turístico</Text>
        <Text style={styles.subtitulo}>Desayuno</Text>
        <Text style={styles.subtitulo}>Atención personalizada</Text>
      </View>

      <View style={styles.reserva}>
        <View style={styles.contenedorLikes}>
          <ButtonLikes packageDetails={packageIn} />
        </View>
        <Pressable onPress={() => {
          if (isLogged) {
            navigation.navigate('MobilePaymentScreen');
          } else {
            Alert.alert('Inicie sesión', 'Para reservar debe iniciar sesión');
            navigation.navigate('LoginScreen');
          }
        }}>
          <View style={styles.buttonReserva}>
            <Text style={styles.titulo}>Reservar</Text>
          </View>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default DetailsScreenUser;

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#1DB5BE',
  },
  container: {
    flex: 1,
    width: '100%',
    height: 360,
  },
  containerPhotoPack: {
    width: '100%',
    height: 350,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: 'absolute',
  },
  containerText: {
    backgroundColor: '#29787e76',
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 30,
    width: '100%',
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 1,
  },
  textPack: {
    marginLeft: 20,
    padding: 5,
    color: 'white',
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    width: 290,
  },
  containerCalification: {
    width: 70,
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 8,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 10,
    marginRight: 20,
  },
  ratingText: {
    marginLeft: 5,
    padding: 3,
    color: 'white',
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
  },
  containerPack: {
    height: 350,
    width: '100%',
    borderRadius: 30,
    justifyContent: 'flex-end',
    alignItems: 'center',
    display: 'flex',
  },
  containerInfoBusiness: {
    height: 60,
    margin: 20,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginTop: 5,
    marginLeft: 20,
  },
  text: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  contenedorInfo: {
    width: '90%',
    height: 100,
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 50,
    marginRight: 20,
    marginLeft: 20,
  },
  contenedorInformacion: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  titulo: {
    marginTop: 4,
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  subtitulo: {
    color: 'black',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  infoServicios: {
    width: '80%',
    gap: 5,
    marginTop: 30,
    marginLeft: 40,
    borderTopColor: "white",
    borderTopWidth: 1,
  },
  contenedorLikes: {
    width: 43,
    height: 43,
    backgroundColor: '#1881B1',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reserva: {
    marginTop: 20,
    marginLeft: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  buttonReserva: {
    width: 250,
    height: 42,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1881B1',
  },
});
