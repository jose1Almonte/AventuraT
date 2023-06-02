import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const usersCollection = firestore().collection('users');
const usersCollection2 = firestore().collection('enterprise');
const packagesCollection = firestore().collection('package');

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
   responsibleName:string , location:string, description:string, vip:boolean) => {
    await usersCollection2.add({
      id: 0, // Inicializa el ID en 0
      nameEnterprise: nameEnterprise,
      responsibleName: responsibleName,
      location: location,
      description: description,
      rif:rif,
      vip:vip});
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

export const addPackage = async (id, name, availability, price, description, mainImageUrl, location, endDate, startDate, emailEnterprise, rating, expireDate) => {
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
          };

          await packagesCollection.doc(id.toString()).set(packageData);
          console.log('Paquete añadido exitosamente a Firestore');
        } catch (error) {
          console.error('Error al añadir el paquete a Firestore:', error);
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
