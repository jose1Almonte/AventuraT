import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

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
