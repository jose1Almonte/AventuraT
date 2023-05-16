import React, { useRef } from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, FlatList, Animated } from 'react-native';
import { CustomComponent1, CustomComponent2, CustomComponent3 } from './CarruselComponent';

interface CarouselItem {
  id: number;
  component: React.ReactNode;
}

const carouselItems: CarouselItem[] = [
  { id: 1, component: <CustomComponent1 /> },
  { id: 2, component: <CustomComponent2 /> },
  { id: 3, component: <CustomComponent3 /> },
];

export const Carrousel = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const renderItem = ({ item, index }: { item: CarouselItem; index: number }) => {
    const screenWidth = Dimensions.get('window').width;
    const centerScale = 1.2;
    const sideScale = 0.8;
    const inputRange = [
      (index - 1) * screenWidth,
      index * screenWidth,
      (index + 1) * screenWidth,
    ];
    const outputRange = [sideScale, centerScale, sideScale];
    const transformScale = scrollX.interpolate({
      inputRange,
      outputRange,
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity>
        <Animated.View style={[styles.carouselItem, { transform: [{ scale: transformScale }] }]}>
          {item.component}
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Animated.FlatList
        data={carouselItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        contentContainerStyle={{ alignItems: 'center' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  carouselItem: {
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').height * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
