import React, {Component} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import calendar from '../../images/vectores/calendar';
import {SvgXml} from 'react-native-svg';

class PublishedPackages extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerPack}>
          <View style={styles.containerText}>
            <Text style={styles.textPack}>Nombre paquete</Text>
            <View style={styles.contenedorCalendario}>
              <SvgXml xml={calendar} />
              <Text style={styles.date}>Mayo, 15</Text>
            </View>
          </View>
          <Image
            style={styles.img}
            source={{
              uri: 'https://media.meer.com/attachments/71d38e2818914225a1196a8f1d3ae4961c2d75c9/store/fill/1090/613/1e8eb3a92a4ebbf7b825e3a2b30dce85c5c9fdee0eaee9fe889aed2f7299/Parque-Nacional-Morrocoy-Venezuela.jpg',
            }}
            alt="photo"
          />
        </View>

        {/* <View style={styles.containerPack}>
          <View style={styles.containerText}>
            <Text style={styles.textPack}>Nombre paquete</Text>
            <View style={styles.contenedorCalendario}>
              <SvgXml xml={calendar} />
              <Text style={styles.date}>Mayo, 16</Text>
            </View>
          </View>
        </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerPack: {
    height: 185,
    width: 161,
    borderRadius: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
    display: 'flex',
  },
  container: {
    flexDirection: 'row',
    gap: 20,
  },
  textPack: {
    marginLeft: 5,
    padding: 3,
    color: 'black',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
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
