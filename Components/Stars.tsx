import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import star2 from '../vectores/star2';
import star from '../vectores/star';
import { PackageI } from '../models/package.interface';
import { checkStarsInFirestore, saveStarsToFirestore } from '../firebase/Firestore';

interface stars {
    counter: number;
    setCounter: React.Dispatch<React.SetStateAction<number>>;
    route?: any;
    data?: PackageI;
    turned?: boolean;
}

const StarField = ({counter,setCounter}:stars) => {
    const [cambia,setCambia] = useState(false);
    const change = async () => {
        if (cambia === true){
            setCambia(false);
            setCounter((prevCounter) => prevCounter - 1);
            console.log(counter);
        }
        else {
            setCambia(true);
            setCounter((prevCounter) => prevCounter + 1);
            console.log(counter);
        }
    };
        return (
            <View>
            {cambia === false && turned !== false ? (
                <TouchableOpacity onPress={change}>
                    <SvgXml xml={star2} width={22} height={22} />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity onPress={change}>
                    <SvgXml xml={star} width={22} height={22} />
                </TouchableOpacity>
            )}
            </View>
    );
};

interface starfinal {
    route?: any;
    data?: PackageI;
    counter: number;
    setCounter: any;
}

const Stars = ({counter,setCounter}:starfinal) => {

        return (
            <View style={styles.container}>
                <StarField counter={counter} setCounter={setCounter} prendido={}/>
                <StarField counter={counter} setCounter={setCounter} prendido1={}/>
                <StarField counter={counter} setCounter={setCounter} prendido2={}/>
                <StarField counter={counter} setCounter={setCounter} prendido3={}/>
                <StarField counter={counter} setCounter={setCounter} prendido4={}/>
            </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    }});
export default Stars;
