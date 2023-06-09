import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import InputSearch from '../../Components/InputSearch';
import {ButtonOptions} from '../../Components/ButtonOptions';

const SearchScreen = () => {
  const [textColor, setTextColor] = useState<{[key: number]: string}>({}); // Estado para rastrear los colores de los textos

  const handleTextClick = (textId: number) => {
    const newColor = textColor[textId] === '#1881B1' ? '#323F4B' : '#1881B1'; // Cambiar el color del texto según el estado actual

    setTextColor(prevState => ({
      ...prevState,
      [textId]: newColor,
    }));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.info}>
        <View style={styles.topInfo}>
          <Text style={styles.txt}>Filtro de búsqueda</Text>
          <InputSearch />
        </View>

        <View style={styles.contenedorInfoTop}>
          <View style={styles.info2}>
            <Text style={styles.title}>Clasificar</Text>
            <TouchableOpacity
              style={styles.contenedorInfo}
              onPress={() => handleTextClick(1)}>
              <Text style={[styles.txtInfo, {color: textColor[1]}]}>
                Novedades
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.contenedorInfo}
              onPress={() => handleTextClick(2)}>
              <Text style={[styles.txtInfo, {color: textColor[2]}]}>
                Menor precio
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.contenedorInfo}
              onPress={() => handleTextClick(3)}>
              <Text style={[styles.txtInfo, {color: textColor[3]}]}>
                Mayor precio
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.contenedorInfo}
              onPress={() => handleTextClick(4)}>
              <Text style={[styles.txtInfo, {color: textColor[4]}]}>
                Mejor valorados
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.info3}>
            <Text style={styles.title}>Categoría</Text>
            <TouchableOpacity
              style={styles.contenedorInfo}
              onPress={() => handleTextClick(5)}>
              <Text style={[styles.txtInfo, {color: textColor[5]}]}>
                Montaña
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.contenedorInfo}
              onPress={() => handleTextClick(6)}>
              <Text style={[styles.txtInfo, {color: textColor[6]}]}>
                Playa
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.contenedorInfo}
              onPress={() => handleTextClick(7)}>
              <Text style={[styles.txtInfo, {color: textColor[7]}]}>
                Full-Day
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.contenedorInfo}
              onPress={() => handleTextClick(8)}>
              <Text style={[styles.txtInfo, {color: textColor[8]}]}>
                Camping
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.contenedorServicios}>
          <Text style={styles.title}>Servicios incluidos</Text>
          <View style={styles.contenedorInfo}>
            <Text style={styles.txtInfo}>Transporte privado</Text>
            <ButtonOptions />
          </View>
          <View style={styles.contenedorInfo}>
            <Text style={styles.txtInfo}>Comidas y refrigerios</Text>
            <ButtonOptions />
          </View>
          <View style={styles.contenedorInfo}>
            <Text style={styles.txtInfo}>Hidratación</Text>
            <ButtonOptions />
          </View>
          <View style={styles.contenedorInfo}>
            <Text style={styles.txtInfo}>Actividades recreativas</Text>
            <ButtonOptions />
          </View>
          <View style={styles.contenedorInfo}>
            <Text style={styles.txtInfo}>Guía y acompañamiento</Text>
            <ButtonOptions />
          </View>
          <View style={styles.contenedorInfo}>
            <Text style={styles.txtInfo}>Fotos y videos</Text>
            <ButtonOptions />
          </View>
          <View style={styles.contenedorInfo}>
            <Text style={styles.txtInfo}>Hospedaje</Text>
            <ButtonOptions />
          </View>
        </View>
        <View style={styles.contenedorPrecio}>
          <Text style={styles.title}>Escala de precios</Text>

          <View style={styles.contenedorPrecios}>
            <View style={styles.contenedorEscala}>
              <TextInput style={styles.txtInfo2} placeholder="Min." />
            </View>

            <View style={styles.contenedorEscala}>
              <TextInput style={styles.txtInfo2} placeholder="Máx." />
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.containerButton}>
          <View style={styles.container2}>
            <Text style={styles.txtInfo1}>Buscar</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  info: {
    flex: 1,
    display: 'flex',
    gap: 2,
  },
  topInfo: {
    marginTop: 60,
    alignItems: 'center',
    gap: 15,
  },
  info2: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 15,
    gap: 6,
    padding: 20,
  },
  info3: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    padding: 20,
    marginLeft: 15,
  },
  contenedorInfoTop: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  contenedorInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contenedorServicios: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    paddingLeft: 20,
    paddingRight: 20,
    marginLeft: 15,
  },
  contenedorPrecio: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    paddingLeft: 20,
    marginLeft: 15,
    marginTop: 15,
  },
  contenedorPrecios: {
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
  },
  contenedorEscala: {
    borderRadius: 4,
    width: 100,
    height: 45,
    borderColor: '#1881B1',
    borderWidth: 1,
  },
  containerButton: {
    display: 'flex',
    alignItems: 'center',
  },
  container2: {
    marginTop: 20,
    height: 42,
    width: 300,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1881B1',
  },
  txt: {
    color: 'black',
    fontSize: 22,
    fontFamily: 'Poppins-SemiBold',
  },
  title: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  txtInfo: {
    color: '#323F4B',
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
  },
  txtInfo1: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
  txtInfo2: {
    marginLeft: 10,
    color: '#323F4B',
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
  },
});
