import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import currentLog from './UserData';
import { useUser } from '../Context/UserContext';
import { useEffect } from 'react';
import { usersCollection3 } from './DeletePackage';
import React, { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Text } from 'react-native-svg';

const usersCollection = firestore().collection('users');
const usersCollection2 = firestore().collection('enterprise');
const packagesCollection = firestore().collection('package');
const paidPackages = firestore().collection('paidPackage');

export const addUser = async (array:string[],displayName:string,email:string, emailVerified:boolean,photoURL:string) => {
    await usersCollection.add({
        displayName: displayName,
        email: email,
        emailVerified: emailVerified,
        favorites:array,
        photoURL: photoURL});
};

export const updateUser = async (array:string[],userId: string, displayName:string,email:string, emailVerified:boolean,photoURL:string) => {
    await usersCollection.doc(userId).set({
        displayName: displayName,
        email: email,
        emailVerified: emailVerified,
        favorites:array,
        photoURL: photoURL});
};


export const addEnterprise = async (nameEnterprise:string, rif:string,
   responsibleName:string , location:string, description:string, vip:boolean, password:string, phoneNumber:string,urlPersonal:string,urlEmpresa:string) => {
    await usersCollection2.add({
      id: 0, // Inicializa el ID en 0
      nameEnterprise: nameEnterprise,
      responsibleName: responsibleName,
      location: location,
      description: description,
      rif:rif,
      vip:vip,
      password:password,
      phoneNumber:phoneNumber,
      urlPersonal:urlPersonal,
      urlEmpresa:urlEmpresa

    });
};

export const updateEnterprise = async (enterpriseId: string, enterpriseName:string, rif:string, personResponsible:string ) => {
    await usersCollection2.doc(enterpriseId).set({
        enterpriseName: enterpriseName,
        rif: rif,
        personResponsible: personResponsible});
};

export const getUser = async (userId: string) => {
    const documentSnapshot = await usersCollection.doc(userId).get();
    return { id: documentSnapshot.id, ...documentSnapshot.data() };
};

export const checkIfUserExists = async (email:string) => {
    const querySnapshot = await usersCollection.where('email', '==', email).get();
    return !querySnapshot.empty;};

export const addPackage = async (id, name, availability, price, description, mainImageUrl, location, endDate, startDate, emailEnterprise, rating, expireDate, isPublic, tipo) => {
        try {
          const packageData = {
            id,
            name,
            availability,
            price,
            description,
            mainImageUrl,
            location,
            endDate,
            startDate,
            emailEnterprise,
            // nameEnterprise,
            rating,
            expireDate,
            isPublic,
            tipo,
          };

          await packagesCollection.doc(id.toString()).set(packageData);
          console.log('Paquete añadido exitosamente a Firestore');
        } catch (error) {
          console.error('Error al añadir el paquete a Firestore:', error);
        }
      };

export const changePackageIsPublicValue = async (packageId: { toString: () => string | undefined; }, newIsPublic: boolean) => {

  try {
    await usersCollection3.doc(packageId?.toString()).update({
      isPublic: newIsPublic,
    });

    console.log('DONE: ', `isPublic was successfully changed to ${newIsPublic}`  );
  } catch (error){
    console.log(error);
  }

};

export const checkPackage = async (id) => {
        try {
          const packageDoc = await packagesCollection.doc(id.toString()).get();
          return packageDoc.exists;
        } catch (error) {
          console.error('Error al comprobar el paquete en Firestore:', error);
          return false;
        }
      };

      export const uploadImage = async (imagePath, filename) => {
        try {
          const response = await fetch(imagePath);
          const blob = await response.blob();
          const storageRef = storage().ref().child(filename);
          await storageRef.put(blob);
          const downloadUrl = await storageRef.getDownloadURL();
          return downloadUrl;
        } catch (error) {
          console.error('Error al subir la imagen a Firebase Storage:', error);
          return null;
        }
      };

export const getLastPackageId = async () => {
        try {
          const querySnapshot = await packagesCollection.orderBy('id', 'desc').limit(1).get();
          if (!querySnapshot.empty) {
            const lastPackage = querySnapshot.docs[0].data();
            return lastPackage.id;
          }
        } catch (error) {
          console.error('Error al obtener el último ID de paquete en Firestore:', error);
        }
      
        return 0; // Si no hay paquetes, devuelve 0 como último ID
};

export const getFavorites = async (email: string) => {
  const snapshot = await usersCollection.where("email", "==", email).limit(1).get()
  return snapshot.docs[0].data().favorites


};



export const getPackage = async (itemId) => {
  try {
    const documentSnapshot = await firestore()
      .collection('package')
      .doc(itemId)
      .get();

    if (documentSnapshot.exists) {
      const data = documentSnapshot.data();
      // Aquí puedes realizar cualquier transformación o ajuste necesario en los datos obtenidos
      return data;
    } else {
      throw new Error(`Package with ID ${itemId} does not exist.`);
    }
  } catch (error) {
    console.log(error);
    return null; // Si ocurre un error al obtener el paquete, puedes retornar null o un valor predeterminado adecuado.
  }

};

