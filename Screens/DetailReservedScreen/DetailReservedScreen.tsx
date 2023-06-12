import { Text, View, StyleSheet, FlatList } from 'react-native';
import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import ReservedCard from '../../Components/ReservedCard';

interface DetailReservedScreenProps {
    //navigation: NavigationProp<Record<string, object | undefined>>;
    route?: any;
}

const DetailReservedScreen = ({ route }: DetailReservedScreenProps) => {
    //@ts-ignore
    let tempPackage: any = route.params.info[0].data;
    let data: any[] = route.params.info;

    const renderItem = ({ item }: any) => {
        return (<ReservedCard paid={item} />);
    };

    return (
        <View style={styles.container}>
            <View style={styles.info}>
                <View style={styles.topInfo}>
                    <Text style={styles.txt}>Reservas por confirmar del Paquete:</Text>
                    <Text style={styles.txt2}>{tempPackage.name}</Text>
                    <FlatList
                        data={data}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                    />
                </View>
            </View>
        </View>
    );
};

export default DetailReservedScreen;

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
        gap: 15,
    },
    txt: {
        color: 'black',
        fontSize: 20,
        fontFamily: 'Poppins-SemiBold',
    },
    txt2: {
        color: 'black',
        fontSize: 20,
        fontFamily: 'Poppins-Light',
        textAlign: 'right',
    },
});