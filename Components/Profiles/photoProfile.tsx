import React, { Component } from 'react';
import { View, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import auth from '@react-native-firebase/auth';

interface PhotoProfileProps {
  size?: number;
}

interface UserData {
  photoURL?: string;
}

interface PhotoProfileState {
  photoURL: string | undefined;
}

class PhotoProfile extends Component<PhotoProfileProps, PhotoProfileState> {
  state: PhotoProfileState = {
    photoURL: undefined,
  };

  componentDidMount() {
    this.fetchUserPhoto();
  }

  fetchUserPhoto = () => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      const { photoURL } = currentUser;
      if (photoURL) {
        this.setState({ photoURL });
      }
    }
  };

  render() {
    const { size } = this.props;
    const { photoURL } = this.state;
    const containerSize = size || 100;
    const imgSize = containerSize;

    return (
      <View style={[styles.container, { width: containerSize, height: containerSize }]}>
        <View style={[styles.photoContainer, { width: containerSize, height: containerSize }]}>
          {photoURL ? (
            <Image
              style={[styles.img, { width: imgSize, height: imgSize, borderRadius: imgSize / 2 }]}
              source={{ uri: photoURL }}
              alt="photo"
            />
          ) : (
            <View style={[styles.img, { width: imgSize, height: imgSize, borderRadius: imgSize / 2, backgroundColor: '#1881B1' }]} />
          )}
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
