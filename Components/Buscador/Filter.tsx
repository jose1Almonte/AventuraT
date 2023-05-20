import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import settings from '../../images/vectores/settings';

interface FilterButtonProps {
  onSelectFilter: (filter: string) => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ onSelectFilter }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('');

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
    onSelectFilter(filter);
    setIsMenuOpen(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleMenuToggle} style={styles.button}>
        <SvgXml xml={settings} />
      </TouchableOpacity>
      {isMenuOpen && (
        <View style={styles.menu}>
          <TouchableOpacity onPress={() => handleFilterSelect('nombre')} style={styles.menuItem}>
            <Text style={styles.menuItemText}>Nombre</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleFilterSelect('precio')} style={styles.menuItem}>
            <Text style={styles.menuItemText}>Precio</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleFilterSelect('ubicacion')} style={styles.menuItem}>
            <Text style={styles.menuItemText}>Ubicación</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleFilterSelect('descripcion')} style={styles.menuItem}>
            <Text style={styles.menuItemText}>Descripción</Text>
          </TouchableOpacity>
        </View>
      )}
      {selectedFilter !== '' && (
        <Text style={styles.selectedFilterText}>Filtro seleccionado: {selectedFilter}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  button: {
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  menu: {
    position: 'absolute',
    top: 40,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  menuItem: {
    paddingVertical: 4,
  },
  menuItemText: {
    color: 'black',
    fontSize: 16,
  },
  selectedFilterText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FilterButton;
