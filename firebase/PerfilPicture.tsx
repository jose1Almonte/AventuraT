import React, { useState } from 'react';
import currentLog from './UserData';
import auth from '@react-native-firebase/auth';
import { View, Button, Image,Text} from 'react-native';
import GmailRegister from './gmail';

const TuComponente = () => {
  const [user, setUser] = useState(currentLog());
  const [isLogged, setLogged] = useState(!!user);

  const logout = async () => {
    await auth().signOut();
    setUser(null);
    setLogged(false);
  };

  return (
    <View>
      {isLogged ? (
        <View>
            <Image source={{ uri: user?.photoURL || 'https://via.placeholder.com/150' }} style={{ width: 150, height: 150 }} />
            <Text>{user?.displayName || ''}</Text>
            <Button title="Logout" onPress={logout} />
        </View>
      ) : (
            <GmailRegister/>
      )}
    </View>
  );
};

export default TuComponente;