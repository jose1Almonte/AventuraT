import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {SvgXml} from 'react-native-svg';
import search from '../vectores/search';
import settings from '../vectores/settings';
import SearchBar from './Buscador/SearchBar';

class InputSearch extends Component {
  render() {
    return (
      <View style={styles.contenedor}>

        <View style={styles.buscador}>

          <View style={styles.barSizes}>

            <SvgXml xml={search}  />

            <View style={styles.settings}>
              <SearchBar/>
              <SvgXml xml={settings} />
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
    height: '10%',
    zIndex: 999,
  },
  buscador: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#1881B1',
    // backgroundColor: 'pink',
    borderRadius: 25,
    width: 360,
    // height: 60,
    height: '100%',
    gap: 20,
    padding: '3.5%',
  },

  barSizes: {
    // backgroundColor: 'black',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },

  txt: {
    color: 'white',
    fontFamily: 'Poppins-medium',
    fontSize: 16,
  },
  settings:{
    width: '80%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    // backgroundColor: 'green',
  },
});

export default InputSearch;
