import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

const FourOptionsSelector = ({ onSelect }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionPress = (option) => {
    setSelectedOption(option);
    onSelect(option);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.optionButton,
          selectedOption === 'Montaña' && styles.selectedOption,
        ]}
        onPress={() => handleOptionPress('Montaña')}
      >
        <Image
          style={styles.imageUsed}
          source={require('../images/mountain.png')}
        />
        <Text style={styles.optionButtonText}>Montaña</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.optionButton1,
          selectedOption === 'Playa' && styles.selectedOption,
        ]}
        onPress={() => handleOptionPress('Playa')}
      >
         <Image
          style={styles.imageUsed}
          source={require('../images/beach.png')}
        />
        <Text style={styles.optionButtonText}>Playa</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.optionButton2,
          selectedOption === 'Full-Day' && styles.selectedOption,
        ]}
        onPress={() => handleOptionPress('Full-Day')}
      >
         <Image
          style={styles.imageUsed}
          source={require('../images/night.png')}
        />
        <Text style={styles.optionButtonText}>Full-Day</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.optionButton3,
          selectedOption === 'Camping' && styles.selectedOption,
        ]}
        onPress={() => handleOptionPress('Camping')}
      >
         <Image
          style={styles.imageUsed}
          source={require('../images/tent.png')}
        />
        <Text style={styles.optionButtonText}>Camping</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:'3%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 16,
    fontFamily: 'Poppins-Medium',
    gap: 5
  },
  optionButton: {
    backgroundColor: '#05a454',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    width: 92
  },
  optionButton1: {
    backgroundColor: '#ffec5e',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    width: 92
  },
  optionButton2: {
    backgroundColor: '#fc8b74',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    width: 92
  },
  optionButton3: {
    backgroundColor: '#2d7ffa',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    width: 93
  },
  selectedOption: {
    backgroundColor: '#2dfc7d',
  },
  optionButtonText: {
    fontSize: 11,
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center'
  },
  imageUsed:{
    width: 40,
    height: 40,
    alignSelf: 'center'
  }
});


export default FourOptionsSelector;
