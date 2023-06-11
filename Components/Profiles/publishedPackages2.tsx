import React, {Component, useEffect, useState} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import calendar from '../../vectores/calendar';
import {SvgXml} from 'react-native-svg';
import { listPackage } from '../../firebase/Firestore';

function PublishedPackages(email) {
    const [packages, setPackages] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const packageList = await listPackage(email.email, true);
      setPackages(packageList);
    };

    fetchData();
  }, [email.email]);

    return (
      <>
      {packages != null && packages.map((packageData, index) => (
      <View style={styles.container} key={index} >
        <View style={styles.containerPack}>
          <View style={styles.containerText}>
            <Text style={styles.textPack}>{packageData.name}</Text>
            <View style={styles.contenedorCalendario}>
              <SvgXml xml={calendar} />
              <Text style={styles.date}>'s'</Text>
            </View>
          </View>
          <Image
            style={styles.img}
            source={{ uri: packageData.mainImageUrl }}
            alt="photo"
          />
        </View>
      </View>))}
      </>
    );
}

const styles = StyleSheet.create({
  containerPack: {
    backgroundColor: '#1DB5BE',
    height: 185,
    width: 165,
    borderRadius: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
    display: 'flex',
    // borderColor: '#1db6be94',
    // borderWidth: 1.5,
    overflow:'hidden',
  },
  container: {
    flexDirection: 'row',
    marginHorizontal: '4%',
    marginVertical: '1.5%',
  },
  textPack: {
    marginLeft: 10,
    color: 'black',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
  containerText: {
    display: 'flex',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    width: 165,
    height: 60,
    gap: 5,
    zIndex: 1,
  },
  contenedorCalendario: {
    marginRight: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 4,
  },
  date: {
    color: 'black',
    fontSize: 11,
    fontFamily: 'Poppins-Regular',
  },
  img: {
    width: '100%',
    height: 185,
    borderRadius: 20,
    position: 'absolute',
  },
});

export default PublishedPackages;
