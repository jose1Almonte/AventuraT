import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SvgXml } from 'react-native-svg';
import star from '../vectores/star';

interface califications2Props {
  calification: string | undefined;
}

const Califications2 = ({ calification }: califications2Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.ratingText}>{calification}</Text>
        <SvgXml xml={star} width={14} height={14} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 54,
    height: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 8,
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  starIcon: {
    width: 12,
    height: 12,
  },
  ratingText: {
    marginLeft: 5,
    padding: 3,
    color: 'white',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
});

export default Califications2;