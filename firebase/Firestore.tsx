import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import auth, { firebase } from '@react-native-firebase/auth';
import currentLog from './UserData';
import { useUser } from '../Context/UserContext';
import { useEffect } from 'react';
import { usersCollection3 } from './DeletePackage';
import React, { useState } from 'react';
import { View, Image, StyleSheet, Alert } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Text } from 'react-native-svg';


const usersCollection = firestore().collection('users');
const usersCollection2 = firestore().collection('enterprise');
const packagesCollection = firestore().collection('package');
const paidPackages = firestore().collection('paidPackage');
const starsdb = firestore().collection('stars');

export const addUser = async (array: string[], displayName: string, email: string, emailVerified: boolean, photoURL: string, phoneNumber: string) => {
  await usersCollection.add({
    displayName: displayName,
    email: email,
    emailVerified: emailVerified,
    favorites: array,
    photoURL: photoURL,
    phoneNumber: phoneNumber
  });
};

export const updateUser = async (array: string[], userId: string, displayName: string, email: string, emailVerified: boolean, photoURL: string, phoneNumber: string) => {
  await usersCollection.doc(userId).set({
    displayName: displayName,
    email: email,
    emailVerified: emailVerified,
    favorites: array,
    photoURL: photoURL,
    phoneNumber: phoneNumber
  });
};


export const addEnterprise = async (nameEnterprise: string, rif: string,
  responsibleName: string, disName: string, location: string, description: string, vip: boolean, password: string, phoneNumber: string, urlPersonal: any, urlEmpresa: any) => {
  await usersCollection2.add({
    id: 0, // Inicializa el ID en 0
    nameEnterprise: nameEnterprise,
    responsibleName: responsibleName,
    disName: disName,
    location: location,
    description: description,
    rif: rif,
    vip: vip,
    password: password,
    phoneNumber: phoneNumber,
    urlPersonal: urlPersonal,
    urlEmpresa: urlEmpresa,
    vipCount: 0,
    isVIP: false,


  });
};

export const updateEnterprise = async (userId: string, enterpriseName: string, rif: string, personResponsible: string) => {
  await usersCollection2.doc(userId).set({
    enterpriseName: enterpriseName,
    rif: rif,
    personResponsible: personResponsible
  });
};

//para actualizar los datos del responsable de la empresa en la colección enterprise
export const fetchUserId = async (responsibleName: string) => {
  const querySnapshot = await usersCollection2.where('responsibleName', '==', responsibleName).get();
  if (querySnapshot.empty) {
    // No se encontró ningún documento con el correo electrónico especificado
    return null;
  }

  // Solo debería haber un documento con el correo electrónico especificado
  const doc = querySnapshot.docs[0];
  return doc.id;
};

//para actualizar los datos en la colección users
export const fetchUserId2 = async (email: string) => {
  const querySnapshot = await usersCollection.where('email', '==', email).get();
  if (querySnapshot.empty) {
    // No se encontró ningún documento con el correo electrónico especificado
    return null;
  }

  // Solo debería haber un documento con el correo electrónico especificado
  const doc = querySnapshot.docs[0];
  return doc.id;
};

export const updateResponsibleData = async (
  userId: string,
  data: { responsibleEmail?: string; phoneNumber?: string; name?: string }
) => {
  await usersCollection2.doc(userId).update(data);
};

export const updateDataUser = async (
  userId: string,
  data: { email?: string; phoneNumber?: string; name?: string }
) => {
  await usersCollection.doc(userId).update(data);
};

export const getUser = async (userId: string) => {
  const documentSnapshot = await usersCollection.doc(userId).get();
  return { id: documentSnapshot.id, ...documentSnapshot.data() };
};

export const checkIfUserExists = async (email: string) => {
  const querySnapshot = await usersCollection.where('email', '==', email).get();
  return !querySnapshot.empty;
};

export const addPackage = async (id: any, name: any, availability: any, price: any, description: any, mainImageUrl: any, location: any, endDate: any, startDate: any, emailEnterprise: any, rating: any, expireDate: any, isPublic: any, tipo: any,userList:[String]) => {
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
      vip: false,
      userList,
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

    console.log('DONE: ', `isPublic was successfully changed to ${newIsPublic}`);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }

};

