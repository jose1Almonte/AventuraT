import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import star2 from '../vectores/star2';
import star from '../vectores/star';
import { PackageI } from '../models/package.interface';
import { checkStarsInFirestore, saveStarsToFirestore } from '../firebase/Firestore';

interface StarProps {
  index: number;
  counter: number;
  setCounter: React.Dispatch<React.SetStateAction<number>>;
}

const StarField = ({ index, counter, setCounter }: StarProps) => {
  const handlePress = () => {
    setCounter(index);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <SvgXml xml={index <= counter ? star : star2} width={22} height={22} />
    </TouchableOpacity>
  );
};

interface StarsProps {
  counter: number;
  setCounter: React.Dispatch<React.SetStateAction<number>>;
}

const Stars = ({ counter, setCounter }: StarsProps) => {
  const stars = Array.from({ length: 5 }, (_, index) => index + 1);

  return (
    <View style={styles.container}>
      {stars.map((index) => (
        <StarField
          key={index}
          index={index}
          counter={counter}
          setCounter={setCounter}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});

export default Stars;
