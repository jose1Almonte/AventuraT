import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
// import { navigateToAdministrationPackagesScreen } from '../../Screens/AdministratePackagesScreen/AdministratePackagesScreen';



const EditPackageButton = ({navigation}) => {

  return (
    <View style={styles.containerButton}>
      <TouchableOpacity style={styles.container} onPress={() => {navigation.navigate('AdministratePackagesScreen');}}>
        <Text style={styles.txt}>Editar paquetes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  containerButton: {
    display: 'flex',
    alignItems: 'center',
  },
  container: {
    height: 40,
    width: 140,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1881B1',
    // backgroundColor: 'red',
  },
  txt: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
});

export default EditPackageButton;