export const changePackageValues = async (packageId: { toString: () => string | undefined; }, packageDescription: string, packageTipo: any) => {
  try {
    await usersCollection3.doc(packageId?.toString()).update({
      description: packageDescription,
      tipo: packageTipo,
    });
    console.log('DONE: ', `package Values were successfully changed to: description: ${packageDescription}  & tipo: ${packageTipo}`)
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const checkPackage = async (id: any) => {
  try {
    const packageDoc = await packagesCollection.doc(id.toString()).get();
    return packageDoc.exists;
  } catch (error) {
    console.error('Error al comprobar el paquete en Firestore:', error);
    return false;
  }
};

export const uploadImage = async (imagePath: any, filename: any) => {
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



export const getPackage = async (itemId: any) => {
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

export const getPublicPackage = async (itemId: any) => {
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

export const checkEnterpriseExists = async (nameEnterprise: any) => {
  const enterprisesRef = usersCollection2;
  const snapshot = await enterprisesRef.where('nameEnterprise', '==', nameEnterprise).get();
  return !snapshot.empty;
};

export const checkResponsibleNameExists = async (responsibleName: any) => {
  const enterprisesRef = usersCollection2;
  let snapshot = await enterprisesRef.where('responsibleName', '==', responsibleName).get();

  if (snapshot.empty) {
    responsibleName = responsibleName.charAt(0).toUpperCase() + responsibleName.slice(1);
    snapshot = await enterprisesRef.where('responsibleName', '==', responsibleName).get();
  }

  // console.log('SNAPSHOT: ',snapshot);
  return !snapshot.empty;
};

export const checkUserExist = async (email: any) => {
  try {
    const usersRef = firebase.firestore().collection('users');
    const snapshot = await usersRef.where('email', '==', email).get();

    if (!snapshot.empty) {
      const userData = snapshot.docs[0].data();
      return userData;
    } else {
      return null;
    }
  } catch (error) {
    console.log('Error retrieving user data:', error);
    return null;
  }
};

export const createUserWithEmailAndPassword = async (email: any, password: any, phoneNumber: any, photoURL: any, disName: any) => {
  try {
    const { user } = await auth().createUserWithEmailAndPassword(email, password);
    await user.updateProfile({
      photoURL,
      displayName: disName,
    });


  } catch (error) {
    // Manejar el error de creación de usuario
  }

};

export const checkPasswordCorrect = async (email: any, password: any) => {
  try {
    // Iniciar sesión con el correo electrónico y la contraseña
    await auth().signInWithEmailAndPassword(email, password);
    return true; // La contraseña es correcta
  } catch (error) {
    console.log('Error al verificar la contraseña:', error);
    return false; // La contraseña es incorrecta
  }
};

export const returnEnterpisePic = async (responsibleName: any) => {
  const enterprisesRef = usersCollection2;
  let snapshot = await enterprisesRef.where('responsibleName', '==', responsibleName).get();
  if (snapshot.empty) {
    responsibleName = responsibleName.charAt(0).toUpperCase() + responsibleName.slice(1);
    snapshot = await enterprisesRef.where('responsibleName', '==', responsibleName).get();
    console.log('Correo', responsibleName)
  }
  if (!snapshot.empty) {
    const enterpriseData = snapshot.docs[0].data();
    return enterpriseData;
  } else {
    return null;
  }
};

export const listPackage = async (responsibleName: any, searchingOnlyPublics: any) => {
  let query;

  if (searchingOnlyPublics) {
    query = packagesCollection.where('emailEnterprise', '==', responsibleName).where('isPublic', '==', true);
  } else {
    query = packagesCollection.where('emailEnterprise', '==', responsibleName);

  }
  const querySnapshot = await query.get();
  const packages: any[] = [];
  querySnapshot.forEach((doc) => {
    const packageData = doc.data();
    packages.push(packageData);
  });

  return packages;
};

export const addPaidPackage = async (compradorMail: any, photoCompradorURL: any, id: any, name: any, availability: any, price: any, description: any, mainImageUrl: any, location: any, endDate: any, startDate: any, emailEnterprise: any, rating: any, expireDate: any, mobilePayment: any, nameEnterprise: any, photoURL: any, status: any) => {
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
      rating,
      expireDate,
      mobilePayment,
      nameEnterprise,
      photoURL,
      status
    };

    await paidPackages.add(packageData);
    console.log('Paquete añadido exitosamente a Firestore');
  } catch (error) {
    console.error('Error al añadir el paquete a Firestore: ', error);
  }
};

export const updatePaidPackage = async (id: string, status: string, newRef?: any) => {
  if (newRef) {
    await paidPackages.doc(id).update({
      status: status,
      mobilePayment: newRef
    });
  } else {
    await paidPackages.doc(id).update({
      status: status
    });
  }

};


export const listPaidPackage = async (id: any) => {
  const query = paidPackages.where('id', '==', id);
  const querySnapshot = await query.get();
  const packages: any[] = [];
  querySnapshot.forEach((doc) => {
    const packageData = doc.data();
    packages.push(packageData);
  });

  return packages;
};

export const listTipoPackage = async (id: any) => {
  const query = packagesCollection.where('tipo', '==', id).where('isPublic', '==', true);
  const querySnapshot = await query.get();
  const packages: any[] = [];
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
  containerTransparent: {
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

export const getPopularPackages = async () => {
  const packages: any[] = [];
  let query = await packagesCollection.where("vip", "==", true).where("isPublic", "==", true).limit(3).get();
  query.docs.forEach((rawData, idx) => {
    packages.push(rawData.data());
  })
  return packages;
}

export const getAllPopularPackages = async (count:any) => {
  const packages: any[] = [];
  let query = await packagesCollection.where("vip", "==", true).where("isPublic", "==", true).limit(count).get();
  query.docs.forEach((rawData, idx) => {
    packages.push(rawData.data());
  })
  return packages;
}

export const changePremium = async (email: any) => {
  const getDoc = await usersCollection2.where("responsibleName", "==", email).get();
  const id = getDoc.docs[0].id;
  const count = getDoc.docs[0].data().vipCount;
  usersCollection2.doc(id).update({
    isVIP: true,
    vipCount: count + 5,
  })

}

export const checkVIP = async (email: any) => {
  const getDoc = await usersCollection2.where("responsibleName", "==", email).get();
  const isVIP = getDoc.docs[0].data().isVIP;
  return isVIP;
}

export const getCount = async (email: any) => {
  const getDoc = await usersCollection2.where("responsibleName", "==", email).get();
  const count = getDoc.docs[0].data().vipCount;
  return count;
}

export const makeRegular = async (packageId: any, email: any) => {
  try {
    const getDoc = await usersCollection2.where('responsibleName', '==', email).get();
    const enterpriseId = getDoc.docs[0].id;
    let count = getDoc.docs[0].data().vipCount + 1;

    usersCollection2.doc(enterpriseId).update({
      vipCount: count,
    });

    packagesCollection.doc(packageId.toString()).update({
      vip: false,
    });
    return true;


  } catch (error){
    return false;
  }
};

export const makeVIP = async (packageId: any, email: any) => {

  try {
    const getDoc = await usersCollection2.where('responsibleName', '==', email).get();
    const enterpriseId = getDoc.docs[0].id;
    let count = getDoc.docs[0].data().vipCount - 1;
    console.log("COUNT ES:",count);

    await usersCollection2.doc(enterpriseId).update({
      vipCount: count,
    });

    await packagesCollection.doc(packageId.toString()).update({
      vip: true,
    });

    return true;


  } catch (error) {
    
    console.log("a", error);
    return false;
  }
};

export const purgarHistory = async (ids: string[]) => {
  const packageRefs = ids.map(id => firestore().collection('paidPackage').doc(id));

  const updatePromises = packageRefs.map(async ref => {
    const doc = await ref.get();
    const status = doc.data()?.status;
    console.log(status);
    if (status === 'C') {
      return ref.update({
        status: 'QC',
      });}
    if (status === 'R'){
      return ref.update({
        status: 'Q',
      });
    } else {
      // Si el estado no es 'R', no se actualiza el documento
      return Promise.resolve();
    }
  });


  try {
    await Promise.all(updatePromises);
    console.log('Paquetes actualizados exitosamente');
  } catch {
  }
};

export const saveStarsToFirestore = async (counter: any, name: any, email: any) => {
  await starsdb.add({
    counter,
    name,
    email,
  })
    .then(() => {
      console.log('Datos guardados en Cloud Firestore');
    })
    .catch();
};

export const checkStarsInFirestore = async (email: any, name: any) => {
  try {
    const querySnapshot = await starsdb.where('email', '==', email)
      .where('name', '==', name)
      .get();

    if (!querySnapshot.empty) {
      // @ts-ignore
      return querySnapshot[0];
    } else {
      return null;
    }
  } catch (error) {
  }
};

export const updateProfile = async (displayName: string, photoURL: string) => {
  const user = firebase.auth().currentUser;

  if (user) {
    try {
      await user.updateProfile({
        displayName,
        photoURL,
      });
      Alert.alert('ACTUALIZADO', 'Perfil actualizado con éxito');
    } catch (error) {
      Alert.alert('ERROR', 'Error al actualizar el perfil:');
    }
  }
};

export const updateUserDataByEmail = async (email: string, displayName: string, photoURL: string, phoneNumber: string) => {
  try {
    const querySnapshot = await usersCollection.where('email', '==', email).get();
    if (querySnapshot.size > 0) {
      const doc = querySnapshot.docs[0];
      await doc.ref.update({
        displayName,
        photoURL,
        phoneNumber
      });
      console.log('Datos de usuario actualizados con éxito');
    } else {
      console.log('No se encontró ningún usuario con el correo electrónico proporcionado');
    }
  } catch { }
};


export const updateEnterpriseDataByEmail = async (responsibleName: string, photoURL: string, location: string, password: string, description: string, phoneNumber: string) => {
  try {
    const querySnapshot = await usersCollection2.where('responsibleName', '==', responsibleName).get();
    if (querySnapshot.size > 0) {
      const doc = querySnapshot.docs[0];
      await doc.ref.update({
        location: location,
        urlEmpresa: photoURL,
        password: password,
        description: description,
        phoneNumber: phoneNumber,
      });
      console.log('Datos de usuario actualizados con éxito');
    } else {
      console.log('No se encontró ningún usuario con el correo electrónico proporcionado');
    }
  } catch { }
};

export const updateRaitingEnterprise = async (email: string, feedback: any) => {
  try {
    const querySnapshot = await usersCollection2.where('responsibleName', '==', email).get();
    let enterprise: any = querySnapshot.docs[0];
    let feedbacks: any[] | undefined = enterprise.data().feedback;

    if (feedbacks) {
      feedbacks.push(feedback);
      usersCollection2.doc(enterprise.id).update({ feedback: feedbacks });
    } else {
      let tempF: any[] = [feedback];
      usersCollection2.doc(enterprise.id).update({ feedback: tempF });
    }
  } catch { }
};

export const updateRaitingPackage = async (packageId: string, nuevoRating: number, user: any) => {
  try {
    const packageRef = firebase.firestore().collection('package').doc(packageId);

    const packageDoc = await packageRef.get();
    const ratingsArray = packageDoc.data()?.rating ?? [];
    const userArray = packageDoc.data()?.userList ?? [];

    const updatedRatings = [...ratingsArray, nuevoRating];
    const updatedUsers = [...userArray, user];

    await packageRef.update({
      rating: updatedRatings,
      userList: updatedUsers,
    });

    console.log('El nuevo rating se agregó correctamente');
  } catch {
  }
};


export const checkUserInPackage = async (packageId: string, userEmail: string) => {
  const packageRef = firebase.firestore().collection('package').doc(packageId);

  return packageRef.get().then((doc) => {
    if (doc.exists) {
      const userList = doc.data().userList || [];

      if (userList.includes(userEmail)) {
        return { exists: true, message: `El usuario ${userEmail} está en la lista de usuarios del paquete con ID ${packageId}` };
      } else {
        return { exists: false, message: `El usuario ${userEmail} NO está en la lista de usuarios del paquete con ID ${packageId}` };
      }
    } else {
      return { exists: false, message: `El paquete con ID ${packageId} no existe en Firestore` };
    }
  }).catch((error) => {
    console.error(`Error al obtener el paquete con ID ${packageId}:`, error);
    throw error;
  });
};


export const verificarUsuario = async (packId: string, userId: string) =>{
  try {
    const packageRef = firestore().collection('package').doc(packId);
    const packageDoc = await packageRef.get();

    if (packageDoc.exists) {
      const usuarios = packageDoc.data()?.userList || [];

      if (usuarios.includes(userId)) {
        console.log('El usuario existe en el array.');
        return false;
      } else {
        console.log('El usuario no existe en el array.');
        return true;
      }
    } else {
      console.log('El documento no existe.');
      return false;
    }
  } catch (error) {
    console.log('Error al verificar el usuario:', error);
    return false;
  }
};

export const actualizarAvailabilityMinus = async (idPack) => {
  try {
    const packageRef = firebase.firestore().collection('package').doc(idPack);
    await packageRef.update({
      availability:  firebase.firestore.FieldValue.increment(-1),
    });
  } catch {
  }
};

export const actualizarAvailabilityPlus = async (idPack) => {
  try {
    const packageRef = firebase.firestore().collection('package').doc(idPack);
    await packageRef.update({
      availability:  firebase.firestore.FieldValue.increment(1),
    });
  } catch {
  }
};
