import React, { useEffect, useState } from 'react';
import { ScrollView, Text, StyleSheet, View, Image, Pressable, Alert, TouchableOpacity } from 'react-native';
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
import firestore from '@react-native-firebase/firestore';
import { listPaidPackage } from '../../firebase/Firestore';

type RootStackParamList = {
  DetailsScreenUser2: { packageIn: PackageI };
};

type DetailsScreenUser2RouteProp = RouteProp<
  RootStackParamList,
  'DetailsScreenUser2'
>;

interface detailProps {
  navigation: NavigationProp<RootStackParamList>;
  route: DetailsScreenUser2RouteProp;
}

const DetailsScreenUser2 = ({ navigation, route }: detailProps) => {
  

  const { packageIn } = route.params;
  const startDate = packageIn.startDate.toDate();
  const startDay = startDate.getDate().toString().padStart(2, '0'); // Obtener el día y rellenar con ceros a la izquierda si es necesario
  const startMonth = (startDate.getMonth() + 1).toString().padStart(2, '0'); // Obtener el mes (se suma 1 porque los meses en JavaScript son indexados desde 0) y rellenar con ceros a la izquierda si es necesario
  const startYear = startDate.getFullYear();

  const endDate = packageIn.endDate.toDate();
  const endDay = endDate.getDate().toString().padStart(2, '0'); // Obtener el día y rellenar con ceros a la izquierda si es necesario
  const endMonth = (endDate.getMonth() + 1).toString().padStart(2, '0'); // Obtener el mes (se suma 1 porque los meses en JavaScript son indexados desde 0) y rellenar con ceros a la izquierda si es necesario
  const endYear = endDate.getFullYear();

  const [nameEnterprise, setNameEnterprise] = useState('');
  const [photoURL, setPhotoUrl] = useState('');

  const [packages, setPackages] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const packageList = await listPaidPackage(packageIn.id);
      setPackages(packageList);
    };

    fetchData();
  }, [packageIn.id]);

  useEffect(() => {
    const fetchData = async () => {
      // console.log('packageIn?.emailEnterprise: ' ,packageIn.emailEnterprise);
      if (packageIn && packageIn.emailEnterprise) {

        const querySnapshot = await firestore().collection('users').where('email', '==', packageIn.emailEnterprise).get();

        querySnapshot.forEach((doc) => {
          // console.log(doc.data().displayName);
          setNameEnterprise(doc.data().displayName);
          setPhotoUrl(doc.data().photoURL);
        });
      }
    };
    fetchData();
  }, [packageIn, packageIn.emailEnterprise]);
  return (
  
    <ScrollView style={styles.background}>
      <View style={styles.container}>
        <View style={styles.containerPack}>
          <View style={styles.containerText}>
            <Text style={styles.textPack}>{packageIn.name}</Text>
            <View style={styles.containerCalification}>
              <Text style={styles.ratingText}>{packageIn.rating}</Text>
              <SvgXml xml={star} width={22} height={22} />
            </View>
          </View>
          <Image
            style={styles.containerPhotoPack}
            source={{
              uri: packageIn.mainImageUrl, //'https://media.meer.com/attachments/71d38e2818914225a1196a8f1d3ae4961c2d75c9/store/fill/1090/613/1e8eb3a92a4ebbf7b825e3a2b30dce85c5c9fdee0eaee9fe889aed2f7299/Parque-Nacional-Morrocoy-Venezuela.jpg',
            }}
          />
        </View>
      </View>

      <View style={styles.containerInfoBusiness}>
        <View style={styles.info}>
          <PhotoProfile
            size={40}
            // imageSource={'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg'}
            imageSource={photoURL ? photoURL : 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9c64cfe3-bb3b-4ae8-b5a6-d2f39d21ff87/d3jme6i-8c702ad4-4b7a-4763-9901-99f8b4f038b0.png/v1/fill/w_600,h_400/fondo_transparente_png_by_imsnowbieber_d3jme6i-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NDAwIiwicGF0aCI6IlwvZlwvOWM2NGNmZTMtYmIzYi00YWU4LWI1YTYtZDJmMzlkMjFmZjg3XC9kM2ptZTZpLThjNzAyYWQ0LTRiN2EtNDc2My05OTAxLTk5ZjhiNGYwMzhiMC5wbmciLCJ3aWR0aCI6Ijw9NjAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.Ymv-MHRcmXXpzmL3f0xZ0mCcyU85lCLnk0jbOnCO8Zg'}
          />
          <TouchableOpacity>
            {/* <Text style={styles.text}>{packageIn.nameEnterprise}</Text> */}
            <Text style={styles.text}>{nameEnterprise}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.contenedorInfo}>
        <View style={styles.contenedorInformacion}>
          <SvgXml xml={vectorSalida} />
          <Text style={styles.titulo}>Salida</Text>
          <Text style={styles.subtitulo}>{startDay}/{startMonth}/{startYear}</Text>
        </View>
        <View style={styles.contenedorInformacion}>
          <SvgXml xml={vectorRetorno} />
          <Text style={styles.titulo}>Retorno</Text>
          <Text style={styles.subtitulo}>{endDay}/{endMonth}/{endYear}</Text>
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

      <ScrollView style={styles.container}>
      {packages[0] !== undefined && (
      <Text style={styles.title}>Paquete Reservado Por:</Text>
      )}
      {packages.map((esteitem, index) => (
        <View  key={`${esteitem.id}-${index}`}>
          {esteitem && (
            <View style={styles.card}>
              <Text style={styles.name}>Comprador: {esteitem?.compradorMail}</Text>
              <Text style={styles.name}>Numero de reserva: {esteitem?.mobilePayment.mobilePaymentRef}</Text>
              {esteitem?.photoCompradorURL &&
                <PhotoProfile size={90} imageSource={esteitem?.photoCompradorURL}/>
              }
            </View>
          )}
        </View>
      ))}
    </ScrollView>

    </ScrollView>
  );
};

export default DetailsScreenUser2;

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#1DB5BE',
    // backgroundColor: 'red',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#FFF',
    textAlign:'center',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  name: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'black',
    fontFamily: 'Poppins-Medium',
  },

  container: {
    flex: 1,
    width: '100%',
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
    borderTopColor: 'white',
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