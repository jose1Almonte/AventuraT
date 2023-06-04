import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Linking } from 'react-native';

const ButtonEmail = () => {
  const [emailSent, setEmailSent] = useState(false);

  const handleEmail = async () => {
    const recipientEmail = 'helpdesk.aventurat@gmail.com'; // Reemplaza con el correo electrónico de tu empresa
    const subject = 'Consulta'; // Asunto del correo electrónico
    const body = 'Hola, tengo una pregunta...';
    const mailtoUrl = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;

    try {
      await Linking.openURL(mailtoUrl);
      setEmailSent(true); // Marcar el correo electrónico como enviado
    } catch (error) {
      console.log('Error al abrir el cliente de correo electrónico', error);
    }
  };

  return (
    <View>
      <TouchableOpacity style={styles.containerButton} onPress={handleEmail}>
        <View style={styles.container}>
          <Text style={styles.text}>Correo electrónico</Text>
        </View>
      </TouchableOpacity>
      {emailSent && (
        <Text style={styles.message}>¡El correo electrónico se ha enviado correctamente!</Text>
      )}
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
    backgroundColor: '#1881B1',
  },
  text: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
  message: {
    textAlign: 'center',
    marginTop: 10,
    color: 'green',
    fontFamily: 'Poppins-Medium',
  },
});

export default ButtonEmail;
