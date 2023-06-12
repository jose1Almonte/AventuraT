import React, { Component } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { SvgXml } from 'react-native-svg';
import vectorLocation from '../vectores/vectorLocation';
interface reservedProps {
  item: any
}

export const ReservedPackages = ({ item }: reservedProps) => {
  return (
    <View style={styles.containerPrim}>
        <View style={styles.container}>
            <View style={styles.container1}>
            <Image
                style={styles.img}
                source={{
                uri: 'https://media.meer.com/attachments/71d38e2818914225a1196a8f1d3ae4961c2d75c9/store/fill/1090/613/1e8eb3a92a4ebbf7b825e3a2b30dce85c5c9fdee0eaee9fe889aed2f7299/Parque-Nacional-Morrocoy-Venezuela.jpg',
                }}
                alt="photo"
            />
            </View>
            <View style={styles.ContainerText}>
            <Text style={styles.textPack}>{item.name}</Text>
            <View style={styles.ContainerLocation}>
                <SvgXml xml={vectorLocation} height={12} width={12} />
                <Text style={styles.textLocation}>{item.location}</Text>
            </View>
            </View>
            if({item.location}=='E'){
              <Text style={styles.textPack}>Esperando Confirmación de Pago...</Text>
            }else if({item.location}=='C'){
              <Text style={styles.textPack3}>Pago Confirmado</Text>
            }else{
              <Text style={styles.textPack2}>Pago Rechazado</Text>
            }
        </View>
    </View>
  );  
}

const styles = StyleSheet.create({
  containerPrim: {
    display: 'flex',
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: 350,
    backgroundColor: '#ffffff',
    borderColor: '#1881B1',
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRadius: 15,
  },
  container1: {
    flexDirection: 'column',
    //gap: 6,
    alignItems: 'center',
    marginBottom: 40,
  },
  textPack: {
    color: 'black',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
  textPack2: {
    paddingRight: 20,
    padding: 2,
    color: 'red',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    textAlign: 'right',
  },
  textPack3: {
    paddingRight:20,
    padding: 2,
    color: 'green',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    textAlign: 'right',
  },
  ContainerText: {
    marginTop: 90,
    paddingLeft: 15,
    display: 'flex',
    justifyContent: 'center',
  },
  img: {
    marginTop: 3,
    width: '95%',
    height: 120,
    borderRadius: 15,
    position: "absolute"
  },
  ContainerLocation: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    gap: 3,
  },
  textLocation: {
    color: 'rgba(0, 0, 0, 0.74)',
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
  },
});

export default ReservedPackages;