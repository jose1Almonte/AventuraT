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
    <View style={styles.pos}>
        {popularPackages.length > 0 ? (
          <>
          <Text style={styles.title}>Paquetes Recomendados</Text>
          </>
        ):(
          <View style={styles.center}>
            {/* <Text style={styles.title}></Text> */}
          <FastImage
            source={require('../images/coming-soon-unscreen.gif')}
            style={styles.loadingGif2}
            resizeMode="contain"
          />
          </View>
        )}
        <View style={styles.flexrow}>
        {!loading &&
          popularPackages.map((rawData: any, idx: any) => (
              <View key={idx} style={styles.margin}>
                <PopularPackage data={popularPackages[idx]} navigation={navigation} />
              </View>
          ))
        }
        </View>
        {
          loading &&
          <Text style={styles.text}>Cargando...</Text>
        }
         {popularPackages.length > 0 && (
          <TouchableOpacity style={styles.showMore} onPress={() => {navigation.navigate("PopularPackageScreen")}}>
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
flexrow:{
  flex:1,
  flexDirection:'row',
  
},
margin:{
  alignContent:'center',
  alignItems:'center',
  marginLeft:'2%',
  marginRight:'-2%',
},
title: {
  marginBottom: 15,
  fontFamily: 'Poppins-Bold',
  fontSize: 18,
  color: 'white',
},
pos:{
  marginLeft:'-4%',
},
center:{
  alignItems: 'center',
},
loadingGif:{
  width:60,
  height:60,
},
loadingGif2:{
  marginLeft:'30%',
  width:180,
  height:180,
},


showMore: {
  width: 100,
  height: 35,
  marginTop: '10%',
  marginBottom: '20%',
  marginLeft:'3%',
  backgroundColor: '#1881B1',
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'center',
  borderRadius: 8,
},
moreText: {
  color: '#FFFFFF',
  fontSize: 12,
  lineHeight: 19,
  fontFamily: 'Poppins-Bold',
},
});

export default PopularPackages;
