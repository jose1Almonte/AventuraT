import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import settings from '../../vectores/settings';
import {Svg, SvgXml} from 'react-native-svg';

interface Item {
  id: string;
  name: string;
  description: string;
  location: string;
  price: string;
  type: string;
}

const {height, width} = Dimensions.get('window');

const SearchBar: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [resultOffset, setResultOffset] = useState(0);
  const [type, setType] = useState("name");
  const [isOpen, setIsOpen] = useState(false)
  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    const fetchData = async () => {
      if (searchKeyword.trim() === '') {
        setItems([]);
        return;
      }
      const snapshot = await firestore()
        .collection('package')
        .where(type, '>=', searchKeyword)
        .where(type, '<=', searchKeyword + '\uf8ff')
        .get();
      const data: Item[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        description: doc.data().description,
      }));
      setItems(data);
      setResultOffset(0); // Reiniciar el desplazamiento vertical al obtener nuevos resultados
    };
    fetchData();
  }, [searchKeyword, type]);
  const handleSearchKeywordChange = (text: string) => {
    setSearchKeyword(text);
  };

  return (
    <>
      <View>
        {isOpen && (
          <View>
            <TouchableOpacity style={styles.Redondos} onPress={() => { setType("name"); toggleMenu(); console.warn(type)}}>
                <Text>Nombre</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.Redondos} onPress={() => {setType("description"); toggleMenu(); console.warn(type)}}>
              <Text>Descripcion</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.Redondos} onPress={() => {setType("location");  toggleMenu(); console.warn(type)}}>
              <Text>Location</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.Redondos} onPress={() => {setType("price");  toggleMenu(); console.warn(type)}}>
              <Text>price</Text>
            </TouchableOpacity>
          </View>
        )}

      </View>
      
      <View style={styles.container}>

        <TextInput
          placeholder="Ingrese una palabra clave"
          value={searchKeyword}
          onChangeText={handleSearchKeywordChange}
          style={styles.txt}
        />
        {searchKeyword.trim() !== '' && (
          <View style={styles.resultsContainer}>
            <View style={{ height: resultOffset }} />
            {items.map((item, index) => (
              <View
                key={item.id}
                style={[
                  styles.resultItem,
                  { top: index * 30 }, // Espaciado vertical entre resultados
                ]}
              >
                <Text numberOfLines={1} style={styles.itemText}>
                  {item.name}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
        <TouchableOpacity onPress={() =>{toggleMenu()}}>
          <SvgXml xml={settings}/>  
        </TouchableOpacity>
    </>
  );
  
};
const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '75%',
  },
  txt: {
    width: '130%',
    color: "white",
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    zIndex: 999,
  },
  resultsContainer: {
    position: 'absolute',
    top: 50, // Ajusta según la posición deseada del primer resultado
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 998,
  },
  resultItem: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 30, // Altura de cada resultado
    paddingHorizontal: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
  },
  itemText: {
    color: 'white',
    fontSize: 16,
  },
  Redondos: {
    backgroundColor: '#1881B1',
    borderRadius: 100,
    height: height * 0.1,
    width: height * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Container2: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 150,
  },
});
export default SearchBar;

