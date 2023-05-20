import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

interface FilterItemProps {
  label: string;
  onSelectFilter: (filter: string) => void;
}

const FilterItem: React.FC<FilterItemProps> = ({ label, onSelectFilter }) => {
  const handleFilterSelect = () => {
    onSelectFilter(label);
  };

  return (
    <TouchableOpacity onPress={handleFilterSelect} style={styles.container}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginVertical: 4,
  },
  
  label: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FilterItem;
