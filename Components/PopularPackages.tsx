import React, {Component, useEffect, useState} from 'react';
import {View, StyleSheet, Text, Image, Dimensions} from 'react-native';
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


export const PopularPackages = ({ navigation }: popularProps) => {
  

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
              <View key={idx} >
                <PopularPackage data={popularPackages[idx]} navigation={navigation} />
              </View>
          ))
        }
        {
          loading &&
          <Text style={styles.text}>Cargando...</Text>
        }
      </>
      );
    
  }


const styles = StyleSheet.create({
text:{
  fontFamily: 'Poppins-Regular',
  fontSize: 12,
  color: 'black'
}
});

export default PopularPackages;
