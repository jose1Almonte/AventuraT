import { Text, View, StyleSheet,Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';
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
    const [E, setE] = useState(Boolean);
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
            .onSnapshot((snapshot) => {
              let updatedDataPaids: DataPaid[] = [];
              let updatedAllIdPackagePaid: string[] = [];
              let allPackagesE = false;

              snapshot.forEach((doc) => {
                if (!updatedAllIdPackagePaid.includes(doc.data().id)) {
                  const idTemp = doc.data().id;
                  let paidsTemp: any = [];

                  snapshot.forEach((docPaid) => {
                    if (docPaid.data().id === idTemp) {
                      paidsTemp.push({ data: docPaid.data(), id: docPaid.id });
                    }
                  });

                  const tempDataPaid: DataPaid = { idPackage: idTemp, paids: paidsTemp };
                  updatedDataPaids.push(tempDataPaid);
                  updatedAllIdPackagePaid.push(idTemp);
                }
              });

              allPackagesE = snapshot.docs.some((item) => item.data().status === 'E');

              setE(allPackagesE);
              setData(updatedDataPaids);
            });
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
                {E ? (
                <View style={styles.limit}>
                    <FlatList
                    data={data}
                    renderItem={renderItem}
                    />
                </View>
                ) : (
                <View>
                    <Text style={styles.al}>No hay paquetes a confirmar aún</Text>
                    <Image
                        style={styles.imageUsed}
                        source={require('../../images/favorites.png')}
                    />
                </View>
                )}
            </View>
        </View>
    );
};

export default BusinessReservedScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1DB5BE',
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
    limit:{
        flex:1,
    },
    txt: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'Poppins-SemiBold',
    },
    al:{
    marginTop:'10%',
    color:'white',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    },
    imageUsed: {
        marginTop: 40,
        width: 350,
        height: 350,
        alignSelf: 'center',
      },
});