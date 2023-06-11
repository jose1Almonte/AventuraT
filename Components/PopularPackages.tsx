import React, {Component, useEffect, useState} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {SvgXml} from 'react-native-svg';
import vectorLocation from '../vectores/vectorLocation';
import {ButtonLikes} from './ButtonLikes';
import { PackageI } from '../models/package.interface';
import { getPopularPackages } from '../firebase/Firestore';
import PopularPackage from './PopularPackage';
import { NavigationProp } from '@react-navigation/native';


interface popularProps {
  navigation: NavigationProp<Record<string, object | undefined>>;
}

export const PopularPackages = ({navigation}: popularProps) => {

  const [popularPackages, setPopularPackages]: any[] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    fetchPackages();
  }, [])

  const fetchPackages = async () => {
    
    const packages = await getPopularPackages();
    setPopularPackages(packages);
    setLoading(false);
  }

  return (
    <>
      {!loading &&
        popularPackages.map((rawData: any, idx: any) => (
            <View key={idx}>
              <PopularPackage data={popularPackages[idx]} navigation={navigation} />
            </View>
        ))
      }
      {
        loading &&
        <Text>Estoy cargandoooooooooooooooooooooooo</Text>
      }
      </>
      );
    
  }


const styles = StyleSheet.create({

  container: {
    width: 115,
    // height: 170,
    backgroundColor: '#ffffff',
    borderRadius: 15,
  },
  container1: {
    flexDirection: 'column',
    gap: 6,
    alignItems: 'center',
  },
  star: {
    width: 12,
    height: 12,
  },
  textPack: {
    padding: 6,
    color: 'black',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
  ContainerText: {
    marginTop: 80,
    display: 'flex',
    justifyContent: 'center',
    alignContent: "flex-end",
    alignSelf: "flex-end",
    alignItems: 'flex-start',
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
    marginLeft: 12,
  },
  ContainerLikes: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    display: 'flex',
    width: 26,
    height: 26,
    padding: 10,
    marginTop: 10,
    zIndex: 1,
  },
  textLocation: {
    color: 'rgba(0, 0, 0, 0.74)',
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
  },
});

export default PopularPackages;
