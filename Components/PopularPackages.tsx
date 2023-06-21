import React, {Component, useEffect, useState} from 'react';
import {View, StyleSheet, Text, Image, Dimensions, TouchableOpacity} from 'react-native';
import {SvgXml} from 'react-native-svg';
import vectorLocation from '../vectores/vectorLocation';
import {ButtonLikes} from './ButtonLikes';
import { PackageI } from '../models/package.interface';
import { getPopularPackages } from '../firebase/Firestore';
import PopularPackage from './PopularPackage';
import { NavigationProp } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';


interface popularProps {
  navigation: NavigationProp<Record<string, object | undefined>>;
}


export const PopularPackages = ({ navigation }: popularProps) => {
  

  const [popularPackages, setPopularPackages]: any[] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const fetchPackages = async () => {
    
      const packages = await getPopularPackages();
      setPopularPackages(packages);
      setLoading(false);
    };

    fetchPackages();
  }, [popularPackages]);


  return (
    <View>
        {popularPackages.length > 0 && (
          <Text style={styles.title}>Paquetes Recomendados</Text>
        )}
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
         {popularPackages.length > 0 && (
        <TouchableOpacity style={styles.showMore}>
            <Text style={styles.moreText}>Ver más</Text>
          </TouchableOpacity>)}
      </View>
      );
    
  }


const styles = StyleSheet.create({
text:{
  fontFamily: 'Poppins-Regular',
  fontSize: 12,
  color: 'black',
},

title: {
  marginBottom: 15,
  fontFamily: 'Poppins-Bold',
  fontSize: 18,
  color: 'white',
},
loadingGif:{
  width:60,
  height:60,
},
showMore: {
  width: 100,
  height: 35,
  marginTop: '10%',
  marginBottom: '20%',
  backgroundColor: 'white',
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'center',
  borderRadius: 12
},
moreText: {
  color: 'black',
  fontSize: 12,
  fontFamily: 'Poppins-SemiBold',
},
});

export default PopularPackages;
