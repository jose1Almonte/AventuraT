import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useEffect } from 'react';
import { Background } from '../../Layouts/Background';
import { useUser } from '../../Context/UserContext';
import { NavigationProp } from '@react-navigation/native';


const Button = ({buttonStyle, buttonTextStyle, text}:{buttonStyle: any, buttonTextStyle: any, text: string}) => {
    return (
        <>
            <TouchableOpacity style={buttonStyle}>
                <Text style={buttonTextStyle}> {text} </Text>
            </TouchableOpacity>
        </>
    );
};


const AdministratePackagesScreen = ({navigation}:{navigation: NavigationProp<Record<string, object | undefined>>;}) => {
    const {user} = useUser();

    useEffect(()=>{
        if (!user){
            Alert.alert('Te pasaste man, no estas logeado');
            navigation.navigate('HomeScreen');
        }
    },[user, navigation]);

  return (
    <View style={styles.giantBox}>
      <View style={styles.firstBox}>
        <TouchableOpacity style={styles.comebackButtonBox}>
            <Image source={require('../../images/comeBackLogo.png')}/>
        </TouchableOpacity>
        <View style={styles.titleBox}>
            <Text style={styles.title}>AventuraT con tus Paquetes</Text>
        </View>
        <View style={styles.profilePictureBox}>
            <TouchableOpacity style={styles.profilePictureMiniBox}>
            <Image source={{uri: user?.photoURL || 'data:image/png;base64,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'}} style={styles.image}/>
            </TouchableOpacity>
        </View>
      </View>

      <View style={styles.secondBox}>

        <View style={styles.buttonsBox}>

            <Button buttonStyle={styles.button} buttonTextStyle={styles.buttonText} text="Todos los paquetes"/>
            <Button buttonStyle={styles.button} buttonTextStyle={styles.buttonText} text="Paquetes caducados"/>
            <Button buttonStyle={styles.buttonEraseExpired} buttonTextStyle={styles.buttonText} text="Borrar caducados"/>
            <Button buttonStyle={styles.buttonEraseAll} buttonTextStyle={styles.buttonText} text="Eliminar TODO"/>

        </View>


      </View>

      <View style={styles.thirdBox}>

        <View style={styles.cardBox}>
            <Background style={styles.backgroundCard} image={require('../../images/bonito.jpeg')}>

                <View style={styles.firstRowCard}>

                    <View style={styles.firstRowLeft}>
                        <Text style={styles.text}>Caduca July 18</Text>
                    </View>

                    <View style={styles.firstRowRight}>
                        <TouchableOpacity style={styles.circle}>
                            <View style={styles.imageBox}>
                                <Image source={require('../../images/TrashCanLogo.png')} style={styles.image}/>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={styles.secondRowCardBox}>
                    <View style={styles.secondRowCard}>

                        <View style={styles.travelNameBox}>
                            <Text style={styles.bigText}> Cayo Sombrero </Text>
                        </View>

                        <View style={styles.datesBox}>
                            <Text style={styles.text}>Fecha inicio: July 18</Text>
                            <Text style={styles.text}>Fecha inicio: July 18</Text>
                        </View>

                    </View>
                </View>
            </Background>
        </View>

      </View>


    </View>
  );
};

export default AdministratePackagesScreen;

const styles = StyleSheet.create({
    giantBox:{
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    firstBox:{
        flex: 10.25,
        // backgroundColor: 'yellow',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },

    secondBox:{
        flex: 22.5,
        justifyContent: 'center',
        alignItems: 'center',
    },

    thirdBox:{
        flex: 67.25,
        backgroundColor: '#1DB5BE',
        alignItems: 'center',
    },

    comebackButtonBox:{
        width: '16.25%',
        // backgroundColor:'black',
        alignItems: 'center',
        justifyContent: 'center',
        height: '73.17%',
    },
    titleBox:{
        width: '67.5%',
        // backgroundColor:'green',
        // justifyContent: 'center',
        alignItems:'center',
        justifyContent: 'center',
        height: '73.17%',
    },
    profilePictureBox:{
        width: '16.25%',
        // backgroundColor:'black',
        height: '73.17%',
        // borderRadius: 50,
        // overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title:{
        // fontFamily: 'Poppins',
        // fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 20,
        lineHeight: 30,
        textAlign: 'center',
        color: '#000000',
    },

    buttonsBox:{
        width: '86.67%',
        height: '63.33%',
        // backgroundColor: 'blue',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },

    button:{
        height: '37.72%',
        width: '41.35%',
        backgroundColor: '#1881B1',
        borderRadius: 8,
        marginBottom: '8.2%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonEraseExpired:{
        height: '37.72%',
        width: '41.35%',
        backgroundColor: '#0B6087',
        borderRadius: 8,
        marginBottom: '8.2%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonEraseAll:{
        height: '37.72%',
        width: '41.35%',
        backgroundColor: '#940A0A',
        borderRadius: 8,
        marginBottom: '8.2%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonText:{
        fontWeight: '700',
        fontSize: 11,
        lineHeight: 16,
        textAlign: 'center',
        color: '#FFFFFF',
    },

    cardBox:{
        width: '86.67%',
        // backgroundColor: 'green',
        marginTop: '3%',
        height: '23.79%',
        borderRadius: 20,
    },

    backgroundCard:{
        flex: 1,
        borderRadius: 20,
        overflow: 'hidden',
    },

    firstRowCard:{
        flexDirection: 'row',
        // backgroundColor: 'red',
        height: '24.22%',
        width: '100%',
        justifyContent: 'space-between',
    },

    firstRowLeft:{
        width: '33.65%',
        height: '100%',
        // backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        borderRadius: 20,
        borderBottomLeftRadius: 0,
        borderTopRightRadius: 0, // Si deseas aplicar un radio diferente a las esquinas superiores derechas
        borderBottomRightRadius: 20, // Si deseas aplicar un radio diferente a las esquinas inferiores derechas
    },

    firstRowRight:{
        // backgroundColor: 'green',
        width: '9.94%',
        height: '100%',
        justifyContent: 'center',
    },

    circle:{
        height: '83.87%',
        width: '83.87%',
        // backgroundColor: 'blue',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.39)',
    },

    imageBox:{
        width: '47%',
        height: '47%',
    },

    image:{
        flex: 1,
        width: undefined,
        height: undefined,
        resizeMode: 'cover',
    },

    secondRowCardBox:{
        width: '100%',
        height: '75.78%',
        // backgroundColor: 'white',
        justifyContent: 'flex-end',
    },

    secondRowCard: {
        flexDirection: 'row',
        // backgroundColor: 'red',
        height: '38.45%',
        width: '100%',
        alignSelf: 'flex-end',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    travelNameBox:{
        height: '100%',
        width: '51.92%',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'black',
    },

    datesBox:{
        height: '100%',
        width: '48.08%',
        justifyContent: 'center',
        alignItems: 'center',
        
        // backgroundColor: 'black',

    },

    bigText:{
        color: 'black',
        fontWeight: '500',
        fontSize: 15,
        lineHeight: 18,
        display: 'flex',
    },

    text:{
        color: 'black',
        fontWeight: '500',
        fontSize: 13,
        lineHeight: 14,
        margin: '1%',
    },

    profilePictureMiniBox:{
        width: '51.28%',
        height: '50%',
        borderRadius: 50,
        overflow: 'hidden',
    },

});
