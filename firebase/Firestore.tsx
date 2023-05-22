import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const usersCollection = firestore().collection('users');
const usersCollection2 = firestore().collection('enterprise');
const packagesCollection = firestore().collection('package');

export const addUser = async (displayName:string,email:string, emailVerified:boolean,photoURL:string) => {
    await usersCollection.add({
        displayName: displayName,
        email: email,
        emailVerified: emailVerified,
        photoURL: photoURL});
};

export const updateUser = async (userId: string, displayName:string,email:string, emailVerified:boolean,photoURL:string) => {
    await usersCollection.doc(userId).set({
        displayName: displayName,
        email: email,
        emailVerified: emailVerified,
        photoURL: photoURL});
};


export const addEnterprise = async (enterpriseName:string, rif:string, personResponsible:string ) => {
    await usersCollection2.add({
        enterpriseName: enterpriseName,
        rif: rif,
        personResponsible: personResponsible});
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

export const addPackage = async (id, name, availability, price, description, mainImageUrl, location, date) => {
        try {
          const packageData = {
            id,
            name,
            availability,
            price,
            description,
            mainImageUrl,
            location,
            date,
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

  
}
