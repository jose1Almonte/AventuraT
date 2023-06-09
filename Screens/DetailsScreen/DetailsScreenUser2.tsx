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
  const [resultDef,setResultDef]= useState();
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
        if (packageIn.rating){
          const sum = packageIn.rating.reduce((acc, num) => acc + num, 0);
          const count = packageIn.rating.length;
          const result = ((sum / (count - 1))).toFixed(1);
          if (isNaN(result)){
            setResultDef(0);
          }
          else {
            setResultDef(result);
          }

        }
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
              <Text style={styles.ratingText}>{resultDef}</Text>
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
            <Text style={styles.textooo}>{nameEnterprise}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.contenedorInfo}>
        <View style={styles.contenedorInformacion}>
          <Text style={styles.titulo}>Salida</Text>
          <Text style={styles.subtitulo}>{startDay}/{startMonth}/{startYear}</Text>
        </View>
        <View style={styles.contenedorInformacion}>
          <Text style={styles.titulo}>Retorno</Text>
          <Text style={styles.subtitulo}>{endDay}/{endMonth}/{endYear}</Text>
        </View>
        <View style={styles.contenedorInformacion}>
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

      <View style={styles.container2}>
      {packages[0] !== undefined && (
        <View style={styles.containerFinale}>
      <Text style={styles.title}>Paquete Reservado Por:</Text>
      </View>
      )}
      {packages.map((esteitem, index) => (
        <View  key={`${esteitem.id}-${index}`}>
          {esteitem && (
            <>
            { esteitem?.status === 'C' && (
            <View style={styles.card}>
              <View style={styles.cardPos}>
              {esteitem?.photoCompradorURL &&
                <PhotoProfile size={40} imageSource={esteitem?.photoCompradorURL}/>
              }
              </View>
              <Text style={styles.name}>Comprador: </Text>
              <Text style={styles.name2}>{esteitem?.compradorMail}</Text>
              <Text style={styles.name}>Numero de reserva:</Text>
              <Text style={styles.name2}>{esteitem?.mobilePayment.mobilePaymentRef}</Text>
            </View>
            )}
            { esteitem?.status === 'QC' && (
            <View style={styles.card}>
              <View style={styles.cardPos}>
              {esteitem?.photoCompradorURL &&
                <PhotoProfile size={40} imageSource={esteitem?.photoCompradorURL}/>
              }
              </View>
              <Text style={styles.name}>Comprador: </Text>
              <Text style={styles.name2}>{esteitem?.compradorMail}</Text>
              <Text style={styles.name}>Numero de reserva:</Text>
              <Text style={styles.name2}>{esteitem?.mobilePayment.mobilePaymentRef}</Text>
            </View>
            )}
            </>
          )}
        </View>
      ))}
    </View>

    </ScrollView>
  );
};

export default DetailsScreenUser2;

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#1DB5BE',
    // backgroundColor: 'red',
  },
  container: {
    flex: 1,
    width: '100%',
    height: 360,
  },
  container2: {
    flex: 1,
    alignContent:'center',
    width: '90%',
    height: '100%',
  },
  containerFinale: {
    flex: 1,
    marginBottom:'2%',
    marginTop:'5%',
    marginLeft:'10%',
  },
  tr: {
    marginTop: '3%',
    marginBottom: '3%'
  },
  containerTransparent: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '100%',
    // backgroundColor: 'blackrgba(0, 0, 0, 0.36)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
    backgroundColor: 'rgba(0,0,0,0.5)',
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
    height: 46,
    marginTop: '2%',
    marginRight: '5%',
    marginLeft: '5%',
    backgroundColor: 'rgba(1, 143, 112, 0.5)',
    borderRadius: 8,
  },
  info: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 3,
    marginLeft: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  textooo: {
    color: 'white',
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
  buttonReserva2: {
    marginTop:'10%',
    width: 160,
    height: 42,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1881B1',
  },

  title: {
    fontSize: 20,
    color:'white',
    fontWeight: 'bold',
    marginVertical: 10,
    marginLeft: 10,
  },
  card: {
    backgroundColor: 'rgba(1, 143, 112, 0.5)',
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop:'2%',
    padding: 10,
    marginLeft:'20%',
    marginRight:'5%',
    marginBottom:'10%',
  },
  cardPos:{
    marginTop:'1%',
    marginBottom:'1%',
    alignContent:'center',
    alignItems:'center',
  },
  name: {
    fontSize: 12,
    marginBottom: 5,
    color: 'white',
    fontFamily: 'Poppins-SemiBold'
  },
  name2: {
    fontSize: 11,
    marginBottom: '5%',
    marginLeft:'10%',
    color: 'white',
    fontFamily: 'Poppins-Medium'
  },
});
