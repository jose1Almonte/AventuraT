import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { View, StyleSheet, Image } from 'react-native';

interface PhotoProfileProps {
  size?: number;
  imageSource?: string | null | undefined;
}

const PhotoProfile = ({ size, imageSource }: PhotoProfileProps) => {
  const [photoURL, setPhotoURL] = useState<string | undefined>(undefined);

  useEffect(() => {
    fetchUserPhoto();
  }, []);

  const fetchUserPhoto = () => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      const { photoURL: userPhotoURL } = currentUser;
      if (userPhotoURL) {
        setPhotoURL(userPhotoURL);
      }
    }
  };

  const containerSize = size || 100;
  const imgSize = containerSize;

  return (
    <View style={[styles.container, { width: containerSize, height: containerSize }]}>
      <View style={[styles.photoContainer, { width: containerSize, height: containerSize }]}>
        <Image
          style={[styles.img, { width: imgSize, height: imgSize, borderRadius: imgSize / 2 }]}
          source={{ uri: imageSource || photoURL || '' }}
          alt="photo"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoContainer: {
    height: 100,
    width: 100,
    borderRadius: 100,
    backgroundColor: '#1881B1',
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#1881B1',
  },
});

export default PhotoProfile;

