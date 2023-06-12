import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Alert, FlatList} from 'react-native';
import React, { useEffect , useState } from 'react';
import { NavigationProp } from '@react-navigation/native';
import ReservedPackages from '../../Components/ReservedPackages';
import firestore from '@react-native-firebase/firestore';
import { useUser } from '../../Context/UserContext';

interface ReservedScreenProps {
    navigation: NavigationProp<Record<string, object | undefined>>;
}

const ReservedScreen = ({ navigation }: ReservedScreenProps) => {
    const {user} = useUser();
    const [data, setData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await firestore()
              .collection('paidPackage')
              .where('compradorMail', '==', user.email)
              .get();
            //@ts-ignore
            setData(querySnapshot.docs);
        };
        fetchData();
    }, []);

    const renderItem = ({item}: any) => {
        return (<ReservedPackages item={item} navigation={navigation}/>);
    };

    return (
        <View style={styles.container}>
            <View style={styles.info}>
                <View style={styles.topInfo}>
                    <Text style={styles.txt}>Paquetes reservados</Text>
                </View>
                <Text style={styles.txt2}>(Viajes pendientes)</Text>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                />
            </View>
        </View>
    );
};

export default ReservedScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
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
    },
    txt: {
        color: 'black',
        fontSize: 20,
        fontFamily: 'Poppins-SemiBold',
    },
    txt2: {
        color: 'black',
        fontSize: 16,
        fontFamily: 'Poppins-Light',
        textAlign: 'right',
        paddingHorizontal: 50,
    },
});