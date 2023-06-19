import React, {Component, useEffect, useState} from 'react';
import {View, StyleSheet, Touchable, TouchableOpacity, TextInput, Text, Alert} from 'react-native';
import {SvgXml} from 'react-native-svg';
import search from '../vectores/search';
import settings from '../vectores/settings';
// import SearchBar from './SearchBar/SearchBar';
// import React, { useEffect, useState } from 'react';
// import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { NavigationProp } from '@react-navigation/native';
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
  navigation: NavigationProp<Record<string, object | undefined>>;
  setType: any;
  toggleMenu: any;
}

const FilterOptions = ({ setType, toggleMenu,navigation }: FilterOptionsProps) => {
  return (
    <View style={styles.filterOptionsBox}>
      <TouchableOpacity style={styles.optionsPills} onPress={() => { setType('name'); toggleMenu(); navigation.navigate('SearchResultScreen',{name: '', type: 'name'});}}>
        <Text>Nombre</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionsPills} onPress={() => { setType('description'); toggleMenu(); navigation.navigate('SearchResultScreen',{name: '', type: 'description'}); }}>
        <Text>Descripcion</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionsPills} onPress={() => { setType('location'); toggleMenu(); navigation.navigate('SearchResultScreen',{name: '', type: 'location'}); }}>
        <Text>Location</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionsPills} onPress={() => { setType('price'); toggleMenu(); navigation.navigate('SearchResultScreen',{name: '', type: 'price'}); }}>
        <Text>price</Text>
      </TouchableOpacity>
    </View>
  );
};

const SearchBar: React.FC<{  searchKeyword: string; setSearchKeyword: (text: string) => void; areYouInSearchResult: boolean, defaultValue: string, type: string, setType: any, navigation: NavigationProp<Record<string, object | undefined>>; }> = ({searchKeyword, setSearchKeyword, areYouInSearchResult, defaultValue, type, setType, navigation}) => {
  const [items, setItems] = useState<Item[]>([]);
  // const [searchKeyword, setSearchKeyword] = useState('');
  const [resultOffset, setResultOffset] = useState(0);
  // const [type, setType] = useState('name');
  const [isOpen, setIsOpen] = useState(false);
  const [doNotShow, setDoNotShow] = useState(true);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  // const [textInput, setTextInput] = useState('');
  // const defaultReallyValue = defaultValue;

  useEffect(() => {
    const fetchData = async () => {
      setItems([]);
      if (searchKeyword.trim() === '') {
        setItems([]);
        return;
      }
      const lowercaseKeyword = searchKeyword;
      const uppercaseKeyword = searchKeyword.charAt(0).toUpperCase() + searchKeyword.slice(1);

      const snapshot = await firestore()
        .collection('package')
        .where(type, '>=', uppercaseKeyword)
        .where(type, '<=', uppercaseKeyword + '\uf8ff')
        .orderBy(type)
        .get();

        const snapshot2 = await firestore()
        .collection('package')
        .where(type, '>=', lowercaseKeyword)
        .where(type, '<=', lowercaseKeyword + '\uf8ff')
        .orderBy(type)
        .get();

      const data2: Item[] = snapshot2.docs.map((doc) => ({
          id: doc.data().id,
          name: doc.data().name,
          description: doc.data().description,
      }));

      const data: Item[] = snapshot.docs.map((doc) => ({
        id: doc.data().id,
        name: doc.data().name,
        description: doc.data().description,
      }));

      setItems(data.concat(data2));
      setResultOffset(0);
    };

    fetchData();
  }, [searchKeyword, type]);

  const handleSearchKeywordChange = (text: string) => {
    setSearchKeyword(text);
    if (text === ''){
      setDoNotShow(false);
    }
    // Alert.alert(text);
  };

  const handleSearchKeywordChange2 = async (text: string) => {
    setType('name');
    setSearchKeyword(text);
    defaultValue = text;
    setDoNotShow(true);
    // Alert.alert(text);
    navigation.navigate('SearchResultScreen',{name: text, type: 'name'});
  };

  return (
    <>
      {isOpen ? (
        <FilterOptions setType={setType} toggleMenu={toggleMenu} navigation={navigation}/>
      ) : (
        <>
          <View style={styles.container}>
            {areYouInSearchResult ? (
              <>
              <TextInput value={searchKeyword} placeholder="Ingrese una palabra clave" onChangeText={handleSearchKeywordChange} style={styles.txt} />
              {/* <TextInput placeholder="Ingrese una palabra clave" value={searchKeyword} onChangeText={handleSearchKeywordChange} style={styles.txt}/> */}
              </>

            ) : (
              <TextInput placeholder="Ingrese una palabra clave" value={searchKeyword} onChangeText={handleSearchKeywordChange} style={styles.txt}/>
            )}

            {searchKeyword.trim() !== '' && (
              <View style={styles.resultsContainer}>
                <View style={{ height: resultOffset }} />
                {doNotShow === false && items.map((item, index) => (
                  <TouchableOpacity
                  onPress={() => handleSearchKeywordChange2(item.name)}
                    key={`${item.id}-${index}`}
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



export const InputSearch = ({navigation, areYouInSearchResult, defaultValue, searchKeyword, setSearchKeyword}:{navigation: any, areYouInSearchResult: boolean, defaultValue: any, searchKeyword: string, setSearchKeyword: any}) => {
  // const [searchKeyword, setSearchKeyword] = useState('');

  const inSearch = areYouInSearchResult;
  const [type, setType] = useState('name');

  const handleOnPressButtonSearch = async (inSearch) => {

    if (!inSearch){
      if (searchKeyword !== ''){
        navigation.navigate('SearchResultScreen',{name: searchKeyword, type: type});
      } else {
        // navigation.navigate('SearchResultScreen',{name: searchKeyword, type: type});
        Alert.alert('Campo vacío', 'Por favor escriba algo');
      }
    } else {
      // Alert.alert('Hola, ya estoy')
      navigation.navigate('SearchResultScreen',{name: searchKeyword, type: type});
    } // AQUI VA UN ELSE INDICANDO LO QUE HARA SI SE ENCUENTRA EN SearchResultScreen
  };

  return (
    <View style={styles.contenedor}>
      <View style={styles.buscador}>
        <View style={styles.barSizes}>
          <TouchableOpacity onPress={() => {handleOnPressButtonSearch(inSearch);}}>
          <SvgXml xml={search} />
          </TouchableOpacity>

          <View style={styles.settings}>
            <SearchBar searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} areYouInSearchResult={areYouInSearchResult} defaultValue={defaultValue} type={type} setType={setType} navigation={navigation}/>
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
    width: 355,
    height: 50,
    gap: 20,
  },
  barSizes: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  txt: {
    color: 'white',
    fontFamily: 'Poppins-medium',
    fontSize: 15,
  },
  settings:{
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  container: {
    height: '100%',
    width: '80%',
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
