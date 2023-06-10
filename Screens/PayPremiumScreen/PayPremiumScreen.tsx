import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native'
import currentLog from '../../firebase/UserData';
import { changePremium } from '../../firebase/Firestore';

export default function PayPremiumScreen() {
    const [paymentRef, setPaymentRef] = useState("");
    const user = currentLog();


        


    const checkPay = async () => {
        if (paymentRef === "") {
            Alert.alert("Error", "Por favor ingrese un código de referencia válido, para más información solicite soporte técnico");
            
        } else {

            changePremium(user?.email);
            
        }

    }
    return (
        <>
        <View>
            <Text>Descripción de lo que hace el paquete premium</Text>
            <Text>Beneficio 1!</Text>
            <Text>Beneficio 2!</Text>
            <Text>Beneficio 3!</Text>
            <Text>Beneficio 4!</Text>
        </View>
        <View style={styles.textBox}>
            <Text style={styles.paragraph}>
                Para proceder, por favor, realiza tu pago móvil tomando en cuenta los siguientes datos:
            </Text>
            <Text style={styles.bulletText}>• Nro de telefono: 0424 116 61 78</Text>
            <Text style={styles.bulletText}>• Banco: Banco Venezolano de Crédito</Text>
            <Text style={styles.bulletText}>• Cédula: V- 27 624 189</Text>
            </View>
        <View >
            <TextInput
                style={styles.inputReferenceNumber}
                placeholder="Ingrese nro. de referencia"
                onChangeText={(text: React.SetStateAction<string>) => setPaymentRef(text)}
                />
            <TouchableOpacity onPress={checkPay}>
                <Text >Ya pagué</Text>
            </TouchableOpacity>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    textBox: {
        marginTop: '3%',
        width: '88.61%',
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
        marginLeft: '7%',
    },
    inputReferenceNumber: {
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
})
