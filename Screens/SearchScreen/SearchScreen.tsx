import {Text, View, StyleSheet} from 'react-native';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import vectorPerfil from '../../images/vectores/vectorPerfil';
import PhotoProfile from '../../Components/Profiles/photoProfile';
import EditProfileButton from '../../Components/Profiles/editProfileButton';
import VectorPerfilFlecha from '../../images/vectores/vectorPerfilFlecha';
import InputSearch from '../../Components/InputSearch';
import options from '../../images/vectores/options';

const SearchScreen = () => {
  return (
    <View style={styles.container}>
      {/* <View style={styles.fondo}>

      </View> */}
      <View style={styles.info}>
        <View style={styles.topInfo}>
          <Text style={styles.txt}>Filtro de búsqueda</Text>
          <InputSearch />
        </View>

        <View style={styles.contenedorInfoTop}>
          <View style={styles.info2}>
            <Text style={styles.title}>Clasificar</Text>
            <View style={styles.contenedorInfo}>
              <Text style={styles.txtInfo}>Novedades</Text>
              {/* <SvgXml xml={VectorPerfilFlecha} /> */}
            </View>
            <View style={styles.contenedorInfo}>
              <Text style={styles.txtInfo}>Menor precio</Text>
              {/* <SvgXml xml={VectorPerfilFlecha} /> */}
            </View>
            <View style={styles.contenedorInfo}>
              <Text style={styles.txtInfo}>Mayor precio</Text>
              {/* <SvgXml xml={VectorPerfilFlecha} /> */}
            </View>
            <View style={styles.contenedorInfo}>
              <Text style={styles.txtInfo}>Mejor valorados</Text>
              {/* <SvgXml xml={VectorPerfilFlecha} /> */}
            </View>
          </View>

          <View style={styles.info3}>
            <Text style={styles.title}>Categoría</Text>
            <View style={styles.contenedorInfo}>
              <Text style={styles.txtInfo}>Montaña</Text>
              {/* <SvgXml xml={VectorPerfilFlecha} /> */}
            </View>
            <View style={styles.contenedorInfo}>
              <Text style={styles.txtInfo}>Playa</Text>
              {/* <SvgXml xml={VectorPerfilFlecha} /> */}
            </View>
            <View style={styles.contenedorInfo}>
              <Text style={styles.txtInfo}>Full-day</Text>
              {/* <SvgXml xml={VectorPerfilFlecha} /> */}
            </View>
            <View style={styles.contenedorInfo}>
              <Text style={styles.txtInfo}>Camping</Text>
              {/* <SvgXml xml={VectorPerfilFlecha} /> */}
            </View>
          </View>
        </View>
        <View style={styles.contenedorServicios}>
          <Text style={styles.title}>Servicios incluidos</Text>
          <View style={styles.contenedorInfo}>
            <Text style={styles.txtInfo}>Full-day</Text>
            <SvgXml xml={options} />
          </View>
          <View style={styles.contenedorInfo}>
            <Text style={styles.txtInfo}>Comidas y refrigerios</Text>
            <SvgXml xml={options} />
          </View>
          <View style={styles.contenedorInfo}>
            <Text style={styles.txtInfo}>Hidratación</Text>
            <SvgXml xml={options} />
          </View>
          <View style={styles.contenedorInfo}>
            <Text style={styles.txtInfo}>Actividades recreativas</Text>
            <SvgXml xml={options} />
          </View>
          <View style={styles.contenedorInfo}>
            <Text style={styles.txtInfo}>Guía y acompañamiento</Text>
            <SvgXml xml={options} />
          </View>
          <View style={styles.contenedorInfo}>
            <Text style={styles.txtInfo}>Fotos y videos</Text>
            <SvgXml xml={options} />
          </View>
          <View style={styles.contenedorInfo}>
            <Text style={styles.txtInfo}>Hospedaje</Text>
            <SvgXml xml={options} />
          </View>
        </View>
        <View style={styles.contenedorPrecio}>
          <Text style={styles.title}>Escala de precios</Text>

          <View style={styles.contenedorPrecios}>
            <View style={styles.contenedorEscala}>
              <Text style={styles.txtInfo2}>Min.</Text>
            </View>
            <View style={styles.contenedorEscala}>
              <Text style={styles.txtInfo2}>Máx.</Text>
            </View>
          </View>
        </View>

        <View style={styles.containerButton}>
          <View style={styles.container2}>
            <Text style={styles.txtInfo1}>Buscar</Text>
          </View>
        </View>
      </View>
    </View>
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
    margin: 5
  },
  topInfo: {
    marginTop: 80,
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
    display: 'flex',
    borderRadius: 4,
    width: 90,
    height: 30,
    borderColor: '#1881B1',
    borderWidth: 1
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
    fontSize: 20,
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
