import auth from '@react-native-firebase/auth';

const currentLog = () => {
    const user = auth().currentUser;
    if (user) {
        return {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified,
            uid: user.uid,
            metadata: user.metadata,
        };
    } else {
        return null;
    }
};

export default currentLog;
