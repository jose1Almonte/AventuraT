import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Alert,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationProp } from '@react-navigation/native';
import { useUser } from '../../Context/UserContext';
import { PackageI } from '../../models/package.interface';
import { updatePaidPackage } from '../../firebase/Firestore';
import firestore from '@react-native-firebase/firestore';
import { SvgXml } from 'react-native-svg';
import vectorHelpdeskScreen from '../../vectores/vectorHelpdeskScreen';

interface MobilePayment {
  mobilePaymentRef: string;
}

interface PackaI {
  navigation: NavigationProp<Record<string, object | undefined>>;
  route?: any;
  data?: PackageI;
}

const MobilePaymentConfirmScreen = ({ navigation, route }: PackaI) => {
  const { user, isLogged } = useUser();
  let packageIn: PackageI = route.params.data;
  let idPkg: any = route.params.id;
  const [nameEnterprise, setNameEnterprise] = useState('');
  const [photoURL, setPhotoUrl] = useState('');
  const [mobilePayment, setMobilePayment] = useState<MobilePayment>({
    mobilePaymentRef: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      if (packageIn && packageIn.emailEnterprise) {
        const querySnapshot = await firestore()
          .collection('users')
          .where('email', '==', packageIn.emailEnterprise)
          .get();

        querySnapshot.forEach((doc) => {
          setNameEnterprise(doc.data().displayName);
          setPhotoUrl(doc.data().photoURL);
        });
      }
    };
    fetchData();
  }, [packageIn]);

  async function upToFirebase() {
    if (isLogged) {
      if (mobilePayment.mobilePaymentRef === '') {
        Alert.alert(
          'Campo Vacío',
          'Ingresa el código de referencia',
        );
      } else {
        Alert.alert(
          'Tu código de referencia ha sido enviado',
          mobilePayment.mobilePaymentRef,
        );

        if (packageIn) {
          // @ts-ignore
          await updatePaidPackage(idPkg, 'E', mobilePayment);
          navigation.navigate('HomeScreen');
        } else {
          Alert.alert('Información no disponible');
        }
      }
    } else {
      Alert.alert('Inicie sesión', 'Debe iniciar sesión para continuar');
      navigation.navigate('LoginScreen');
    }
  }

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  return (
    <ScrollView style={styles.giantBox}>
      <SvgXml
        xml={vectorHelpdeskScreen}
        width={`${screenWidth * 1}`}
        height={`${screenHeight * 0.511}`}
      />

      <View style={styles.secondBigBox}>
        <View style={styles.firstBigBox}>
          <Text style={styles.title}>Confirma tu pago</Text>
        </View>
        <Image
          style={styles.imageUsed}
          source={require('../../images/online-payment.png')}
        />
        {/* <Text style={styles.textTotal}>Total a pagar</Text><Text style={styles.textTotal}>Total a pagar</Text> */}
      </View>

      <View style={styles.thirdBigBox}>
        <View style={styles.textBox}>
          <Text style={styles.paragraph}>
            La empresa no pudo verificar la información que ingresaste anteriormente. Es posible que se deba a un error. Por favor, reingresa la información para revalidar.
          </Text>
        </View>
      </View>

      <View style={styles.containerPrice}>
        <Text style={styles.textTotal}>Total pagado</Text>
        <Text style={styles.textPrice}>$ {packageIn.price}</Text>
      </View>


      <View style={styles.fourthBigBox}>
        <TextInput
          style={styles.inputReferenceNumber}
          placeholder="Ingrese nro. de referencia"
          onChangeText={(text) =>
            setMobilePayment({ ...mobilePayment, mobilePaymentRef: text })
          }
        />
      </View>

      <View style={styles.fifthBigBox}>
        <TouchableOpacity style={styles.buttonIPaid} onPress={upToFirebase}>
          <Text style={styles.textIPaid}>Listo</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default MobilePaymentConfirmScreen;

const styles = StyleSheet.create({
  giantBox: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  firstBigBox: {
    marginTop: 10,
    justifyContent: 'center',
  },
  secondBigBox: {
    flex: 20.375,
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
  },
  containerPrice: {
    // flex: 18,
    width: '100%',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: '4%',
  },

  thirdBigBox: {
    flex: 29.375,
    alignItems: 'center',
  },
  fourthBigBox: {
    flex: 21.25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '3%',
    color: '#000'
  },
  fifthBigBox: {
    flex: 11.25,
    alignItems: 'center',
    marginTop: '3%',
  },
  textTotal: {
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
    lineHeight: 36,
    textAlign: 'center',
    color: '#1881B1',
  },
  textPrice: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 30,
    lineHeight: 36,
    textAlign: 'center',
    color: '#1881B1',
    borderBottomColor: '#1881B1',
    borderBottomWidth: 1,
    width: 220,
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 28,
    lineHeight: 36,
    marginTop: 60,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  imageUsed: {
    height: 220,
    width: 220,
    marginTop: 50,
  },
  textBox: {
    marginTop: '3.5%',
    width: '80.61%',
  },
  paragraph: {
    paddingBottom: '3%',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'justify',
    color: '#000000',
  },
  bulletText: {
    fontWeight: '500',
    fontSize: 14,
    textAlign: 'justify',
    color: '#000000',
    marginLeft: 15,
    marginBottom: 8,
  },
  inputReferenceNumber: {
    color: '#000',
    borderBottomColor: '#1881B1',
    borderBottomWidth: 1,
    width: 260,
    fontSize: 18,
    textAlign: 'center'
  },
  buttonIPaid: {
    backgroundColor: '#1881B1',
    borderRadius: 8,
    width: 264,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textIPaid: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    lineHeight: 19,
  },
});
