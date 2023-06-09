import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

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
        <Text style={styles.optionButtonText}>Montaña</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.optionButton1,
          selectedOption === 'Playa' && styles.selectedOption,
        ]}
        onPress={() => handleOptionPress('Playa')}
      >
        <Text style={styles.optionButtonText}>Playa</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.optionButton2,
          selectedOption === 'Full-Day' && styles.selectedOption,
        ]}
        onPress={() => handleOptionPress('Full-Day')}
      >
        <Text style={styles.optionButtonText}>Full-Day</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.optionButton3,
          selectedOption === 'Camping' && styles.selectedOption,
        ]}
        onPress={() => handleOptionPress('Camping')}
      >
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
  },
  optionButton: {
    backgroundColor: '#faa473',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  optionButton1: {
    backgroundColor: '#e4ed80',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  optionButton2: {
    backgroundColor: '#fc8b74',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  optionButton3: {
    backgroundColor: '#2d7ffa',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  selectedOption: {
    backgroundColor: '#2dfc7d',
  },
  optionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});


export default FourOptionsSelector;
