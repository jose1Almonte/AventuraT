import React, {Component, useEffect, useState} from 'react';
import {View, StyleSheet, Touchable, TouchableOpacity, TextInput, Text, Alert} from 'react-native';
import {SvgXml} from 'react-native-svg';
import search from '../vectores/search';
import settings from '../vectores/settings';
// import SearchBar from './SearchBar/SearchBar';
// import React, { useEffect, useState } from 'react';
// import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
// import settings from '../../vectores/settings';
// import { SvgXml } from 'react-native-svg';

interface Item {
  id: string;
  name: string;
  description: string;
  location: string;
  price: string;
  type: string;
}

interface FilterOptionsProps {
  setType: any;
  toggleMenu: any;
}

const FilterOptions = ({ setType, toggleMenu }: FilterOptionsProps) => {
  return (
    <View style={styles.filterOptionsBox}>
      <TouchableOpacity style={styles.optionsPills} onPress={() => { setType('name'); toggleMenu(); }}>
        <Text>Nombre</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionsPills} onPress={() => { setType('description'); toggleMenu(); }}>
        <Text>Descripcion</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionsPills} onPress={() => { setType('location'); toggleMenu(); }}>
        <Text>Location</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionsPills} onPress={() => { setType('price'); toggleMenu(); }}>
        <Text>price</Text>
      </TouchableOpacity>
    </View>
  );
};

const SearchBar: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [resultOffset, setResultOffset] = useState(0);
  const [type, setType] = useState('name');
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  // const [textInput, setTextInput] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (searchKeyword.trim() === '') {
        setItems([]);
        return;
      }
      const uppercaseKeyword = searchKeyword.charAt(0).toUpperCase() + searchKeyword.slice(1);

      const snapshot = await firestore()
        .collection('package')
        .where(type, '>=', uppercaseKeyword)
        .where(type, '<=', uppercaseKeyword + '\uf8ff')
        .orderBy(type)
        .get();

      const data: Item[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        description: doc.data().description,
      }));
      setItems(data);
      setResultOffset(0);
    };

    fetchData();
  }, [searchKeyword, type]);

  const handleSearchKeywordChange = (text: string) => {
    setSearchKeyword(text);
    // Alert.alert(text);
  };

  return (
    <>
      {isOpen ? (
        <FilterOptions setType={setType} toggleMenu={toggleMenu} />
      ) : (
        <>
          <View style={styles.container}>
            <TextInput placeholder="Ingrese una palabra clave" value={searchKeyword} onChangeText={handleSearchKeywordChange} style={styles.txt}/>

            {searchKeyword.trim() !== '' && (
              <View style={styles.resultsContainer}>
                <View style={{ height: resultOffset }} />
                {items.map((item, index) => (
                  <TouchableOpacity
                  onPress={() => handleSearchKeywordChange(item.name)}
                    key={item.id}
                    style={[
                      styles.resultItem,
                      { top: index * 30 }, // Espaciado vertical entre resultados
                    ]}
                  >
                    <Text numberOfLines={1} style={styles.itemText}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          <TouchableOpacity onPress={toggleMenu}>
            <SvgXml xml={settings} />
          </TouchableOpacity>
        </>
      )}
    </>
  );
};



export const InputSearch = ({navigation}:{navigation: any}) => {
  return (
    <View style={styles.contenedor}>
      <View style={styles.buscador}>
        <View style={styles.barSizes}>
          <TouchableOpacity>
          <SvgXml xml={search} />
          </TouchableOpacity>

          <View style={styles.settings}>
            <SearchBar/>
            {/* <SvgXml xml={settings} /> */}
          </View>
        </View>
      </View>
    </View>
  );
};

// class InputSearch extends Component {
//   render() {
//     return (
//       <View style={styles.contenedor}>
//         <View style={styles.buscador}>
//           <View style={styles.barSizes}>
//             <SvgXml xml={search}  />
//             <View style={styles.settings}>
//               <SearchBar/>
//               {/* <SvgXml xml={settings} /> */}
//             </View>
//           </View>
//         </View>
//       </View>
//     );
//   }
// }

const styles = StyleSheet.create({
  contenedor: {
    alignItems: 'center',
    alignContent:'center',
    zIndex: 999,
  },
  buscador: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#1881B1',
    borderRadius: 25,
    width: 350,
    height: 60,
    gap: 20,
  },
  barSizes: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    gap:10,
  },
  txt: {
    color: 'white',
    fontFamily: 'Poppins-medium',
    fontSize: 16,
  },
  settings:{
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  container: {
    height: '100%',
    width: '75%',
  },
  txt2: {
    width: '130%',
    color: 'white',
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
    // backgroundColor: 'red',
    justifyContent: 'center',
  },
  itemText: {
    color: 'white',
    fontSize: 16,
  },
  optionsPills: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 5,
    marginBottom: '7%',
    height: '40%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '70%',
  },
  filterOptionsBox: {
    position: 'relative',
    // height: 90,
    // backgroundColor: 'red',
    // marginLeft: '80%',
    // paddingTop: 160,
    width: '75%',
    // zIndex: 999,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
});

export default InputSearch;
