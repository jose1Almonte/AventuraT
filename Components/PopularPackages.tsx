import React, {Component} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {SvgXml} from 'react-native-svg';
import vectorLocation from '../images/vectores/vectorLocation';

class PopularPackages extends Component {
  render() {
    return (
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
          <Text style={styles.textPack}>Full-Day Bahia de Cata</Text>
          <View style={styles.ContainerLocation}>
          <SvgXml xml={vectorLocation} height={12} width={12}/>
          <Text style={styles.textLocation}>Aragua</Text>
          </View>
          
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 115,
    height: 200,
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
    marginTop: 3,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  img: {
    marginTop: 3,
    width: '95%',
    height: 120,
    borderRadius: 15,
  },
  ContainerLocation:{
    flexDirection: "row",
    display: 'flex',
    alignItems: "center",
    gap: 3,
    marginLeft: 12,
  },
  textLocation:{
    color: 'rgba(0, 0, 0, 0.74)',
    fontFamily: "Poppins-Regular",
    fontSize: 10
  }
});

export default PopularPackages;
