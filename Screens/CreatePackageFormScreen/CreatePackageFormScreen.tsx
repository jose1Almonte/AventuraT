// import { View, Text } from 'react-native';
import React from 'react';
import CreateForm from '../../Components/CreateForm';
import { NavigationProp } from '@react-navigation/native';

interface CreatePackageFormScreenProps{
    navigation: NavigationProp<Record<string, object | undefined>>,
}


const CreatePackageFormScreen = ({navigation}:CreatePackageFormScreenProps) => {

    return (
    <>
    <CreateForm navigation = {navigation}/>
    </>
  );
};

export default CreatePackageFormScreen;
