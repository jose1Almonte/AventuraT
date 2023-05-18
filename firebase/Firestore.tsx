import firestore from '@react-native-firebase/firestore';

const usersCollection = firestore().collection('users');
const usersCollection2 = firestore().collection('enterprise');

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
