import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
// import firestore from '@react-native-firebase/firestore';
// import auth from '@react-native-firebase/auth';
import { useUser } from '../../Context/UserContext';
import { getFavorites,  getPublicPackage, LoadingScreenTransparentBackground } from '../../firebase/Firestore';
import { Background } from '../../Layouts/Background';

const FavoriteScreen = () => {
  // const [loadingFavorites, setLoadingFavorites] = useState(true);
  const [favorites, setFavorites] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [packages, setPackages] = useState<Record<string, any>>({}); // Tipo de datos para el estado 'packages'
  const { user } = useUser();
  // const [showContent, setShowContent] = useState(false); // Variable de estado para controlar la visibilidad del contenido


  const [loadingSomeThing, setLoadingSomeThing] = useState(false);

  useEffect(() => {
    const conseguirFavoritos = async () => {
      setLoadingSomeThing(true);
      const email = user.email;
      const fav = await getFavorites(email);
      setFavorites(fav);
      // setLoadingFavorites(false);
      setLoadingSomeThing(false);
    };
    // setLoadingFavorites(true); // Establece el estado a true al iniciar la carga de favoritos
    conseguirFavoritos();
  }, [user.email]);

  useEffect(() => {
    const fetchPackages = async () => {
      const packageData: Record<string, any> = {}; // Tipo de datos para 'packageData'
      for (const item of favorites) {
        const packageInfo = await getPublicPackage(item);
        if (packageInfo) {
          packageData[item] = packageInfo;
        }
      }
      setPackages(packageData);
      // setLoading(false); // Marca la carga como completa
    };

    fetchPackages();
  }, [favorites]);

  // useEffect(() => {
  //   // Muestra el contenido después de 3 segundos
  //   const timer = setTimeout(() => {
  //     setShowContent(true);
  //   }, 3000);

  //   return () => clearTimeout(timer); // Limpia el temporizador al desmontar el componente
  // }, []);

  // if (loadingFavorites || loading || !showContent) {
  //   return <LoadingScreen />;
  // }

  return (
    <>
      {loadingSomeThing && (
        <LoadingScreenTransparentBackground/>
      )}

      <ScrollView style={styles.container}>
        <View style={styles.titleBox}>
          <Text style={styles.title}>Paquetes favoritos</Text>
        </View>
        {favorites.length === 0 ? (
          <>
          <Text style={styles.noFavoritesText}>NO TIENES PAQUETES FAVORITOS</Text>
          <Image
            style={styles.imageUsed}
            source={require('../../images/favorites.png')}
          />
          </>
        ) : (
          <View style={styles.cardContainer}>
            {favorites.map((esteitem) => {
              if (packages[String(esteitem)]) {
                return (
                  <View key={esteitem} style={styles.card}>
                    <Background style={styles.containerPhotoPack} image={{uri: packages[String(esteitem)]?.mainImageUrl}}>

                    <View style={styles.layer}>

                      <View style = {styles.firstBox}>
                        <View style={styles.textBox}>

                          {/* <Text style={styles.name}>Nombre:</Text> */}
                          <Text style={styles.name} >{packages[String(esteitem)]?.name}</Text>
                        </View>
                        <View style={styles.textBox}>

                          {/* <Text style={styles.description}>Descripción:</Text> */}
                          <Text style={styles.description} >{packages[String(esteitem)]?.description}</Text>
                        </View>
                        <View style={styles.textBox}>

                          {/* <Text style={styles.price}>Precio:</Text> */}
                          <Text style={styles.price} >${packages[String(esteitem)]?.price}</Text>
                        </View>

                      </View>

                      <View style = {styles.secondBox}>
                        <Image style={styles.rightImage} source={{uri: packages[String(esteitem)]?.mainImageUrl}}/>

                      </View>

                      {/* <Image
                        style={styles.containerPhotoPack}
                        source={{
                          uri: packages[String(esteitem)]?.mainImageUrl,
                        }}
                        /> */}
                    </View>
                    </Background>
                  </View>
                );
              }
              return null; // Omitir tarjeta si no se encuentra el índice
            })}
          </View>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1DB5BE',
    padding: 16,
  },
  titleBox:{
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#FFF',
  },
  noFavoritesText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  cardContainer: {
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    height: 130,
    marginBottom: 16,
    overflow: 'hidden',
  },
  imageUsed: {
    marginTop: 40,
    width: 350,
    height: 350,
    alignSelf: 'center',
  },
  name: {
    fontSize: 15,
    width: '100%',
    marginTop: 4,
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
  },
  description: {
    fontSize: 14,
    width: '100%',
    height: '115%',
    color: 'black',
    fontFamily: 'Poppins-Regular',
  },
  price: {
    marginTop: 6,
    fontSize: 15,
    alignSelf: 'center',
    width: '100%',
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
  },
  containerPhotoPack: {
    flex: 1,
  },
  layer:{
    backgroundColor: 'rgba(255,255,255,0.9)',
    width: '100%',
    flex: 1,
    flexDirection: 'row',
  },
  firstBox:{
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4
  },
  textBox:{
    width: '90%',
    height: 37,
    flexDirection: 'row',
    justifyContent:'space-between',
  },
  secondBox:{
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  rightImage:{
    height:'95%',
    width: '95%',
    borderRadius: 20,
  },
});

export default FavoriteScreen;
