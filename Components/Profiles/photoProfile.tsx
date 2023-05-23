import React, { Component } from 'react';
import { View, StyleSheet, Image, ImageSourcePropType } from 'react-native';

interface PhotoProfileProps {
  size?: number;
  imageSource: string | undefined;
}

class PhotoProfile extends Component<PhotoProfileProps> {
  render() {
    const { size, imageSource } = this.props;
    const containerSize = size || 100;
    const imgSize = containerSize;
    return (
      <View style={[styles.container, { width: containerSize, height: containerSize }]}>
        <View style={[styles.photoContainer, { width: containerSize, height: containerSize }]}>
          <Image
            style={[styles.img, { width: imgSize, height: imgSize, borderRadius: imgSize / 2 }]}
            source={{ uri: imageSource }}
            alt="photo"
          />
        </View>
      </View>
    );
  }
}

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
    backgroundColor: 'white',
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