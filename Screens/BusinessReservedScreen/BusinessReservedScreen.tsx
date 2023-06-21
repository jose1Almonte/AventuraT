import { Text, View, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { NavigationProp } from '@react-navigation/native';
import BusinessReservedPackages from '../../Components/BusinessReservedPackages';
import firestore from '@react-native-firebase/firestore';
import { useUser } from '../../Context/UserContext';

interface BusinessReservedScreenProps {
    navigation: NavigationProp<Record<string, object | undefined>>;
}

interface DataPaid {
    idPackage: string;
    paids: any[];
}

const BusinessReservedScreen = ({ navigation }: BusinessReservedScreenProps) => {

    const [data, setData] = useState();
    const { user } = useUser();
    let allIdPackagePaid: string[] = [];
    let dataPaids: DataPaid[] = [];
    let tempDataPaid: DataPaid;

    useEffect(() => {
        const fetchData = async () => {
            const email = user.email;
            const querySnapshot = await firestore()
                .collection('paidPackage')
                .where('emailEnterprise', '==', email)
                .where('status', '==', 'E')
                .get();

            querySnapshot.forEach((doc) => {

                if (!allIdPackagePaid.includes(doc.data().id)) {
                    let idTemp = doc.data().id;
                    let paidsTemp: any = [];
                    querySnapshot.forEach(docPaid => docPaid.data().id == idTemp ? paidsTemp.push({ data: docPaid.data(), id: docPaid.id }) : paidsTemp = paidsTemp);
                    tempDataPaid = { idPackage: idTemp, paids: paidsTemp };
                    dataPaids.push(tempDataPaid);
                    allIdPackagePaid.push(idTemp);
                }

            });
            // @ts-ignore
            setData(dataPaids);
        };
        fetchData();
    }, []);

    const renderItem = ({ item }: any) => {
        return (<BusinessReservedPackages paids={item} navigation={navigation} />);
    };

    return (
        <View style={styles.container}>
            <View style={styles.info}>
                <View style={styles.topInfo}>
                    <Text style={styles.txt}>Gestión de Pagos</Text>
                    <Text style={styles.txt}>de Paquetes</Text>
                </View>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                />
            </View>
        </View>
    );
};

export default BusinessReservedScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    info: {
        flex: 1,
        display: 'flex',
        margin: 5
    },
    topInfo: {
        marginTop: 80,
        alignItems: 'center',
    },
    txt: {
        color: 'black',
        fontSize: 20,
        fontFamily: 'Poppins-SemiBold',
    },
});