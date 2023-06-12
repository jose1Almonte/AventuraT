import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


interface ButtonLikesProps {
  packageDetails: any;
}

export function ButtonLikes({ packageDetails }: ButtonLikesProps) {
  const [isClicked, setIsClicked] = useState(false); // Estado para rastrear si se ha hecho clic en el botón

  useEffect(() => {
    const unsubscribe = subscribeToChanges();

    return () => {
      unsubscribe(); // Cancela la suscripción al desmontar el componente
    };
  }, []);

  const subscribeToChanges = () => {
    const user = auth().currentUser;

    if (user && packageDetails && packageDetails.id) {
      return firestore()
        .collection('users')
        .where('email', '==', user.email)
        .onSnapshot((snapshot) => {
          snapshot.forEach((doc) => {
            const userData = doc.data();
            const favorites = userData.favorites;
            const isFavorite = favorites.includes(packageDetails.id.toString());
            setIsClicked(isFavorite);
          });
        });
    }

    return () => {}; // Si no se cumplen las condiciones, devuelve una función vacía para cancelar la suscripción
  };

  const handleButtonClick = () => {
    setIsClicked(!isClicked); // Invertir el estado de isClicked al hacer clic
  };

  const handleToggled = async () => {
    const user = auth().currentUser;
    if (user && packageDetails && packageDetails.id) { // Verificar que packageDetails esté definido
      const querySnapshot = await firestore()
        .collection('users')
        .where('email', '==', user.email)
        .get();

      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        let newFavorites = [...userData.favorites];

        if (isClicked) {
          // Remove package from favorites
          newFavorites = newFavorites.filter((id) => id !== packageDetails.id.toString());
        } else {
          // Add package to favorites if it's not already present
          if (!newFavorites.includes(packageDetails.id.toString())) {
            newFavorites.push(packageDetails.id.toString());
          }
        }

        firestore()
          .collection('users')
          .doc(doc.id)
          .update({
            favorites: newFavorites,
          })
          .then(() => {
            console.log('Data updated successfully in Firestore for the user');
          })
          .catch((error) => {
            console.error('Error updating data in Firestore for the user:', error);
          });
      });
    }
  };

  const heartColor = isClicked ? '#FF3D00' : 'white'; // Establecer el color del ícono de corazón según el estado

  const heartIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path fill="${heartColor}" d="M12 20.853l-1.577-1.422C4.017 14.607 0 11.189 0 7.038 0 3.364 2.687 1 6 1c1.905 0 3.633.879 5 2.252C11.367 1.879 13.095 1 15 1c3.313 0 6 2.364 6 6.038 0 4.151-4.017 7.569-10.423 12.393L12 20.853z"/>
  </svg>`;

  return (
    <TouchableOpacity onPress={() => { handleButtonClick(); handleToggled(); }} style={styles.button}>
      <SvgXml xml={heartIcon} width={24} height={24} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    margin: 20,
    width: 26,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
});
