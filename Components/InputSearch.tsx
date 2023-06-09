import React, {Component, useContext, useEffect, useState} from 'react';
import {View, StyleSheet, Touchable, TouchableOpacity, TextInput, Text, Alert, Animated} from 'react-native';
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
import { useNavigation } from '@react-navigation/native';
import { ValuesContext } from '../Context/ValuesContext';
import Gradient, { GradientDownToUp, hexToRGBA } from '../Layouts/Gradient';
import backFromFilter from '../vectores/backFromFilter';

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

export const FilterOptions = ({ setType, toggleMenu }: FilterOptionsProps) => {

  const {isOpen, setIsOpen} = useContext(ValuesContext);
  const [animation] = useState(new Animated.Value(1000));

  const closeFilterOptionsView = async () => {
    const toValue = 1000;
    const duration = 100;
    Animated.spring(animation, {
      toValue,
      duration,
      useNativeDriver: true, // Mejora el rendimiento de la animación
    }).start(() => {
    });
    setTimeout(() => {
      setIsOpen(false);
    }, 100);
    
  };

  useEffect(() => {
    const toValue = isOpen ? 60 : 1000;

    Animated.spring(animation, {
      toValue,
      useNativeDriver: true, // Mejora el rendimiento de la animación
    }).start();

  }, [isOpen, animation]);

  return (
    <View style={styles.backgroundFilterOptionsBox}>


      <Animated.View style = {[styles.filterOptionsBox, { transform: [{ translateY: animation }] }]}>
      <GradientDownToUp
          colors={[
            '#1DB5BE',
            hexToRGBA('#1DB5BE', 0.7),
            hexToRGBA('#1DB5BE', 0.6),
            hexToRGBA('#1DB5BE', 0.4),
            hexToRGBA('#1DB5BE', 0),

          ]}
          locations={[0, 0.3, 0.4, 0.8, 1]}
          style={styles.linearGradient}>
        <View style = {styles.miniFilterOptionsBox}>

          <View style = {styles.firstRowFilterOptionsBox}>
            <TouchableOpacity style={styles.backFromFilterBox} onPress={() => {closeFilterOptionsView();}}>
            <SvgXml xml={backFromFilter}/>
            {/* <Text>Back</Text> */}

            </TouchableOpacity>
          </View>
          <View style = {styles.secondRowFilterOptionsBox}>
            <TouchableOpacity style={styles.optionsPills} onPress={() => { setType('name');  closeFilterOptionsView(); }}>
              <Text style={styles.txtOptions}>Nombre</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionsPills} onPress={() => { setType('description');  closeFilterOptionsView(); }}>
              <Text style={styles.txtOptions}>Descripción</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionsPills} onPress={() => { setType('location');  closeFilterOptionsView(); }}>
              <Text style={styles.txtOptions}>Ubicación</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionsPills} onPress={() => { setType('price');  closeFilterOptionsView(); }}>
              <Text style={styles.txtOptions}>Precio</Text>
            </TouchableOpacity>

          </View>
        </View>
    </GradientDownToUp>
      </Animated.View>
    </View>
  );
};

