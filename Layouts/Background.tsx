import { ScrollView, ImageBackground, ImageSourcePropType } from 'react-native';
import React, { ReactNode } from 'react';

interface BackgroundProps{
    children: ReactNode;
    style: any,
    image: ImageSourcePropType;
}

export const Background = ({
    children,
    style,
    image,
}: BackgroundProps) => {
  return (
    <ImageBackground source={image} resizeMode="cover" style = {style}>
      <ScrollView>

        {children}

      </ScrollView>
    </ImageBackground>
  );
};

// const styles = StyleSheet.create({
//     backGround: {
//         // backgroundColor: 'red',
//     },

//     image: {
//       // backgroundColor: 'red',
//     },
// });

