import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import vectorHelpdeskScreen from '../../vectores/vectorHelpdeskScreen';
import ButtonEmail from '../../Components/AtencionCliente/ButtonEmail';
import ButtonWhatsApp from '../../Components/AtencionCliente/ButtonWhatsApp';

export default class HelpdeskScreen extends Component {
  render() {
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    return (
      <ScrollView style={styles.container}>
        <SvgXml
          xml={vectorHelpdeskScreen}
          width={`${screenWidth * 1}`}
          height={`${screenHeight * 0.515}`}
        />

        <View style={styles.containerImg}>
          <Image
            style={styles.img}
            source={require('../../images/imgHelpdesk.png')}
          />
        </View>

        <View style={styles.info}>
          <Text style={styles.title}>
            ¿Tienes dudas sobre nuestro servicio, algún paquete de viaje o empresa?
          </Text>

          <View style={styles.containerOptions}>
            <Text style={styles.subtitle}>Contáctanos a través de</Text>
            <ButtonEmail />
            <Text style={styles.subtitle}>O</Text>
            <ButtonWhatsApp />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerImg: {
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: 406,
  },
  img: {
    marginTop: 90,
    width: '100%',
    height: 450,
  },
  info: {
    flex: 1,
    margin: 55,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    textAlign: 'center',
  },
  containerOptions: {
    marginTop: 10,
    gap: 10,
  },
});
