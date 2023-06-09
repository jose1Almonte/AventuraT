import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useUser, UserProvider } from "../../Context/UserContext"
import { getFavorites, getPackage, listTipoPackage, LoadingScreen } from '../../firebase/Firestore';
import { useRoute } from '@react-navigation/native';

const VistaPorTipoScreen = () => {

  const route = useRoute();
  const tipo = route.params?.parameter || '';
  const [packages, setPackages] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const packageList = await listTipoPackage(tipo);
      setPackages(packageList);
    };

    fetchData();
}, [tipo]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Paquetes por Tipo</Text>
      {packages.length === 0 ? (
        <Text style={styles.noFavoritesText}>NO HAY PAQUETES CON ESTE TIPO</Text>
      ) : (
        <View style={styles.cardContainer}>
        {packages.map((esteitem) => {
            return (
                <View key={esteitem.id} style={styles.card}>
            <>
                <Image
                    style={styles.containerPhotoPack}
                    source={{
                        uri: esteitem?.mainImageUrl,
                    }}
                    />
                    <Text style={styles.name}>Nombre: {esteitem?.name}</Text>
                    <Text style={styles.description}>Descripción: {esteitem?.description}</Text>
                    <Text style={styles.price}>Precio: {esteitem?.price}</Text>
                </>
                </View>
            );
        })}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1DB5BE',
    padding: 16,
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
  containerPhotoPack: {
    borderRadius: 50,
    width: '100%',
    height: 200,
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default VistaPorTipoScreen;
