import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {SvgXml} from 'react-native-svg';
import star from '../vectores/star';

class Califications extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container1}>
        <Text style={styles.textPack}>4.6</Text>
        <SvgXml xml={star} width={12} height={12}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 54,
    height: 25,
    backgroundColor: " rgba(255, 255, 255, 0.25)",
    borderRadius: 8
  },
  container1:{
    flexDirection: 'row',
    gap: 6,
    alignItems: "center"
  },
  star:{
    width: 12,
    height: 12
  },
  textPack: {
    marginLeft: 5,
    padding: 3,
    color: 'white',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
  containerText: {
    // display: 'flex',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    width: 161,
    height: 60,
    // gap: 5,
    // zIndex: 1,
  },
});

export default Califications;