const SearchBar: React.FC<{ searchKeyword: string; setSearchKeyword: (text: string) => void; areYouInSearchResult: boolean, defaultValue: string, type: string, setType: any }> = ({searchKeyword, setSearchKeyword, areYouInSearchResult, defaultValue, type, setType}) => {
  const navigation = useNavigation();
  const [items, setItems] = useState<Item[]>([]);
  // const [searchKeyword, setSearchKeyword] = useState('');
  const [resultOffset, setResultOffset] = useState(0);
  // const [type, setType] = useState('name');
  const { isOpen, setIsOpen, toggleMenu } = useContext(ValuesContext);
  const [doNotShow, setDoNotShow] = useState(false);
  
  // const toggleMenu = () => {
  //   setIsOpen(!isOpen);
  // };
  // const [textInput, setTextInput] = useState('');
  // const defaultReallyValue = defaultValue;

  useEffect(() => {
    setItems([]);
    const fetchData = async () => {
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
    
      // Eliminar duplicados
      const mergedData = [...data, ...data2];
      const uniqueData = mergedData.filter(
        (item, index, self) => index === self.findIndex((i) => i.id === item.id)
      );
    
      setItems(uniqueData);
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
    setItems([]);
    setType('name');
    setSearchKeyword(text);
    defaultValue = text;
    setDoNotShow(true);
    // Alert.alert(text);

  };

  const handleOnSubmitEditing = () => {
    if (searchKeyword.trim() !== '') {
      navigation.navigate('SearchResultScreen', { name: searchKeyword, type: type });
    } else {
      Alert.alert('Campo Vacío', 'Escriba su búsqueda');
    }
  };

  return (
    <>
      
        <>
          <View style={styles.container}>
            {areYouInSearchResult ? (
              <>
              <TextInput value={searchKeyword} placeholder="Ingrese una palabra clave" onChangeText={handleSearchKeywordChange} style={styles.txt} onSubmitEditing={handleOnSubmitEditing}/>
              {/* <TextInput placeholder="Ingrese una palabra clave" value={searchKeyword} onChangeText={handleSearchKeywordChange} style={styles.txt}/> */}
              </>

            ) : (
              <TextInput placeholder="Ingrese una palabra clave" value={searchKeyword} onChangeText={handleSearchKeywordChange} style={styles.txt} onSubmitEditing={handleOnSubmitEditing}/>
            )}

            {searchKeyword.trim() !== '' && (
              <View style={styles.resultsContainer}>
                <View style={{ height: resultOffset }} />
                {doNotShow === false && items.map((item, index) => (
                  <TouchableOpacity
                  onPress={() => {handleSearchKeywordChange2(item.name); navigation.navigate('SearchResultScreen', { name: searchKeyword, type: type }); }}
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
    </>
  );
};



export const InputSearch = ({navigation, type, setType, areYouInSearchResult, defaultValue, searchKeyword, setSearchKeyword}:{navigation: any, type: string, setType: any, areYouInSearchResult: boolean, defaultValue: any, searchKeyword: string, setSearchKeyword: any}) => {
  // const [searchKeyword, setSearchKeyword] = useState('');
  const inSearch = areYouInSearchResult;
  // const [type, setType] = useState('name');

  const handleOnPressButtonSearch = async (inSearch) => {

    if (!inSearch){
      if (searchKeyword !== ''){
        navigation.navigate('SearchResultScreen',{name: searchKeyword, type: type});
      } else {
        // navigation.navigate('SearchResultScreen',{name: searchKeyword, type: type});
        Alert.alert('El campo está vacío', 'Por favor escriba algo');
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
            <SearchBar searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} areYouInSearchResult={areYouInSearchResult} defaultValue={defaultValue} type={type} setType={setType}/>
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
  txtOptions: {
    // color: 'white',
    // fontFamily: 'Poppins-medium',
    // fontSize: 15,
    color: '#FFF',
    fontFamily: 'Poppins-medium',
    fontSize: 16,
    // marginLeft: 6,
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
    // backgroundColor: 'rgba(0,0,0,0.5)',
    // borderRadius: 5,
    // backgroundColor: hexToRGBA('#1DB5BE', 0.6),
    backgroundColor: hexToRGBA('#1881B1', 1),
    borderColor: hexToRGBA('#000000',0.5),
    borderWidth: 1,
    borderRadius: 15,
    // marginBottom: '7%',
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    marginVertical: '3%',
  },
  backgroundFilterOptionsBox: {
    position: 'absolute',
    // gap: 9,
    top: 0,
    bottom: 0,
    // height: 90,
    // backgroundColor: 'red',
    // marginLeft: '80%',
    // paddingTop: 160,
    width: '100%',
    // marginTop: '8%',
    // zIndex: 999,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: hexToRGBA('000000', 0.5),
    zIndex: 1,
    // backgroundColor: 'red',
  },

  
  filterOptionsBox:{
    width: '100%',
    height: 466,
    backgroundColor: hexToRGBA('#FFFFFF', 0.85),
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
    
  },
  
  linearGradient: {
    height: 466,
    width: '100%',
    // backgroundColor: hexToRGBA('#FFFFFF', 0.7),
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  miniFilterOptionsBox: {
    width: '90%',
    height: '95%',
    // backgroundColor: 'red',
    borderColor: hexToRGBA('#000000', 0.21),
    borderWidth: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,

  },

  firstRowFilterOptionsBox: {
    flex: 1,
    width:'100%',
    // backgroundColor: 'red',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

  secondRowFilterOptionsBox: {
    flex: 10,
    width:'100%',
    // backgroundColor: 'green',
    // justifyContent: 'center',
    paddingTop: '6%',
    alignItems: 'center',
  },
  backFromFilterBox:{
    // width: 5,
    // backgroundColor: 'yellow',
    height: '100%',
    aspectRatio: 1,
    marginRight: '2%',
  },

});

export default InputSearch;
