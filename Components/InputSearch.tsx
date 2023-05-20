import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {SvgXml} from 'react-native-svg';
import search from '../images/vectores/search';
import settings from '../images/vectores/settings';

class InputSearch extends Component {
  render() {
    return (
      <View style={styles.contenedor}>
        <View style={styles.Buscador}>
          <SvgXml xml={search} />
          <Text style={styles.txt}>Buscar destinos</Text>
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
  },
  Buscador: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#1881B1',
    borderRadius: 25,
    width: 350,
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
  }
});

export default InputSearch;
