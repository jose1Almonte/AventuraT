import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import storage, {deleteObject, ref} from '@react-native-firebase/storage';

export const usersCollection3 = firestore().collection('package');

export const deleteExpiredDocuments = async () => {

    const querySnapshot = ((await usersCollection3.where('expireDate', '<', new Date()).get()));

    querySnapshot.forEach((doc) => {

        const image = doc.data().mainImageUrl;

        const imageRef = firebase.storage().refFromURL(image);

        // console.log(image);
        console.log('imageRef: ', imageRef);
        imageRef.delete().then(() => {console.log("La imagen se ha borrado correctamente.");}).catch((error) => {console.error("Error al borrar la imagen:", error);});

        firestore().collection('package').doc(doc.id).delete();
            console.log('Se borró el documento con el id = ', doc.id);
        });

};

export const deleteAllByEmail = async (emailEnterprise) => {
    const querySnapshot = ((await usersCollection3.where('emailEnterprise', '==', emailEnterprise).get()));

    // console.log(querySnapshot);
    querySnapshot.forEach((doc) => {

        const image = doc.data().mainImageUrl;

        const imageRef = firebase.storage().refFromURL(image);

        // console.log(image);
        console.log('imageRef: ', imageRef);
        imageRef.delete().then(() => {console.log("La imagen se ha borrado correctamente.");}).catch((error) => {console.error("Error al borrar la imagen:", error);});

        firestore().collection('package').doc(doc.id).delete();
            console.log('Se borró el documento con el id = ', doc.id);
    });
};

export const deleteExpiredDocumentsByEmail = async (emailEnterprise) => {

    const querySnapshot = ((await usersCollection3.where('expireDate', '<', new Date()).where('emailEnterprise', '==', emailEnterprise).get()));

    // console.log(querySnapshot);
    querySnapshot.forEach((doc) => {

        const image = doc.data().mainImageUrl;

        const imageRef = firebase.storage().refFromURL(image);

        // console.log(image);
        console.log('imageRef: ', imageRef);
        imageRef.delete().then(() => {console.log("La imagen se ha borrado correctamente.");}).catch((error) => {console.error("Error al borrar la imagen:", error);});

        firestore().collection('package').doc(doc.id).delete();
            console.log('Se borró el documento con el id = ', doc.id);
        });

};

export const deleteSelectedPackage = async (packageId) => {
    const querySnapshot = ((await usersCollection3.where('id', '==', packageId).get()));

    querySnapshot.forEach((doc) => {

        const image = doc.data().mainImageUrl;

        const imageRef = firebase.storage().refFromURL(image);

        // console.log(image);
        console.log('imageRef: ', imageRef);
        imageRef.delete().then(() => {console.log("La imagen se ha borrado correctamente.");}).catch((error) => {console.error("Error al borrar la imagen:", error);});

        firestore().collection('package').doc(doc.id).delete();
            console.log('Se borró el documento con el id = ', doc.id);
    });
};

