import firestore from '@react-native-firebase/firestore';

const usersCollection = firestore().collection('users');
const usersCollection2 = firestore().collection('enterprise');

export const addUser = async (userData:any) => {
    await usersCollection.add({
        displayName: userData.displayName,
        email: userData.email,
        emailVerified: userData.emailVerified,
        photoURL: userData.photoURL
      });
};

export const updateUser = async (userId: string, userData: any) => {
  await usersCollection.doc(userId).set({
    displayName: userData.displayName,
    email: userData.email,
    emailVerified: userData.emailVerified,
    photoURL: userData.photoURL});
};


export const addEnterprise = async (enterpriseData:any) => {
    await usersCollection2.add({
        enterpriseName: enterpriseData.enterpriseName,
        rif: enterpriseData.rif,
        personResponsible: enterpriseData.personResponsible});
};

export const updateEnterprise = async (enterpriseId: string, enterpriseData: any) => {
  await usersCollection2.doc(enterpriseId).set({
    enterpriseName: enterpriseData.enterpriseName,
    rif: enterpriseData.rif,
    personResponsible: enterpriseData.personResponsible});
};
