import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const Tutorial = () => {
  const navigation = useNavigation();
  const salir = async (): Promise<void> => {
    //  Alert.alert('Entendido','Todo Correcto');
    navigation.navigate('HomeScreen');
  };

  return (
    <ScrollView
      style={styles.BackGround}
      contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Text style={styles.title}>Tutorial</Text>

        <Text style={styles.text}>
          1. Dirigirse a "Mis Paquetes" desde el Menú
        </Text>
        <Text style={styles.text}>
          2. Hacer clic en el paquete que desea pasar a Nitro
        </Text>
        <Image
          style={styles.Escalado}
          source={require('../../images/Tuto1.1.png')}
        />
      </View>

      <View style={styles.container2}>
        <Text style={styles.text}>
          3. Hacer clic en el icono de editar paquete
        </Text>
        <Text style={styles.text}>
          4. Hacer clic en "Pasar a VIP"
        </Text>
        <Image
        style={styles.Escalado2}
        source={require('../../images/Tuto2.jpg')}
      />
      </View>
      
      <TouchableOpacity style={styles.buttonIPaid} onPress={salir}>
        <Text style={styles.textIPaid}>Entendido</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  BackGround: {
    flex: 1,
    backgroundColor: 'white',
  },
  Escalado: {
    width: 260,
    height: 150,
    alignSelf: 'center',
    marginTop: 10,
  },
  Escalado2: {
    width: 260,
    height: 290,
    alignSelf: 'center',
    marginTop: 10,
  },
  container: {
    marginTop: 70,
    width: '80%',
  },
  container2: {
    marginTop: 15,
    width: '80%',
  },
  buttonIPaid: {
    backgroundColor: '#1881B1',
    borderRadius: 8,
    width: 240,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: '30%',
  },
  textIPaid: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    lineHeight: 19,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 16,
    color: 'black',
    textAlign: 'center',
  },
  text: {
    marginTop: '5%',
    color: 'black',
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    // textAlign: 'center',
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
export default Tutorial;
