import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import firestore from '@react-native-firebase/firestore';

interface FavoriteItem {
  nombre: num;
  numero: string; // Cambiar a tipo string
}

interface PackageItem {
  nombre: string;
  // Agrega aquí los campos adicionales de tu colección "packages"
}

const MyComponent: React.FC = () => {
  const [favoriteArray, setFavoriteArray] = useState<FavoriteItem[]>([]);
  const [packageArray, setPackageArray] = useState<PackageItem[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const snapshot = await firestore().collection('favorites').get();
        const favorites: FavoriteItem[] = snapshot.docs.map((doc) => {
          const data = doc.data() as FavoriteItem;
          // Convertir el número a string
          return { ...data, numero: data.numero.toString() };
        });
        setFavoriteArray(favorites);
      } catch (error) {
        console.error('Error al obtener la colección de favoritos:', error);
      }
    };

    fetchFavorites();
  }, []);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const numerosFavoritos = favoriteArray.map((favorite) => favorite.numero);
        const snapshot = await firestore()
          .collection('packages')
          .where('numero', 'in', numerosFavoritos)
          .get();
        const packages: PackageItem[] = snapshot.docs.map((doc) => doc.data() as PackageItem);
        setPackageArray(packages);
      } catch (error) {
        console.error('Error al obtener la colección de paquetes:', error);
      }
    };

    if (favoriteArray.length > 0) {
      fetchPackages();
    }
  }, [favoriteArray]);

  return (
    <View>
      {packageArray.map((item, index) => (
        <Text key={index}>{item.nombre}</Text>
      ))}
    </View>
  );
};

export default MyComponent;
