import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import currentLog from '../../firebase/UserData';
import {changePremium} from '../../firebase/Firestore';
import {SvgXml} from 'react-native-svg';
import vectorHelpdeskScreen from '../../vectores/vectorHelpdeskScreen';
import { useNavigation } from '@react-navigation/native';

export default function PayPremiumScreen() {
  const navigation = useNavigation();
  const [paymentRef, setPaymentRef] = useState('');
  const user = currentLog();

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const checkPay = async () => {
    if (paymentRef === '') {
      Alert.alert(
        'Error',
        'Por favor ingrese un código de referencia válido, para más información solicite soporte técnico',
      );
    } else {
      changePremium(user?.email);
      Alert.alert('NITROOOOO!!!', 'Usted tiene cinco paquetes disponibles para VIP NITRO');
      navigation.navigate('Tutorial');
    }
  };
  return (
    <>
      <ScrollView style={styles.giantBox}>
        <View style={styles.container}>
          <View style={styles.containerInfo}>
            <View style={styles.containerPopular}>
              <Text style={styles.textCheck}>Más popular</Text>
            </View>
            <View style={styles.info}>
              <View style={styles.datosPrecio}>
                <Text style={styles.textPrice1}>$30</Text>
                <Text style={styles.textCheck}>/mensual</Text>
              </View>

              <Text style={styles.textNitro}>Cuenta Nitro</Text>
              <View style={styles.containerCheck}>
                <View style={styles.palFlex}>
                <Image
                  style={styles.check}
                  source={require('../../images/check.png')}
                />
                <View style={styles.peque}>
                <Text style={styles.textCheck}>
                  Mayor visibilidad en la app
                </Text>
                </View>
                </View>
              </View>

              <View style={styles.containerCheck}>
              <View style={styles.palFlex}>
                <Image
                  style={styles.check}
                  source={require('../../images/check.png')}
                />
                <View style={styles.peque}>
                <Text style={styles.textCheck}>
                  Mostrar hasta 5 paquetes en recomendados de la app
                </Text>
                </View>
                </View>
              </View>

              <View style={styles.containerCheck}>
              <View style={styles.palFlex}>
                <Image
                  style={styles.check}
                  source={require('../../images/check.png')}
                />
                <View style={styles.peque}>
                <Text style={styles.textCheck}>
                  Soporte técnico prioritario
                </Text>
                </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <Text style={styles.title}>Método de Pago</Text>
    
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
            keyboardType="numeric"
            placeholderTextColor="grey"
            onChangeText={text => {
              setPaymentRef(text);
            }}
          />
        </View>

        <View style={styles.fifthBigBox}>
          <TouchableOpacity style={styles.buttonIPaid} onPress={checkPay}>
            <Text style={styles.textIPaid}>Ya pagué</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

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
    width: '100%',
  },
  containerPrice: {
    width: '100%',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: '4%',
  },

  thirdBigBox: {
    flex: 29.375,
    alignItems: 'center',
    marginTop: '3%',
    marginBottom: '4%',
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
  container: {
    backgroundColor: '#1DB5BE',
    borderRadius: 26,
    width: 300,
    height: 355,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    marginTop: '15%',
  },
  containerInfo: {
    margin: 15
  },
  containerPopular: {
    width: '60%',
    backgroundColor: '#1881B1',
    borderRadius: 16,
    alignSelf: 'flex-end',
    alignContent:'center',
    alignItems:'center',
    marginTop: '10%',
  },
  info: {
    gap: 15,
  },
  check: {
    width: 30,
    height: 30,
  },
  containerCheck: {
    flexDirection: 'row',
    gap: 10,
  },
  palFlex:{
    flexDirection:'row',
    alignContent:'center',
    alignItems:'center',
  },
  datosPrecio: {
    flexDirection: 'row',
    gap: 10,
    alignContent: 'center',
    alignItems: 'center',
  },
  textCheck: {
    fontFamily: 'Poppins-Medium',
    fontSize: 10,
    lineHeight: 18,
    textAlign: 'center',
    color: '#ffffff',
  },
  peque:{
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center',
    marginLeft:'5%',
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
  textPrice1: {
    fontFamily: 'Poppins-Medium',
    fontSize: 30,
    lineHeight: 36,
    color: '#ffffff',
  },
  textNitro: {
    fontFamily: 'Poppins-Medium',
    fontSize: 25,
    lineHeight: 36,
    borderBottomColor: '#ffffff',
    borderBottomWidth: 1,
    color: '#ffffff',
    width: '80%',
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 28,
    lineHeight: 36,
    marginTop: 40,
    textAlign: 'center',
    color: '#000000',
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
    borderBottomColor: '#1881B1',
    borderBottomWidth: 1,
    width: 260,
    fontSize: 12,
    textAlign: 'center',
    color:'black',
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
