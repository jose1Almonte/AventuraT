import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {SvgXml} from 'react-native-svg';
import search from '../images/vectores/search';
import settings from '../images/vectores/settings';
import SearchBar from './Buscador/SearchBar';

class InputSearch extends Component {
  render() {
    return (
      <View style={styles.contenedor}>
        <SearchBar/>
        <View style={styles.Buscador}>
          <SvgXml xml={search} />
          <View style={styles.settings}>
          <SvgXml xml={settings} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contenedor: {
    alignItems: 'center',
    alignContent:'center',
  },
  Buscador: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#1881B1',
    borderRadius: 25,
    width: 360,
    height: 60,
    gap: 20,
    padding: 20,
  },
  txt: {
    color: 'white',
    fontFamily: 'Poppins-medium',
    fontSize: 16,
  },
  settings:{
    width: "80%",
    alignItems: 'center',
    justifyContent: "center"
  },
});

export default InputSearch;
