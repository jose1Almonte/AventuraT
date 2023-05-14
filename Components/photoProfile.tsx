import React, {Component} from 'react';
import {View, StyleSheet, Image} from 'react-native';

class PhotoProfile extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.photoContainer}>
          <Image
            style={styles.img}
            source={{
              uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg',
            }}
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
    height: 120,
    width: 120,
    borderRadius: 100,
    backgroundColor: 'white',
  },
  img: {
    width: 120,
    height: 120,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#1881B1',
  },
});

export default PhotoProfile;