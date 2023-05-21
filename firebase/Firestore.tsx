import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage'

const usersCollection = firestore().collection('users');
const usersCollection2 = firestore().collection('enterprise');
const usersCollection3 = firestore().collection('package');
const storageRef = storage().ref()

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
    return !querySnapshot.empty;
};
    
export const addPackage = async (name: string, availability: string, price: string, description: string, url: string | null, location: string) => {
    await usersCollection3.add({
        name: name,
        availability: availability,
        price: price,
        description: description,
        mainImageUrl: url,
        location: location,
    })
}

export const checkPackage = async (name: string) => {
    const documentSnapshot = await usersCollection3.where('name', '==', name).get()
    return !documentSnapshot.empty
}

export const uploadImage = async (uploadUri: string, filename: string) => {
    const task = storageRef.child(`images/${filename}`).putFile(uploadUri);

    task.on('state_changed', taskSnapshot => {
        console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
    });
    
    task.then(async () => {
        const downloadURL = await storageRef.child(`images/${filename}`).getDownloadURL();
        console.log('Image uploaded to the bucket!', downloadURL);
        return downloadURL
    });

    return null;
}