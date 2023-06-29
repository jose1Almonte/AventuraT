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
import { actualizarAvailabilityMinus, addPaidPackage } from '../../firebase/Firestore';
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

const MobilePaymentScreen = ({ navigation, route, data }: PackaI) => {
  const { user, isLogged } = useUser();
  let packageIn: PackageI = route.params.data;
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
          'Blank Space Not Allowed',
          'You have to write your reference code',
        );
      } else {
        Alert.alert(
          'Your Reference Code Was Sent',
          mobilePayment.mobilePaymentRef,
        );

        if (packageIn) {
          await addPaidPackage(
            user.email,
            user.photoURL,
            packageIn.id,
            packageIn.name,
            packageIn.availability,
            packageIn.price,
            packageIn.description,
            packageIn.mainImageUrl,
            packageIn.location,
            packageIn.endDate,
            packageIn.startDate,
            packageIn.emailEnterprise,
            packageIn.rating,
            packageIn.expireDate,
            mobilePayment,
            nameEnterprise,
            photoURL,
            'E'
          );
          actualizarAvailabilityMinus(packageIn.id?.toString());
          Alert.alert('¡Pago enviado! Puede ver su status en Mis Reservas');
          navigation.navigate('HomeScreen');
        } else {
          console.log(packageIn);
          Alert.alert('Package data not available');
        }
      }
    } else {
      Alert.alert('You have to Sign in to continue', 'Please, Login');
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
          <Text style={styles.title}>Método de Pago</Text>
        </View>
        <Image
          style={styles.imageUsed}
          source={require('../../images/online-payment.png')}
        />
        {/* <Text style={styles.textTotal}>Total a pagar</Text><Text style={styles.textTotal}>Total a pagar</Text> */}
      </View>

      <View style={styles.containerPrice}>
        <Text style={styles.textTotal}>Total a pagar</Text>
        <Text style={styles.textPrice}>$ {packageIn.price}</Text>
      </View>

      <View style={styles.thirdBigBox}>
        <View style={styles.textBox}>
          <Text style={styles.paragraph}>
            Realiza el pago tomando en cuenta los siguientes datos:
          </Text>
          <Text style={styles.bulletText}>
            • Nro. de teléfono: 0424-1166-178
          </Text>
          <Text style={styles.bulletText}>
            • Banco: Banco Venezolano de Crédito
          </Text>
          <Text style={styles.bulletText}>• Cédula: V- 27.624.189</Text>
        </View>
      </View>

      <View style={styles.fourthBigBox}>
        <TextInput
          style={styles.inputReferenceNumber}
          placeholder="Ingrese nro. de referencia"
          placeholderTextColor="grey"
          keyboardType="numeric"
          onChangeText={(text) =>
            setMobilePayment({ ...mobilePayment, mobilePaymentRef: text })
          }
        />
      </View>

      <View style={styles.fifthBigBox}>
        <TouchableOpacity style={styles.buttonIPaid} onPress={upToFirebase}>
          <Text style={styles.textIPaid}>Ya pagué</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default MobilePaymentScreen;

const styles = StyleSheet.create({
  giantBox: {
    flex: 1,
    backgroundColor: '#ffffff',
    marginTop:'-10%',
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
    color:'black',
    borderBottomColor: '#1881B1',
    borderBottomWidth: 1,
    width: 260,
    fontSize: 12,
    textAlign: 'center',
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
