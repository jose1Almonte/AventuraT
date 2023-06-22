import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import star2 from '../vectores/star2';
import star from '../vectores/star';
import { PackageI } from '../models/package.interface';
import { checkStarsInFirestore, saveStarsToFirestore } from '../firebase/Firestore';

interface StarProps {
  counter: number;
  setCounter: React.Dispatch<React.SetStateAction<number>>;
  route?: any;
  data?: PackageI;
}

const StarField = ({ counter, setCounter }: StarProps) => {
  const [cambia, setCambia] = useState(false);

  const change = async () => {
    try {
      if (cambia) {
        setCambia(false);
        setCounter((prevCounter) => prevCounter - 1);
        console.log(counter);
      } else {
        setCambia(true);
        setCounter((prevCounter) => prevCounter + 1);
        console.log(counter);
      }
    } catch {

    }
  };

  return (
    <View>
      {cambia ? (
        <TouchableOpacity onPress={change}>
          <SvgXml xml={star} width={22} height={22} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={change}>
          <SvgXml xml={star2} width={22} height={22} />
        </TouchableOpacity>
      )}
    </View>
  );
};

interface StarFinalProps {
  counter: number;
  setCounter: React.Dispatch<React.SetStateAction<number>>;
  route?: any;
  data?: PackageI;
}

const Stars = ({ counter, setCounter }: StarFinalProps) => {
  return (
    <View style={styles.container}>
      <StarField counter={counter} setCounter={setCounter} />
      <StarField counter={counter} setCounter={setCounter} />
      <StarField counter={counter} setCounter={setCounter} />
      <StarField counter={counter} setCounter={setCounter} />
      <StarField counter={counter} setCounter={setCounter} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});

export default Stars;
