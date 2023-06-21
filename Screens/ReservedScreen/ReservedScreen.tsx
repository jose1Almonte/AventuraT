import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity, Alert, FlatList} from 'react-native';
import React, { useEffect , useState } from 'react';
import { NavigationProp } from '@react-navigation/native';
import ReservedPackages from '../../Components/ReservedPackages';
import firestore from '@react-native-firebase/firestore';
import { useUser } from '../../Context/UserContext';
import { purgarHistory } from '../../firebase/Firestore';

interface ReservedScreenProps {
    navigation: NavigationProp<Record<string, object | undefined>>;
}



const ReservedScreen = ({ navigation }: ReservedScreenProps) => {
    const {user} = useUser();
    const [data, setData] = useState();
    const [refreshing, setRefreshing] = useState(false);
    const [Q, setQ] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await firestore()
              .collection('paidPackage')
              .where('compradorMail', '==', user.email)
              .get();
            //@ts-ignore
            setData(querySnapshot.docs);
            setRefreshing(false);
            const allPackagesQ = querySnapshot.docs.every(item => item.data().status === 'Q');
            if (allPackagesQ){
                setQ(true);
            } else {
                setQ(false);
            }
        };
        fetchData();
    }, [refreshing]);


    const handlePurgarHistory = () => {
        if (data){
        setRefreshing(true);
        const ids = data.map(item => item.id);
        purgarHistory(ids);
        }
    };
    const renderItem = ({item}: any) => {
        return (
                <ReservedPackages item={item} navigation={navigation}/>);
    };

    return (
        <View style={styles.container}>
            <View style={styles.info}>
                <View style={styles.topInfo}>
                    <Text style={styles.txt}>Paquetes reservados</Text>
                </View>
                <Text style={styles.txt2}>(Viajes pendientes)</Text>
                { data && (
                <TouchableOpacity style={styles.buttonIPaid} onPress={handlePurgarHistory}>
                    <Text style={styles.textIPaid}>Limpiar histórico</Text>
                </TouchableOpacity>
                )
                }
                {data && data.length > 0 && !refreshing && !Q ? (
                    <View>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                />
                </View>
                ) : (
                    <View>
                    <Text style={styles.al}>No hay elementos disponibles</Text>
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

export default ReservedScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1DB5BE',
    },
    info: {
        flex: 1,
        display: 'flex',
        margin: 5,
    },
    topInfo: {
        marginTop: 80,
        alignItems: 'center',
        gap: 5,
    },buttonIPaid: {
        marginLeft:'30%',
        backgroundColor: '#1881B1',
        borderRadius: 8,
        width: '40%',
        height: '5%',
        justifyContent: 'center',
        alignItems: 'center',
      },
      textIPaid: {
        color: '#FFFFFF',
        fontFamily: 'Poppins-Bold',
        fontSize: 10,
        lineHeight: 19,
      },
    txt: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: '1%',
        color: '#FFF',
    },
    txt2: {
        color: '#FFF',
        fontSize: 16,
        fontFamily: 'Poppins-Light',
        textAlign: 'center',
        paddingHorizontal: 50,
        marginBottom:'10%',
    },
    imageUsed: {
      marginTop: 40,
      width: 350,
      height: 350,
      alignSelf: 'center',
    },
    al:{
        marginTop:'10%',
        marginLeft:'18%',
        color:'white',
    },
});