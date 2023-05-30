import React, { useEffect, useRef, useState } from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, FlatList, Animated, ImageBackground, Text, Pressable } from 'react-native';
// import { CustomComponent1, CustomComponent2, CustomComponent3, CustomComponent4 } from './CarruselComponent';
import firestore from '@react-native-firebase/firestore';
import { ButtonLikes } from './ButtonLikes';
import Califications from './Califications';
import { PackageI } from '../models/package.interface';
import DetailsScreenUser from '../Screens/DetailsScreen/DetailsScreenUser';
import { NavigationProp } from '@react-navigation/native';

const { height, width } = Dimensions.get('window');
let navigation: NavigationProp<Record<string, object | undefined>>;

interface CarouselItem {
  id: number;
  component: React.ReactNode;
}

interface carruselProps {
  navigation: NavigationProp<Record<string, object | undefined>>;
}

const screenWidth = Dimensions.get('window').width;
const carouselItemWidth = screenWidth * 0.43; // Ancho de los componentes

export const Carrousel = ({ navigation }: carruselProps) => {
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchCarouselData = async () => {
      try {
        let listPackage: PackageI[] = [];
        const snapshot = await firestore().collection('package').get();

        snapshot.docs.map((doc: any) => {
          let packageTemp: PackageI = {
            availability: doc.data().availability,
            description: doc.data().description,
            id: doc.data().id,
            location: doc.data().location,
            mainImageUrl: doc.data().mainImageUrl,
            name: doc.data().name,
            price: doc.data().price,
            raiting: doc.data().raiting,
            nameEnterprice: doc.data().nameEnterprice,
            start: doc.data().start,
            end: doc.data().end,
          };

          listPackage.push(packageTemp);
        });

        const firebaseItems: CarouselItem[] = listPackage.map((data: PackageI) => {

          // Crea tu componente personalizado utilizando name, description y mainImageUrl
          const customComponent = (
            <Pressable onPress={() => {
              navigation.navigate('DetailsScreenUser', { data });
            }}>
              <View style={styles.contenedor2}>
                <ImageBackground borderRadius={30} style={styles.reescala} source={{ uri: data.mainImageUrl }}>
                  <View style={styles.contenedor3}>
                    <View style={styles.ContainerLikes}>
                      <ButtonLikes packageDetails={data} />
                    </View>
                    <Califications calification={data.raiting} />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.texto}>{data.name}</Text>
                    <Text style={styles.texto2}>{data.description}</Text>
                  </View>
                </ImageBackground>
              </View>
            </Pressable>

          );

          return {
            id: data.id,
            component: customComponent,
          };
        });

        setCarouselItems((prevItems) => [...prevItems, ...firebaseItems]);
      } catch (error) {
        console.log('Error fetching carousel data from Firebase:', error);
      }
    };

    fetchCarouselData();
  }, []);

  const renderItem = ({ item, index }: { item: CarouselItem; index: number }) => {
    const centerScale = 1.2;
    const sideScale = 0.8;
    const inputRange = [
      (index - 1) * carouselItemWidth,
      index * carouselItemWidth,
      (index + 1) * carouselItemWidth,
    ];
    const outputRange = [sideScale, centerScale, sideScale];
    const transformScale = scrollX.interpolate({
      inputRange,
      outputRange,
      extrapolate: 'clamp',
    });

    const itemStyle = {
      transform: [{ scale: transformScale }],
      width: carouselItemWidth,
      height: Dimensions.get('window').height * 0.6,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: index === 0 ? (screenWidth - carouselItemWidth) / 2 : 0,
      marginRight: index === carouselItems.length - 1 ? (screenWidth - carouselItemWidth) / 2 : 0,
    };

    return (
      <TouchableOpacity style={styles.contenedor}>
        <Animated.View style={[styles.carouselItem, itemStyle]}>{item.component}</Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={carouselItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToInterval={carouselItemWidth}
        snapToAlignment="start"
        decelerationRate="fast"
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: true,
        })}
        contentContainerStyle={styles.contentContainer}
        contentInsetAdjustmentBehavior="automatic"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: screenWidth * 0.6,
  },
  contentContainer: {
    alignItems: 'center',
  },
  contenedor: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  contenedor2: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 1,
    height: 1,
  },
  contenedor3: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginTop: 12,
    flexDirection: 'row',
    gap: 60,
  },
  reescala: {
    width: width * 0.4,
    height: height * 0.23,
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    gap: 5,
    backgroundColor:
      'linear-gradient(359.78deg, rgba(0, 0, 0, 0.8) 4.2%, rgba(13, 13, 13, 0) 118.3%)',
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 30,
  },
  ContainerLikes: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    width: 26,
    height: 26,
    padding: 5,
  },
  texto: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    lineHeight: 18,
    letterSpacing: 0.05,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  texto2: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
    lineHeight: 18,
    textAlign: 'center',
    color: '#FFFFFF',
    opacity: 0.8,
  },

  carouselItem: {},
  contenedor4: {
    justifyContent: 'center',
    alignItems: 'center',
  },

});


