import { View ,ScrollView, Text, StyleSheet, PixelRatio , Dimensions} from 'react-native';
import React from 'react';
//import RegisterEnterprise from '../../Components/registerEnterprise';
import YourSignInWithGoogleComponent from '../../firebase/PerfilPicture';
import RegisterEnterprise from '../../Components/registerEnterprise';
//import UserProfileScreen from '../UserProfileScreen/UserProfileScreen';
//import UserProfileScreen from '../BusinessProfileScreen/BusinessProfileScreen';

const{height,width} = Dimensions.get('window');

const pixelSize2 = PixelRatio.getPixelSizeForLayoutSize(700);

const HomeScreen = () => {
  return (
    <ScrollView style={styles.backGround}>
      <View style={styles.flex}>
        <View style={styles.Header}>
          <Text style={styles.Central2}>  MENU</Text>
          <Text style={styles.Central}>   AventuraT </Text>
          <YourSignInWithGoogleComponent/>
        </View>
      </View>
      <View style={styles.Maravillosa}>
        <Text style={styles.Buscador}>  </Text>
      </View>
      <RegisterEnterprise/>
    </ScrollView>
  );
};

export default HomeScreen;


const styles = StyleSheet.create({
  backGround:{
    backgroundColor: '#1DB5BE',
    // flex: 1,
  },

  onFire:{
  },

  flex:{
    alignItems:'center',
  },


  Header:{
    padding: 5,
    alignItems:'center',
    flexDirection:'row',
    justifyContent: 'space-between',
  },

  Buscador:{
    backgroundColor: '#1881B1',
    borderRadius: 40,
    height:height*0.05,
    width: width*0.85,
  },

  Maravillosa:{
    alignItems: 'center',
  },

  Central:{
    fontFamily: 'Sansation',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 30,
    lineHeight: 100,
    letterSpacing: 0.05,
    color: '#FFFFFF',
    opacity: 0.8,

  },

  Central2:{
    fontFamily: 'Sansation',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 15,
    lineHeight: 30,
    letterSpacing: 0.05,
    color: '#FFFFFF',
    opacity: 0.8,

  },

});
