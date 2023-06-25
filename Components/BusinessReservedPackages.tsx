import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';
import vectorLocation from '../vectores/vectorLocation';
import { NavigationProp } from '@react-navigation/native';

interface ReservedProps {
  paids: any;
  navigation: NavigationProp<Record<string, object | undefined>>;
}

export const BusinessReservedPackages = ({ paids, navigation }: ReservedProps) => {
  const packageTemp: any = paids.paids[0].data;
  return (
    <TouchableOpacity onPress={() => { navigation.navigate('DetailReservedScreen', { info: paids.paids }) }}>
      <View style={styles.containerPrim}>
        <View style={styles.container}>
          <View style={styles.container1}>
            <Image
              style={styles.img}
              source={{
                uri: packageTemp.mainImageUrl//'https://media.meer.com/attachments/71d38e2818914225a1196a8f1d3ae4961c2d75c9/store/fill/1090/613/1e8eb3a92a4ebbf7b825e3a2b30dce85c5c9fdee0eaee9fe889aed2f7299/Parque-Nacional-Morrocoy-Venezuela.jpg',
              }}
              alt="photo"
            />
          </View>
          <View style={styles.ContainerText}>
            <Text style={styles.textPack}>{packageTemp.name}</Text>
            <View style={styles.ContainerLocation}>
              <SvgXml xml={vectorLocation} height={12} width={12} />
              <Text style={styles.textLocation}>{packageTemp.location}</Text>
            </View>
          </View>
          <Text style={styles.textPack2}>Reservas por confirmar: {paids.paids.length}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  containerPrim: {
    display: 'flex',
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5
  },
  container: {
    width: 350,
    backgroundColor: '#ffffff',
    borderColor: '#1881b18d',
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
    color: '#1881B1',
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

export default BusinessReservedPackages;