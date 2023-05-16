import { View ,ScrollView, Text, StyleSheet, PixelRatio , Dimensions, BackHandler} from 'react-native';
import React, { useEffect } from 'react';
//import RegisterEnterprise from '../../Components/registerEnterprise';
import YourSignInWithGoogleComponent from '../../firebase/PerfilPicture';
import RegisterEnterprise from '../../Components/registerEnterprise';
import { Image } from 'react-native';
//import UserProfileScreen from '../UserProfileScreen/UserProfileScreen';
//import UserProfileScreen from '../BusinessProfileScreen/BusinessProfileScreen';

const{height,width} = Dimensions.get('window');

const pixelSize2 = PixelRatio.getPixelSizeForLayoutSize(700);

const HomeScreen = () => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);
    return () => backHandler.remove();
  }, []);
  return (
    <ScrollView style={styles.backGround}>
      <View style={styles.flex}>
        <View style={styles.Header}>
          <View style={styles.Space}>
            <Text style={styles.Central2}>  MENU</Text>
          </View>
          <View style={styles.Space}>
            <Text style={styles.Central}>   AventuraT </Text>
          </View>
          <View style={styles.Space}>
            <YourSignInWithGoogleComponent/>
          </View>
        </View>
      </View>
      <View style={styles.Maravillosa}>
        <Text style={styles.Buscador}>  </Text>
      </View>
      <View style={styles.Container2}>
        <View style={styles.Caracteristicas}>
          <View style={styles.Sepa}>
            <View style={styles.Redondos}><Image style={styles.Escalado} source={require('../../images/tt.jpg')}></Image></View>
          </View>
          <View style={styles.Sepa}>
            <View style={styles.Redondos}><Image style={styles.Escalado} source={require('../../images/mas.jpg')}></Image></View>
          </View>
          <View style={styles.Sepa}>
            <View style={styles.Redondos}><Image style={styles.Escalado} source={require('../../images/para.jpg')}></Image></View>
          </View >
          <View style={styles.Sepa}>
            <View style={styles.Redondos}><Image style={styles.Escalado} source={require('../../images/lol.jpg')}></Image></View>
          </View>
        </View>
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

  Sepa:{
    padding:4,
  },
  Space:{
    padding:8,

  },
  


  Escalado:{
    width:width*0.14,
    height:height*0.07,
  },

  flex:{
    flex:1,
    alignItems:'center',

  },

  Container2:{
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  Header:{
    alignItems:'center',
    flexDirection:'row',
    justifyContent: 'space-between',
  },

  Buscador:{
    backgroundColor: '#1881B1',
    borderRadius: 40,
    height:height*0.07,
    width: width*0.88,
  },

  Caracteristicas:{
    height:height*0.07,
    width: width*0.88,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  Redondos:{
    backgroundColor: '#1881B1',
    borderRadius: 100,
    height: height*0.10,
    width: height*0.10,
    justifyContent: 'center',
    alignItems: 'center',
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
