import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {SvgXml} from 'react-native-svg';
import search from '../vectores/search';
import settings from '../vectores/settings';
import SearchBar from './Buscador/SearchBar';
import FilterButton from './Buscador/Filter';

class InputSearch extends Component {
  render() {
    return (
      <View style={styles.contenedor}>
        <View style={styles.buscador}>
          <View style={styles.barSizes}>
            <SvgXml xml={search}  />
            <View style={styles.settings}>
              <SearchBar/>
              <FilterButton/>
            </View>
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
    zIndex: 999,
  },
  buscador: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#1881B1',
    borderRadius: 25,
    width: 350,
    height: 60,
    gap: 20,
  },
  barSizes: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    gap:10,
  },
  txt: {
    color: 'white',
    fontFamily: 'Poppins-medium',
    fontSize: 16,
  },
  settings:{
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});

export default InputSearch;
