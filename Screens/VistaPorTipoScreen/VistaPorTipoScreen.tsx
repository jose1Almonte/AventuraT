import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Touchable, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useUser, UserProvider } from "../../Context/UserContext"
import { getFavorites, getPackage, listTipoPackage, LoadingScreen, LoadingScreenTransparentBackground } from '../../firebase/Firestore';
import { NavigationProp, useRoute } from '@react-navigation/native';
import { Background } from '../../Layouts/Background';

interface vistaTipoProps {
  navigation: NavigationProp<Record<string, object | undefined>>;
}

const VistaPorTipoScreen = ({ navigation }: vistaTipoProps) => {
  const route = useRoute();

  // @ts-ignore
  const tipo = route.params?.parameter || '';
  // @ts-ignore
  const [packages, setPackages] = useState<any[]>([]);

  const [loadingSomeThing, setLoadingSomething] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      setLoadingSomething(true);
      const packageList = await listTipoPackage(tipo);
      setPackages(packageList);
      setLoadingSomething(false);
    };

    fetchData();
  }, [tipo]);

  return (
    <>

      {loadingSomeThing && (
        <LoadingScreenTransparentBackground />
      )}

      <ScrollView style={styles.container}>
        <View style={styles.titleBox}>
          <Text style={styles.title}>Paquetes por categoría</Text>
        </View>
        {packages.length === 0 ? (
          <>
            <Text style={styles.noFavoritesText}>
              No se han agregado paquetes en esta categoría aún
            </Text>
            <Image
              style={styles.imageUsed}
              source={require('../../images/Websearch.png')}
            />
          </>
        ) : (
          <View style={styles.cardContainer}>
            {packages.map(esteitem => {
              return (
                <TouchableOpacity key={esteitem.id} style={styles.card}
                  onPress={() => { navigation.navigate('DetailsScreenUser', { data: esteitem }) }}
                >
                  <Background
                    style={styles.imageBackground}
                    image={{ uri: esteitem?.mainImageUrl }}>
                    <View style={styles.backgroundColor}>
                      <View style={styles.firstBox}>
                        <Image
                          style={styles.containerPhotoPack}
                          source={{
                            uri: esteitem?.mainImageUrl,
                          }}
                        />
                      </View>
                      <View style={styles.secondBox}>
                        <View style={styles.textBox}>
                          {/* <Text style={styles.name}>Nombre:</Text> */}
                          <Text style={styles.name}>{esteitem?.name}</Text>
                        </View>

                        <View style={styles.textBox}>
                          {/* <Text style={styles.description}>Descripción:</Text> */}
                          <Text style={styles.description}>
                            {esteitem?.description}
                          </Text>
                        </View>

                        <View style={styles.textBox}>
                          {/* <Text style={styles.price}>Precio:</Text> */}
                          <Text style={styles.price}>${esteitem?.price}</Text>
                        </View>
                      </View>
                    </View>
                  </Background>
                </TouchableOpacity>

              );
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
    // alignItems: 'center',
    // padding: 16,
  },

  titleBox: {
    marginTop: 50,
    alignItems: 'center',
    gap: 5,
    marginBottom: 30
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    color: '#FFF',
  },
  noFavoritesText: {
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: 20,
    width: '80%',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  imageUsed: {
    marginTop: 40,
    width: 350,
    height: 350,
    alignSelf: 'center',
  },
  cardContainer: {
    marginTop: 16,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  card: {
    // backgroundColor: '#FFF',
    backgroundColor: 'red',
    borderRadius: 20,
    // padding: 16,
    width: '45%',
    marginBottom: 16,
    overflow: 'hidden',
    height: 220,
    // borderColor: 'black',
    // borderWidth: 1,
    marginHorizontal: '2%',
  },

  imageBackground: {
    flex: 1,
  },
  name: {
    fontSize: 13,
    // fontWeight: 'bold',
    marginBottom: 8,
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
  },
  description: {
    fontSize: 13,
    marginBottom: 8,
    color: 'black',
    fontFamily: 'Poppins-Regular',
  },
  containerPhotoPack: {
    borderRadius: 20,
    // width: '100%',
    height: '90%',
    // marginBottom: 8,
    // borderColor: '#1DB5BE',
    // borderWidth: 1,
    // backgroundColor: 'red',
  },
  price: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Poppins-SemiBold'
  },

  backgroundColor: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
  },

  firstBox: {
    height: '60%',
    width: '95%',
    overflow: 'hidden',
    // backgroundColor: 'red',
    justifyContent: 'center',
  },

  secondBox: {
    width: '85%',
    height: '40%',
    // borderColor: 'black',
    // borderWidth: 1,
    // backgroundColor: 'red',
    justifyContent: 'center',
  },
  textBox: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'red',
  },
});

export default VistaPorTipoScreen;
