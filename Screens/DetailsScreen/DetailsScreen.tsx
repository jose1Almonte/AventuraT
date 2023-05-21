import React from 'react';
import {ScrollView, Text, StyleSheet, View, Image} from 'react-native';
import Califications from '../../Components/Califications';
import {SvgXml} from 'react-native-svg';
import star from '../../vectores/star';

const DetailsScreen = () => {
  return (
    <ScrollView style={styles.background}>
      <View style={styles.container}>
        <View style={styles.containerPack}>
          <View style={styles.containerText}>
            <Text style={styles.textPack}>Nombre paquete</Text>
            <View style={styles.containerCalification}>
              <Text style={styles.ratingText}>4.6</Text>
              <SvgXml xml={star} width={22} height={22} />
            </View>
          </View>
          <Image
            style={styles.containerPhotoPack}
            source={require('../../images/bonito.jpeg')}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#1DB5BE',
  },
  container: {
    flex: 1,
    width: '100%',
    height: 360,
  },
  containerPhotoPack: {
    width: '100%',
    height: 360,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: 'absolute',
  },
  containerText: {
    backgroundColor: '#1d26276e',
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 30,
    width: '100%',
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 1,
  },
  textPack: {
    marginLeft: 20,
    padding: 5,
    color: 'white',
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    width: 290,
  },
  containerCalification: {
    width: 70,
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 8,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 10,
    marginRight: 20,
  },
  ratingText: {
    marginLeft: 5,
    padding: 3,
    color: 'white',
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
  },
  containerPack: {
    height: 360,
    width: '100%',
    borderRadius: 30,
    justifyContent: 'flex-end',
    alignItems: 'center',
    display: 'flex',
  },
});
