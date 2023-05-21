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

export const deleteDocumentByUserId = async (packageId) => {
    const querySnapshot = await usersCollection3.where('Name', '==', "team").get();
    firestore()
        .collection('package')
        // .where('id', '==', 2).get();
        .doc(packageId).delete();

    // await deleteDoc(doc(db, 'package', 'nbMDHMyb6y6GuIuNDPET'));
    // console.log(querySnapshot);
    // const res = await db.collection('package').doc('nbMDHMyb6y6GuIuNDPET').delete();

    // console.log(querySnapshot.docs[0]);
};
