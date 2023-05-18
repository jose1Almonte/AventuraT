import React, { useRef } from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, FlatList, Animated } from 'react-native';
import { CustomComponent1, CustomComponent2, CustomComponent3, CustomComponent4 } from './CarruselComponent';

interface CarouselItem {
  id: number;
  component: React.ReactNode;
}

const screenWidth = Dimensions.get('window').width;
const carouselItemWidth = screenWidth * 0.7; // Ancho de cada elemento en el carrusel

const carouselItems: CarouselItem[] = [
  { id: 1, component: <CustomComponent1 /> },
  { id: 2, component: <CustomComponent2 /> },
  { id: 3, component: <CustomComponent3 /> },
];

export const Carrousel = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

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
    backgroundColor: 'red',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: screenWidth * 0.6,
  },
  contentContainer: {
    alignItems: 'center',
  },
  carouselItem: {},
  contenedor: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
