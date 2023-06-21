import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const Tutorial = () => {
    const navigation = useNavigation();
    const salir = async (): Promise<void> => {
       Alert.alert('Entendido','Todo Correcto');
       navigation.navigate('HomeScreen');
    };

  return (
    <ScrollView style={styles.BackGround} contentContainerStyle={styles.scrollViewContent}>
        <Image
            style={styles.Escalado}
            source={require('../../images/Tuto1.jpg')}
                  />
        <Image
            style={styles.Escalado2}
            source={require('../../images/Tuto2.jpg')}
        />
        <TouchableOpacity style={styles.buttonIPaid} onPress={salir}>
            <Text style={styles.textIPaid}>GOTCHA!</Text>
        </TouchableOpacity>
        
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    BackGround:{
        flex:1,
        backgroundColor:'white',
        
    },
    Escalado:{
        width:'100%',
        height:'50%',
    },
    Escalado2:{
        width:'60%',
        height:'30%',
        marginTop:'-30%',
    },
    buttonIPaid: {
        backgroundColor: '#1881B1',
        borderRadius: 8,
        width: 264,
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:'40%',
      },
      textIPaid: {
        color: '#FFFFFF',
        fontFamily: 'Poppins-Bold',
        fontSize: 16,
        lineHeight: 19,
      },
      scrollViewContent: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
      },

});
export default Tutorial;
