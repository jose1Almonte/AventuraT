import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Animated, ImageBackground, Text, Pressable } from 'react-native';
// import { CustomComponent1, CustomComponent2, CustomComponent3, CustomComponent4 } from './CarruselComponent';
import firestore from '@react-native-firebase/firestore';
import { ButtonLikes } from './ButtonLikes';
import Califications from './Califications';
import { PackageI } from '../models/package.interface';
import { NavigationProp } from '@react-navigation/native';
import { LoadingScreen } from '../firebase/Firestore';
import { snapshotListener } from '../firebase/Firestore';

const { height, width } = Dimensions.get('window');
// let navigation: NavigationProp<Record<string, object | undefined>>;

interface CarouselItem {
  id: number;
  component: React.ReactNode;
}

interface carruselProps {
  navigation: NavigationProp<Record<string, object | undefined>>;
  setLoadingSomething: any,
}

const screenWidth = Dimensions.get('window').width;
const carouselItemWidth = screenWidth * 0.43; // Ancho de los componentes


export const Carrousel = ({ navigation, setLoadingSomething }: carruselProps) => {
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const subscribeToChanges = () => {
      setLoadingSomething(true);
      const unsubscribe = firestore()
      .collection('package')
        .where('isPublic', '==', true)
        .onSnapshot((snapshot) => {
          const updatedCarouselItems: CarouselItem[] = [];
          snapshot.docs.forEach((doc) => {
            const data = doc.data();
            const packageTemp: PackageI = {
              availability: data.availability,
              description: data.description,
              id: data.id,
              location: data.location,
              mainImageUrl: data.mainImageUrl,
              name: data.name,
              price: data.price,
              rating: data.rating,
              startDate: data.startDate,
              endDate: data.endDate,
              emailEnterprise: data.emailEnterprise,
              expireDate: data.expireDate,
              isPublic: data.isPublic,
            };
            
            const customComponent = (
              <TouchableOpacity style={styles.touchable} onPress={() => {
                navigation.navigate('DetailsScreenUser', { data: packageTemp });
              }}>
                <View style={styles.boxCard}>
                  <ImageBackground style={styles.reescala} source={{ uri: packageTemp.mainImageUrl }}>
                    <View style={styles.contenedor3}>

                      <View style={styles.ContainerLikes}>
                        <ButtonLikes packageDetails={packageTemp} />
                      </View>

                      <Califications calification={packageTemp.rating} />

                    </View>

                    <View style={styles.textContainer}>
                      <Text style={styles.texto}>{packageTemp.name}</Text>
                      <Text style={styles.texto2}>{packageTemp.description}</Text>
                    </View>
                  </ImageBackground>
                </View>
              </TouchableOpacity>
            );

            updatedCarouselItems.push({
              id: packageTemp.id ?? 0,
              component: customComponent,
            });
          });

          setCarouselItems(updatedCarouselItems);
        });

        setLoadingSomething(false);
        return unsubscribe; // Devuelve la función para cancelar la suscripción
      };

    const unsubscribe = subscribeToChanges();
    
    return () => {
      unsubscribe();};
  }, [navigation]);

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
        <Animated.View style={[styles.carouselItem, itemStyle]}>{item.component}</Animated.View>
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
    // width: width * 0.4,
    // height: height * 0.23,
    width: '100%',
    height: '100%',
    // borderRadius: 30,
    
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    // left: 0,
    // right: 0,
    width: '100%',
    height: 80,
    gap: 5,
    backgroundColor:
      'linear-gradient(359.78deg, rgba(0, 0, 0, 0.8) 4.2%, rgba(13, 13, 13, 0) 118.3%)',
    // borderBottomStartRadius: 30,
    // borderBottomEndRadius: 30,
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
  touchable: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxCard:{
    // borderColor: 'black',
    // borderWidth: 2,
    borderRadius: 30,
    overflow: 'hidden',
    width: width * 0.4,
    height: height * 0.23,
  },

});