export const getPublicPackage = async (itemId) => {
  try {
    const querySnapshot = await firestore()
      .collection('package')
      .where('isPublic', '==', true)
      .get();

    const documentSnapshot = querySnapshot.docs.find(doc => doc.id === itemId);

    // const documentSnapshot = await firestore()
    //   .collection('package')
    //   .doc(itemId)
    //   .get();

    if (documentSnapshot && documentSnapshot.exists) {
      const data = documentSnapshot.data();
      // Aquí puedes realizar cualquier transformación o ajuste necesario en los datos obtenidos
      return data;
    } else {
      throw new Error(`Package with ID ${itemId} does not exist.`);
    }
  } catch (error) {
    console.log(error);
    return null; // Si ocurre un error al obtener el paquete, puedes retornar null o un valor predeterminado adecuado.
  }

};

export const getLastEnterpriseId = async () => {
  try {
    const querySnapshot2 = await usersCollection2.orderBy('id', 'desc').limit(1).get();
    if (!querySnapshot2.empty) {
      const lastPackage2 = querySnapshot2.docs[0].data();
      return lastPackage2.id;
    }
  } catch (error) {
    console.error('Error al obtener el último ID de paquete en Firestore:', error);
  }

  return 0; // Si no hay paquetes, devuelve 0 como último ID
};

export const checkEnterpriseExists = async (nameEnterprise) => {
    const enterprisesRef = usersCollection2;
    const snapshot = await enterprisesRef.where('nameEnterprise', '==', nameEnterprise).get();
    return !snapshot.empty;
};

export const checkResponsibleNameExists = async (responsibleName) => {
    const enterprisesRef = usersCollection2;
    const snapshot = await enterprisesRef.where('responsibleName', '==', responsibleName).get();
    return !snapshot.empty;
};

export const createUserWithEmailAndPassword = async (email, password, phoneNumber, photoURL,disName) => {
  try {
    const { user } = await auth().createUserWithEmailAndPassword(email, password);
    await user.updateProfile({
      photoURL,
      displayName:disName,
    });


  } catch (error) {
    // Manejar el error de creación de usuario
  }

};

export const checkPasswordCorrect = async (email, password) => {
  try {
    // Iniciar sesión con el correo electrónico y la contraseña
    await auth().signInWithEmailAndPassword(email, password);
    return true; // La contraseña es correcta
  } catch (error) {
    console.log('Error al verificar la contraseña:', error);
    return false; // La contraseña es incorrecta
  }
};

export const returnEnterpisePic = async (responsibleName) => {
  const enterprisesRef = usersCollection2;
  const snapshot = await enterprisesRef.where('responsibleName', '==', responsibleName).get();
  if (!snapshot.empty) {
    const enterpriseData = snapshot.docs[0].data();
    return enterpriseData;
  } else {
    return null;
  }
};

export const listPackage = async (responsibleName, searchingOnlyPublics) => {
  let query;

  if (searchingOnlyPublics){
    query = packagesCollection.where('emailEnterprise', '==', responsibleName).where('isPublic', '==', true);
  } else {
    query = packagesCollection.where('emailEnterprise', '==', responsibleName);

  }
  const querySnapshot = await query.get();
  const packages = [];
  querySnapshot.forEach((doc) => {
    const packageData = doc.data();
    packages.push(packageData);
  });

  return packages;
};

export const addPaidPackage = async (compradorMail, photoCompradorURL, id, name, availability, price, description, mainImageUrl, location, endDate, startDate, emailEnterprise, rating, expireDate,mobilePayment,nameEnterprise,photoURL) => {
  try {
    const packageData = {
      compradorMail,
      photoCompradorURL,
      id,
      name,
      availability,
      price,
      description,
      mainImageUrl,
      location,
      endDate,
      startDate,
      emailEnterprise,
      // nameEnterprise,
      rating,
      expireDate,
      mobilePayment,
      nameEnterprise,
      photoURL,
    };

    await paidPackages.add(packageData);
    console.log('Paquete añadido exitosamente a Firestore');
  } catch (error) {
    console.error('Error al añadir el paquete a Firestore:', error);
  }
};


export const listPaidPackage = async (id) => {
  const query = paidPackages.where('id', '==', id);
  const querySnapshot = await query.get();
  const packages = [];
  querySnapshot.forEach((doc) => {
    const packageData = doc.data();
    packages.push(packageData);
  });

  return packages;
};

export const listTipoPackage = async (id) => {
  const query = packagesCollection.where('tipo', '==', id).where('isPublic', '==', true);
  const querySnapshot = await query.get();
  const packages = [];
  querySnapshot.forEach((doc) => {
    const packageData = doc.data();
    packages.push(packageData);
  });

  return packages;
};


export const LoadingScreen = () => {

    return (
      <View style={styles.container}>
        <FastImage
          source={require('../images/cat-cute.gif')}
          style={styles.loadingGif}
          resizeMode="contain"
        />
      </View>
    );
  };

export const LoadingScreenTransparentBackground = () => {

    return (
      <View style={styles.containerTransparent}>
        <FastImage
          source={require('../images/cat-cute.gif')}
          style={styles.loadingGif}
          resizeMode="contain"
        />
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1DB5BE',
  },
  containerTransparent:{
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '100%',
    // backgroundColor: 'blackrgba(0, 0, 0, 0.36)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  loadingGif: {
    width: 60,
    height: 60,
  },
});
