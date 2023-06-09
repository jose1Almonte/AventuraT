import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { actualizarAvailabilityPlus, updatePaidPackage } from '../firebase/Firestore';
import { useNavigation } from '@react-navigation/native';

interface ReservedCardProps {

    paid: any;
}

const ReservedCard = ({ paid }: ReservedCardProps) => {
    const navigation = useNavigation();
    const [confirm, setConfirm] = useState(false);
    let tempPaid: any = paid.data;

    return (
        <>
            {!confirm && (
                <View style={styles.container}>
                    <View style={styles.containerPack}>
                        <View style={styles.containerPack2}>
                            <View style={styles.contain}>
                                <Image
                                    style={styles.img}
                                    source={{
                                        uri: tempPaid.photoCompradorURL//'https://media.meer.com/attachments/71d38e2818914225a1196a8f1d3ae4961c2d75c9/store/fill/1090/613/1e8eb3a92a4ebbf7b825e3a2b30dce85c5c9fdee0eaee9fe889aed2f7299/Parque-Nacional-Morrocoy-Venezuela.jpg',
                                    }}
                                    alt="photo"
                                />
                                <Text style={styles.textPack}>{tempPaid.compradorMail}</Text>
                            </View>
                            {/* <Text style={styles.textPack2}>Fecha de Pago:  20/06/2023</Text> */}
                            <Text style={styles.textPack2}>Monto: ${tempPaid.price}</Text>
                            <Text style={styles.textPack2}>Referencia: {tempPaid.mobilePayment.mobilePaymentRef}</Text>
                            <View style={styles.containButtons}>
                                <TouchableOpacity onPress={() => {
                                    updatePaidPackage(paid.id, 'C');
                                    setConfirm(true);
                                    navigation.navigate('BusinessReservedScreen');
                                }}>
                                    <Text style={styles.button1}>Confirmar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    updatePaidPackage(paid.id, 'R');
                                    actualizarAvailabilityPlus(tempPaid.id.toString());
                                    setConfirm(true);
                                    navigation.navigate('BusinessReservedScreen');
                                }}>
                                    <Text style={styles.button2}>Rechazar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            )}
        </>

    );
}

const styles = StyleSheet.create({
    contain: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'center'
    },
    containerPack: {
        width: '100%',
        borderRadius: 20,
        backgroundColor: '#fffffff0',
        justifyContent: 'center',
        alignSelf: 'center',
        alignContent: 'center',
        borderColor: '#1881b18d',
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    // borderRadius: 15,
    },
    containerPack2: {
        display: 'flex',
        justifyContent: 'space-around',
    },
    container: {
        flexDirection: 'row',
        gap: 20,
        marginTop: 15,
    },
    textPack: {
        marginHorizontal: 14,
        color: 'black',
        fontSize: 16,
        fontFamily: 'Poppins-Medium',
        marginBottom: 5,
        width: '75%'
    },
    textPack2: {
        marginHorizontal: 70,
        color: 'black',
        fontSize: 13,
        fontFamily: 'Poppins-Regular',
    },
    img: {
        width: 35,
        height: 35,
        borderRadius: 20,
        marginLeft: 20,
        marginBottom: 5,
    },
    containButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingVertical: 10,
    },
    button1: {
        paddingHorizontal: 30,
        paddingVertical: 15,
        backgroundColor: '#1DB5BE',
        color: '#fff',
        borderRadius: 30,
        fontFamily: 'Poppins-Medium',
    },
    buttonConfirm: {
        paddingHorizontal: 30,
        paddingVertical: 15,
        backgroundColor: '#00a33d',
        color: '#fff',
        borderRadius: 30,
    },
    button2: {
        paddingHorizontal: 30,
        paddingVertical: 15,
        backgroundColor: '#730F0F',
        color: '#fff',
        borderRadius: 320,
        fontFamily: 'Poppins-Medium',
    },
});

export default ReservedCard;