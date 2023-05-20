import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import { useUser } from '../../Context/UserContext';

interface MobilePayment{
    // user: any;
    mobilePaymentRef: string;
}

const MobilePaymentScreen = () => {

    const [mobilePayment, setMobilePayment] = useState<MobilePayment>({
        // user: useUser(),
        mobilePaymentRef: '',
    });

    return (
        <View style={styles.giantBox}>
            <View style={styles.firstBigBox}>
                <Text style={styles.title}> !Elegiste pago móvil! </Text>
            </View>
            <View style={styles.secondBigBox}>
                <Image style={styles.imageUsed} source={require('../../images/PagoMovilLogo.png')}/>
            </View>
            <View style={styles.thirdBigBox}>
                <View style={styles.textBox}>
                    <Text style={styles.paragraph}>Para proceder, por favor, realiza tu pago móvil tomando en cuenta los siguientes datos:</Text>
                    <Text style={styles.bulletText}>• Nro de telefono: 0424 116 61 78</Text>
                    <Text style={styles.bulletText}>• Banco: Banco Venezolano de Crédito</Text>
                    <Text style={styles.bulletText}>• Cédula: V- 27 624 189</Text>
                </View>
            </View>
            <View style={styles.fourthBigBox}>
                <TextInput style={styles.inputReferenceNumber} placeholder = "Ingrese nro. de referencia" onChangeText={(text) => setMobilePayment({...mobilePayment, mobilePaymentRef: text})}/>
                {/* <Text style = {styles.buttonNumberReferenceText} >Ingrese nro. de referencia</Text> */}
            </View>
            <View style={styles.fifthBigBox}>
                <TouchableOpacity style = {styles.buttonIPaid} onPress={() => {console.log(mobilePayment); Alert.alert(mobilePayment.mobilePaymentRef);}}>
                    <>
                    <Text style={styles.textIPaid}> Ya pagué c: </Text>
                    </>
                </TouchableOpacity>
            </View>
        </View>
  );
};

export default MobilePaymentScreen;

const styles = StyleSheet.create({

    giantBox:{
        flex: 1,
        backgroundColor: '#1DB5BE',
    },

    firstBigBox:{
        // backgroundColor:'red',
        flex: 17.75,
        justifyContent: 'flex-end',
    },

    secondBigBox:{
        // backgroundColor:'blue',
        flex: 20.375,
        alignItems: 'center',
    },
    thirdBigBox:{
        // backgroundColor:'yellow',
        flex: 29.375,
        alignItems: 'center',
    },
    fourthBigBox:{
        // backgroundColor:'green',
        flex: 21.25,
        alignItems: 'center',

    },
    fifthBigBox:{
        // backgroundColor:'black',
        flex: 11.25,
        alignItems: 'center',
    },

    title:{
        fontWeight: '600',
        fontSize: 24,
        lineHeight: 36,
        textAlign: 'center',
        color: '#FFFFFF',
        marginBottom: '7%',
    },

    imageUsed:{
        height: '100%',
    },

    textBox:{
        marginTop: '3%',
        // backgroundColor: 'white',
        width: '88.61%',
    },

    paragraph:{
        paddingBottom: '3%',
        // fontFamily: 'Poppins',
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 21,
        textAlign: 'justify',
        color: '#000000',
        // fontStyle: 'normal',
    },

    bulletText:{
        // paddingBottom: '3%',
        // fontFamily: 'Poppins',
        fontWeight: '500',
        fontSize: 14,
        // lineHeight: 21,
        textAlign: 'justify',
        color: '#000000',
        marginLeft: '7%',
    },

    inputReferenceNumber:{
        width: '88.05%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1881B1',
        height: 48,
        borderRadius: 25,

        fontWeight: '500',
        fontSize: 18,
        lineHeight: 27,
        display: 'flex',
        textAlign: 'center',
        color: '#FFFFFF',
    },

    buttonNumberReferenceText:{

        fontWeight: '500',
        fontSize: 18,
        lineHeight: 27,
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        color: '#FFFFFF',
    },

    buttonIPaid:{
        height: '44.44%',
        width: '68.33%',
        backgroundColor: '#EEEEFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 18,
    },

    textIPaid: {
        fontWeight: '700',
        fontSize: 18,
        lineHeight: 27,
        textAlign: 'center',
        color: '#000000',
    },
});
