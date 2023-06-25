import React, {Component, useEffect, useState} from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import calendar from '../../vectores/calendar';
import {SvgXml} from 'react-native-svg';
import { listPackage } from '../../firebase/Firestore';
import { useUser } from '../../Context/UserContext';
import { NavigationProp } from '@react-navigation/native';

interface publishedPackagesProps {
  navigation: NavigationProp<Record<string, object | undefined>>;
  setLoadingSomeThing: any,
}

const PublishedPackages = ({
  navigation, setLoadingSomeThing,
}: publishedPackagesProps) => {

    const {user} = useUser();
    const [packages, setPackages] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingSomeThing(true);
      const packageList = await listPackage(user.email, false);
      setPackages(packageList);
      setLoadingSomeThing(false);
    };

    fetchData();
  }, [user.email]);

    return (
      <>
      {packages != null && packages.map((packageData, index) => (
      <TouchableOpacity style={styles.container} key={index} onPress={() => navigation.navigate('DetailsScreenUser2', { packageIn: packageData })}>
        <View style={styles.containerPack}>
          <View style={styles.containerText}>
            <Text style={styles.textPack}>{packageData.name}</Text>
            <View style={styles.contenedorCalendario}>
              {/* <SvgXml xml={calendar} /> */}
              <Text style={styles.date}>{packageData.location}</Text>
              <Text style={styles.date}>${packageData.price}</Text>
              
            </View>
          </View>
          <Image
            style={styles.img}
            source={{ uri: packageData.mainImageUrl }}
            alt="photo"
          />
        </View>
      </TouchableOpacity>
      ))}
    </>);
};

const styles = StyleSheet.create({
  containerPack: {
    // backgroundColor: 'red',
    // marginTop:'5%',
    // marginBottom:'5%',
    height: 185,
    width: 161,
    borderRadius: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
    display: 'flex',
  },
  container: {
    flexDirection: 'row',
    marginHorizontal: '4%',
    marginVertical: '1%',
    // gap: 20,
    // backgroundColor: 'red',
  },
  textPack: {
    // backgroundColor: 'green',
    marginLeft: 8,
    // padding: 3,
    color: 'black',
    fontSize: 12,
    fontFamily: 'Poppins-Bold',
  },
  containerText: {
    display: 'flex',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    width: 161,
    height: 60,
    gap: 5,
    zIndex: 1,
  },
  contenedorCalendario: {
    margin: 5,
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center'
    // gap: 4,
  },
  date: {
    color: 'black',
    fontSize: 11,
    fontFamily: 'Poppins-SemiBold',
  },
  img: {
    width: '100%',
    height: 185,
    borderRadius: 20,
    position: 'absolute',
  },
});

export default PublishedPackages;
