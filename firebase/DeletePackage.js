import firestore, {db, doc, deleteDoc} from '@react-native-firebase/firestore';

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
        firestore().collection('package').doc(doc.id).delete();
            console.log('Se borró el documento con el id = ', doc.id);
        });
    // console.log(querySnapshot);
    // const snapshot = await firestore().collection('package').get();

};
