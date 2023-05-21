import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import storage, {deleteObject, ref} from '@react-native-firebase/storage';

// const db = getFirestore();

// export const deleteDocumentByUserId = async (campo, valor) => {
//   try {
//     // Crea una consulta para buscar documentos que cumplan con el criterio
//     const q = query(collection(db, 'package'), where(campo, '==', valor));

//     // Obtiene los documentos que cumplen con la consulta
//     const querySnapshot = await getDocs(q);

//     // Elimina los documentos encontrados
//     querySnapshot.forEach((doc) => {
//       deleteDoc(doc.ref);
//       console.log('Documento eliminado:', doc.id);
//       return true;
//     });
//   } catch (error) {
//     console.error('Error al eliminar el documento:', error);
//     return false;
//   }
// };

const usersCollection3 = firestore().collection('package');

export const deleteDocumentByUserId = async () => {

    const querySnapshot = ((await usersCollection3.where('date', '<', new Date()).get()));

    querySnapshot.forEach((doc) => {

        const image = doc.data().mainImageUrl;

        const imageRef = firebase.storage().refFromURL(image);

        console.log(image);
        console.log(imageRef);
        imageRef.delete().then(() => {console.log("La imagen se ha borrado correctamente.");}).catch((error) => {console.error("Error al borrar la imagen:", error);});

        firestore().collection('package').doc(doc.id).delete();
            console.log('Se borró el documento con el id = ', doc.id);
        });

};
