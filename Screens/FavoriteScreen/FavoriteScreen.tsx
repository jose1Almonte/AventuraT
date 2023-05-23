import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';

interface FavoriteItem {
  nombre: number;
  numero: string; // Cambiar a tipo string
}

interface PackageItem {
  nombre: string;
  // Agrega aquí los campos adicionales de tu colección "packages"
}

const FavoriteScreen: React.FC = () => {
  const [favoriteArray, setFavoriteArray] = useState<FavoriteItem[]>([]);
  const [packageArray, setPackageArray] = useState<PackageItem[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const snapshot = await firestore().collection('favorites').get();
        const favorites: FavoriteItem[] = snapshot.docs.map((doc) => {
          const data = doc.data() as FavoriteItem;
          // Convertir el número a string
          return { ...data, numero: data.numero.toString() };
        });
        setFavoriteArray(favorites);
      } catch (error) {
        console.error('Error al obtener la colección de favoritos:', error);
      }
    };

    fetchFavorites();
  }, []);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const numerosFavoritos = favoriteArray.map((favorite) => favorite.numero);
        const snapshot = await firestore()
          .collection('packages')
          .where('numero', 'in', numerosFavoritos)
          .get();
        const packages: PackageItem[] = snapshot.docs.map((doc) => doc.data() as PackageItem);
        setPackageArray(packages);
      } catch (error) {
        console.error('Error al obtener la colección de paquetes:', error);
      }
    };

    if (favoriteArray.length > 0) {
      fetchPackages();
    }
  }, [favoriteArray]);

  return (
    <View>
      {packageArray.map((item, index) => (
        <Text key={index}>{item.nombre}</Text>
      ))}
    </View>
  );


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    info: {
      flex: 1,
      display: 'flex',
      margin: 5
    },
    topInfo: {
      marginTop: 80,
      alignItems: 'center',
      gap: 15,
    },
    info2: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      marginLeft: 15,
      gap: 6,
      padding: 20,
    },
    info3: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      padding: 20,
      marginLeft: 15,
    },
    contenedorInfoTop: {
      marginTop: 15,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    contenedorInfo: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    contenedorServicios: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      paddingLeft: 20,
      paddingRight: 20,
      marginLeft: 15,
    },
    contenedorPrecio: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      paddingLeft: 20,
      marginLeft: 15,
      marginTop: 15,
    },
    contenedorPrecios: {
      display: 'flex',
      flexDirection: 'row',
      gap: 12,
    },
    contenedorEscala: {
      justifyContent: "center",
      display: 'flex',
      borderRadius: 4,
      width: 90,
      height: 35,
      borderColor: '#1881B1',
      borderWidth: 1
    },
    containerButton: {
      display: 'flex',
      alignItems: 'center',
    },
    container2: {
      marginTop: 20,
      height: 42,
      width: 300,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#1881B1',
    },
    txt: {
      color: 'black',
      fontSize: 20,
      fontFamily: 'Poppins-SemiBold',
    },
    title: {
      color: 'black',
      fontSize: 16,
      fontFamily: 'Poppins-Medium',
    },
    txtInfo: {
      color: '#323F4B',
      fontSize: 15,
      fontFamily: 'Poppins-Regular',
    },
    txtInfo1: {
      color: 'white',
      fontSize: 16,
      fontFamily: 'Poppins-Bold',
    },
    txtInfo2: {
      marginLeft: 10,
      color: '#323F4B',
      fontSize: 15,
      fontFamily: 'Poppins-Regular',
    },
  });
}
// import React, { useEffect, useState } from 'react';
// import { View, Text } from 'react-native';
// import firestore from '@react-native-firebase/firestore';
// import auth from '@react-native-firebase/auth';
// import { useUser, UserProvider } from "../../Context/UserContext"
// import { getFavorites } from '../../firebase/Firestore';



// const FavoriteScreen = () => {
//   const [favorites, setFavorites] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { user, islogged } = useUser();

//   const conseguirFavoritos = async () => {

//     const email = await user.email;
//     const fav = await getFavorites(email);
//     await setFavorites(fav);
//     console.log(favorites);
//     setLoading(false);

//   };

//   useEffect(() => {

//     conseguirFavoritos();

//   },[loading])



//   return (<View style={styles.container}>
//       <Text>FavoriteScreen</Text>
//     <>
//       {favorites.map((item, idx) => {
//         if (idx === 0) {

//         } else {
//           return (
//           <View>
//             <Text>Name: { item }</Text>
//           </View>);
//         }
//       })}
//     </>
//     </View>
//   );
// };

// const styles = {
//   container: {
//     backgroundColor: '#1DB5BE',
//     flex: 1,
//   },
// };
// export default FavoriteScreen;


// import { Text, View, StyleSheet, ScrollView, } from 'react-native';
// import React, { useEffect } from 'react';
// import { SvgXml } from 'react-native-svg';
// import vectorPerfil from '../../vectores/vectorPerfil';
// import PhotoProfile from '../../Components/Profiles/photoProfile';
// import EditProfileButton from '../../Components/Profiles/editProfileButton';
// import VectorPerfilFlecha from '../../vectores/vectorPerfilFlecha';
// import InputSearch from '../../Components/InputSearch';
// import PackagesSearch from '../../Components/packagesSearch';
// import options from '../../vectores/options';

// const FavoriteScreen = () => {
//         return (
//         <ScrollView>
//             <View style={styles.container}>
//                 <View style={styles.info}>
//                     <View style={styles.topInfo}>
//                         <Text style={styles.txt}>Paquetes Favoritos</Text>
//                         <InputSearch />
//                         <PackagesSearch />
//                         <PackagesSearch />
//                         <PackagesSearch />
//                         <PackagesSearch />
//                         <PackagesSearch />
//                         <PackagesSearch />
//                         <PackagesSearch />
//                         <PackagesSearch />
//                     </View>
//                 </View>
//             </View>
//         </ScrollView>
//     );
// };

// export default FavoriteScreen;