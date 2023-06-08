import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useUser, UserProvider } from "../../Context/UserContext"
import { getFavorites, getPackage, LoadingScreen } from '../../firebase/Firestore';

const FavoriteScreen = () => {
  const [loadingFavorites, setLoadingFavorites] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [packages, setPackages] = useState<Record<string, any>>({}); // Tipo de datos para el estado 'packages'
  const { user, isLogged } = useUser();
  const [showContent, setShowContent] = useState(false); // Variable de estado para controlar la visibilidad del contenido

  const conseguirFavoritos = async () => {
    const email = user.email;
    const fav = await getFavorites(email);
    setFavorites(fav);
    setLoadingFavorites(false);
  };

  useEffect(() => {
    setLoadingFavorites(true); // Establece el estado a true al iniciar la carga de favoritos
    conseguirFavoritos();
  }, []);

  useEffect(() => {
    const fetchPackages = async () => {
      const packageData: Record<string, any> = {}; // Tipo de datos para 'packageData'
      for (const item of favorites) {
        const packageInfo = await getPackage(item);
        if (packageInfo) {
          packageData[item] = packageInfo;
        }
      }
      setPackages(packageData);
      setLoading(false); // Marca la carga como completa
    };

    fetchPackages();
  }, [favorites]);

  useEffect(() => {
    // Muestra el contenido después de 3 segundos
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 3000);

    return () => clearTimeout(timer); // Limpia el temporizador al desmontar el componente
  }, []);

  if (loadingFavorites || loading || !showContent) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FavoriteScreen</Text>
      {favorites.map((esteitem, idx) => (
        <View key={esteitem}>
          {favorites.length === 1  && (
            <Text>NO HAY FAVORITOS</Text>
          )
          }
          {idx !== 0 && packages[String(esteitem)] && (
            <View style={styles.card}>
              <Text style={styles.name}>Nombre: {packages[String(esteitem)]?.name}</Text>
              <Text style={styles.description}>Descripción: {packages[String(esteitem)]?.description}</Text>
              <Text style={styles.price}>Precio: {packages[String(esteitem)]?.price}</Text>
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1DB5BE',
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#FFF',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'black',
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
    color: 'black',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default FavoriteScreen;
