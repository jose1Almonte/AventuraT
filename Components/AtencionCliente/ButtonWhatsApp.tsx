import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';

const ButtonWhatsApp = () => {
  const [whatsSent, setWhatsSent] = useState(false);

  const openWhatsApp = async () => {
    const phoneNumber = '+584140227086';
    const url = `whatsapp://send?phone=${phoneNumber}`;

    try {
      await Linking.openURL(url);
      setWhatsSent(true);
    } catch (error) {
      console.log('Error al abrir WhatsApp', error);
    }
  };

  return (
    <View>
      <TouchableOpacity style={styles.containerButton} onPress={openWhatsApp}>
        <View style={styles.container}>
          <Image
            style={styles.icon}
            source={require('../../images/WhatsApp_icon.png')}
            alt="icon whatsapp"
          />
          <Text style={styles.text}>WhatsApp</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  containerButton: {
    display: 'flex',
    alignItems: 'center',
  },
  container: {
    height: 45,
    width: 190,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1DB5BE',
    flexDirection: 'row',
    gap: 10,
  },
  text: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
  icon: {
    width: 30,
    height: 30,
  },
});

export default ButtonWhatsApp;
