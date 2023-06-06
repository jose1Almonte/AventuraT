// import firebase from '@react-native-firebase/app';
// import firestore from '@react-native-firebase/firestore';
import { usersCollection3 } from './DeletePackage';

export const searchPackagesByEmail = async (userEmail) => {

    const querySnapshot = ((await usersCollection3.where('emailEnterprise', '==', userEmail).get()));

    return querySnapshot;

};

export const searchPackagesExpiredByEmail = async (userEmail) => {

    const querySnapshot = ((await usersCollection3.where('expireDate', '<', new Date()).where('emailEnterprise', '==', userEmail).get()));

    return querySnapshot;

};


