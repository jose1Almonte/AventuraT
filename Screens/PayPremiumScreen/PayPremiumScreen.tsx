import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView, Dimensions} from 'react-native'
import currentLog from '../../firebase/UserData';
import { changePremium } from '../../firebase/Firestore';
import { Image, SvgXml } from 'react-native-svg';
import vectorHelpdeskScreen from '../../vectores/vectorHelpdeskScreen';



export default function PayPremiumScreen() {
    const [paymentRef, setPaymentRef] = useState("");
    const user = currentLog();


    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;


    const checkPay = async () => {
        if (paymentRef === "") {
            Alert.alert("Error", "Por favor ingrese un código de referencia válido, para más información solicite soporte técnico");
            
        } else {

            changePremium(user?.email);
            
        }

    }
    return (
        <>
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
                <Text style={styles.textPrice}>$ 50</Text>
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
                        onChangeText={(text) => {
                    setPaymentRef(text)
                    }
                }
                />
            </View>

            <View style={styles.fifthBigBox}>
                <TouchableOpacity style={styles.buttonIPaid} onPress={checkPay}>
                <Text style={styles.textIPaid}>Ya pagué</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
        </>
    )
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
        borderBottomColor: '#1881B1',
        borderBottomWidth: 1,
        width: 260,
        fontSize: 18,
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
})
