import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import Califications from './Califications';
import { RaitingI } from '../models/raiting.interface';

interface feedbackProps {
    item: any
}

const FeedbackCard = ({ item }: feedbackProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.containerPack}>
                <View style={styles.containerPack2}>
                    <View style={styles.contain}>
                        <Image
                            style={styles.img}
                            source={{
                                uri: item.creator.photoURL//'https://media.meer.com/attachments/71d38e2818914225a1196a8f1d3ae4961c2d75c9/store/fill/1090/613/1e8eb3a92a4ebbf7b825e3a2b30dce85c5c9fdee0eaee9fe889aed2f7299/Parque-Nacional-Morrocoy-Venezuela.jpg',
                            }}
                            alt="photo"
                        />
                        <Text style={styles.textPack}>{item.creator.displayName}</Text>
                        <View style={styles.stars}>
                        <Califications  calification={item.stars} />
                        </View>
                    </View>
                    <View style={styles.jojo}>
                    <Text style={styles.textPack2}>{item.comments}</Text>
                    </View>
                </View>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    contain: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: '3%',
        alignItems:'center',
    },
    containerPack: {
        /* height: 130,*/
        width: 330,
        borderRadius: 20,
        backgroundColor: '#1881B1',
    },
    containerPack2: {
        display: 'flex',
        justifyContent: 'space-around',
        marginBottom:'5%',
    },
    jojo:{
        marginLeft: '10%',
        marginRight: '10%',
    },
    container: {
        flexDirection: 'row',
        gap: 20,
        marginTop: 15,
    },
    stars: {
        alignContent:'flex-end',
        marginRight:'5%',
    },
    textPack: {
        marginHorizontal: 10,
        color: 'white',
        fontSize:9,
        fontFamily: 'Poppins-Medium',
        marginBottom: 5,
        flex:1,
    },
    textPack2: {
        marginHorizontal: 15,
        padding: 10,
        color: 'white',
        fontSize: 8,
        fontFamily: 'Poppins-Medium',
    },
    img: {
        width: 35,
        height: 35,
        borderRadius: 20,
        marginLeft: 20,
        marginBottom: 5,
    },
    black:{
        color:'black',
    },
});

export default FeedbackCard;