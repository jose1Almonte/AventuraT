import { ScrollView, ImageBackground, ImageSourcePropType } from 'react-native';
import React, { ReactNode } from 'react';

interface LoginBackgroundProps{
    children: ReactNode;
    style: any,
    image: ImageSourcePropType;
}

export const LoginBackground = ({
    children,
    style,
    image,
}: LoginBackgroundProps) => {
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

