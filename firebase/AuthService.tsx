import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';

export const AuthService = () => {
    const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = auth().currentUser;

    if (!currentUser){
        setUser(currentUser);    }

  }, []);

  return (
    <View>
      {user && <Text>{user}</Text>}
    </View>
  );
};
