import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import { addPackage, uploadImage, getLastPackageId, LoadingScreen, LoadingScreenTransparentBackground } from '../firebase/Firestore'; // Importa la función getLastPackageId
import { launchImageLibrary } from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useUser } from '../Context/UserContext';
import FourOptionsSelector from './SelectorFour';
// import firestore from '@react-native-firebase/firestore';

const isDateGreaterThanOneDay = (date1: Date, date2: Date) => {
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // Número de milisegundos en un día
  // console.log('date1: ', date1);
  // console.log('date2: ', date2);
  date1.setHours(0, 0, 0, 0);
  date2.setHours(0, 0, 0, 0);

  const date1WithoutTime = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate()); // crea una nueva fecha con la misma fecha pero sin hora, minutos, segundos o milisegundos

  const date2WithoutTime = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate()); // crea una nueva fecha con la misma fecha pero sin hora, minutos, segundos o milisegundos

  // Comparamos los valores de tiempo de las fechas sumando un día a la fecha 2
  return date1WithoutTime.getTime() >= (date2WithoutTime.getTime() + oneDayInMilliseconds);
};

const DatePickerBox = ({ text, writingDate, setWritingDate, dateBefore, date, setDate }: {
  text: string;
  writingDate: boolean;
  dateBefore: Date;
  date: Date;
  setWritingDate: (value: boolean) => void;
  setDate: (value: Date) => void;
}) => {

  const handleDateChange = async (event: any, selectedDate: any) => {
    if (isDateGreaterThanOneDay(selectedDate, dateBefore)) {
      console.log(`La fecha seleccionada es mayor por al menos un día a la fecha antes de la función. ${dateBefore.getDay().toString().padStart(2, '0')} <`);
      const currentDate = selectedDate || date;
      setDate(currentDate);
      setWritingDate(false);
    } else {
      const printDateBefore = (dateBefore.getTime() + 1000).toString();
      const printSelectedDate = selectedDate.getTime().toString();

      Alert.alert('Fecha inválida', `No tiene sentido si eliges ese valor para la fecha! Vuelve a intentarlo ${printDateBefore} ${printSelectedDate}`);
      console.log(`La fecha seleccionada NO es mayor por al menos un día a la fecha antes de la función. ${printDateBefore} ${printSelectedDate}`);
      const currentDate = date;
      setDate(currentDate);
      setWritingDate(false);
    }
  };

  if (writingDate) {
    return (
      <DateTimePicker
        value={date}
        mode="date"
        onChange={(event, selectedDate) => {
          handleDateChange(event, selectedDate);
        }}
      />
    );
  }

  return (
    <>
      <Text style={styles.label1}>
        {text} {date.toDateString()}
      </Text>
    </>
  );
};

interface CreateFormProps {
  navigation: any;
}

interface CreateFormData {
  id: number;
  name: string;
  availability: string;
  price: string;
  description: string;
  location: string;
  endDate: Date;
  startDate: Date;
  emailEnterprise: string;
  nameEnterprise: string;
  rating: [number];
  expireDate: Date;
  isPublic: boolean,
  userList: [String],
}

const CreateForm = ({ navigation }: CreateFormProps) => {
  const [resourcePath, setResourcePath] = useState('');
  const [filename, setFileName] = useState('');
  // const [nameEnterprise, setNameEnterprise] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const userEmail = user ? user.email : null;

  const currentDate = new Date();

  const nextDay = new Date();
  nextDay.setDate(currentDate.getDate() + 1);

  const next2Days = new Date();
  next2Days.setDate(currentDate.getDate() + 2);

  const next3Days = new Date();
  next3Days.setDate(currentDate.getDate() + 3);

  const [startDate, setStartDate] = useState(nextDay);
  const [writtingStartDate, setWritingStartDate] = useState(false);

  const [endDate, setEndDate] = useState(next2Days);
  const [writtingEndDate, setWritingEndDate] = useState(false);

  const [expireDate, setExpireDate] = useState(next3Days);
  const [writtingExpireDate, setWritingExpireDate] = useState(false);

  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option: any) => {
    setSelectedOption(option);
  };

  const [data, setData] = useState<CreateFormData>({
    id: 0, // Inicializa el ID en 0
    name: '',
    availability: '',
    price: '',
    description: '',
    location: '',
    endDate: endDate,
    startDate: startDate,
    emailEnterprise: userEmail,
    nameEnterprise: '',
    rating: [0],
    expireDate: expireDate,
    isPublic: true,
    userList: 'carlos',
  });

  useEffect(() => {
    // Carga el último ID de Firebase al cargar el componente
    loadLastId();
  }, []);

  // useEffect(() => {
  //   console.log('nameEnterprise:' , nameEnterprise);
  // }, [nameEnterprise]);

  const handleIsPublic = () => {
    setData(prevData => ({ ...prevData, isPublic: !data.isPublic }));
  };

  const loadLastId = async () => {
    const lastId = await getLastPackageId(); // Obtén el último ID de Firebase
    setData(prevData => ({ ...prevData, id: lastId + 1 })); // Incrementa el ID en 1 para el siguiente paquete
  };

  const submit = async () => {


    if (!(isDateGreaterThanOneDay(startDate, currentDate) && isDateGreaterThanOneDay(endDate, startDate) && isDateGreaterThanOneDay(expireDate, endDate))) {

      Alert.alert('Fechas inválidas', '"Fecha empieza" debe ser menor que "fecha termina", siendo ambas menor que "fecha expira". Las fechas deben tener al menos 1 día de diferencia');
      return;
    }

    console.log(selectedOption);
    if (
      data.name.trim() === '' ||
      data.availability.trim() === '' ||
      data.location.trim() === '' ||
      data.description.trim() === '' ||
      data.price.trim() === '' ||
      selectedOption === null
    ) {
      Alert.alert('Campos Vacíos', 'Por favor, complete todos los campos');
      return;
    }

    const priceInt = parseInt(data.price);

    const availabilityInt = parseInt(data.availability);

    if (Number.isInteger(priceInt) && Number.isInteger(availabilityInt)) { }
    else {
      Alert.alert('Revise el precio o la disponibilidad, no son números');
      return;
    }

    data.endDate = endDate;
    data.startDate = startDate;
    data.expireDate = expireDate;
    // Alert.alert('Se está subiendo tus datos, presiona ok para que se continue');

    if (resourcePath === '') {
      Alert.alert('Por favor coloque la imagen');
      return;
    } else {
      setLoading(true);
      setTimeout(async () => {
        const url = await uploadImage(resourcePath, filename);
        await addPackage(
          data.id,
          data.name,
          data.availability,
          data.price,
          data.description,
          url,
          data.location,
          data.endDate,
          data.startDate,
          data.emailEnterprise,
          // data.nameEnterprise,
          data.rating,
          data.expireDate,
          data.isPublic,
          selectedOption,
          data.userList,
        );
        setLoading(false);
        Alert.alert('Ya se subió el paquete a la base de datos');
        await navigation.navigate('HomeScreen');
      }, 3000);
      await loadLastId();
    }
  };


  const selectImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (response.didCancel) {
        console.log('No se ha elegido una imagen');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
      } else {
        const selectedAsset = response.assets && response.assets[0];
        if (selectedAsset && selectedAsset.uri) {
          setResourcePath(selectedAsset.uri);
          setFileName(
            selectedAsset.uri.substring(selectedAsset.uri.lastIndexOf('/') + 1),
          );
          Alert.alert('Ya se subió la foto');
        }
      }
    });
  };
  // if (loading) {
  //   return <LoadingScreenTransparentBackground />;
  // }
  return (

    <>
      {loading && (
        <LoadingScreenTransparentBackground />
      )}

      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>¡Agrega tu paquete con AventuraT!</Text>
        </View>
        <View style={styles.formContainer}>
          <ScrollView style={styles.scrollFormContainer}>
            <View style={styles.formContainer}>
              <View style={styles.container2}>
                <FourOptionsSelector onSelect={handleOptionSelect} />
                <Text style={styles.label}>Opción Seleccionada: </Text>
                <Text style={styles.labelSelector}>{selectedOption}</Text>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Nombre del paquete</Text>
                <TextInput style={styles.input} onChangeText={text => setData(prevData => ({ ...prevData, name: text }))} />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Cantidad de cupos disponibles</Text>
                <TextInput style={styles.input} keyboardType="numeric" onChangeText={text => setData(prevData => ({ ...prevData, availability: text }))} />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Precio por persona</Text>
                <TextInput style={styles.input} keyboardType="numeric" onChangeText={text => setData(prevData => ({ ...prevData, price: text }))} />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Ubicación</Text>
                <TextInput style={styles.input} onChangeText={text => setData(prevData => ({ ...prevData, location: text }))} />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Breve descripción del paquete</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={text =>
                    setData(prevData => ({ ...prevData, description: text }))
                  }
                />
              </View>


              <TouchableOpacity style={styles.inputContainer} onPress={() => { handleIsPublic(); }}>
                <Text style={styles.label}>El Paquete es:</Text>

                {data.isPublic ? (
                  <Text style={styles.input}>Público</Text>
                ) : (
                  <Text style={styles.input}>Privado </Text>
                )
                }
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { setWritingStartDate(true); }} style={styles.inputContainer}>
                <DatePickerBox
                  text="El viaje empieza: "
                  writingDate={writtingStartDate}
                  setWritingDate={setWritingStartDate}
                  dateBefore={currentDate}
                  date={startDate}
                  setDate={setStartDate}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { setWritingEndDate(true); }} style={styles.inputContainer}>
                <DatePickerBox
                  text="El viaje Termina: "
                  writingDate={writtingEndDate}
                  setWritingDate={setWritingEndDate}
                  dateBefore={startDate}
                  date={endDate}
                  setDate={setEndDate}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { setWritingExpireDate(true); }} style={styles.inputContainer}>
                <DatePickerBox
                  text="El paquete expira: "
                  writingDate={writtingExpireDate}
                  setWritingDate={setWritingExpireDate}
                  dateBefore={endDate}
                  date={expireDate}
                  setDate={setExpireDate}
                />
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={() => selectImage()}>
                <Text style={styles.buttonText}>Subir imagen/logo principal</Text>
              </TouchableOpacity>
              {resourcePath === '' ? (
                <></>
              ) : (
                <View>
                  <Image source={{ uri: resourcePath }} />
                </View>
              )}
            </View>
          </ScrollView>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.submitButton} onPress={() => submit()}>
            {/* <TouchableOpacity style={styles.submitButton} onPress={() => reallyUserFinded(userEmail)}> */}
            <Text style={styles.buttonText}>Crear Paquete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#1DB5BE',
  },
  container2: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  header: {
    flex: 3,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollFormContainer: {
    width: '100%',
  },
  formContainer: {
    // height: 550,
    flex: 14.5,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  inputContainer: {
    height: 52,
    width: '80%',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginTop: 22,
  },
  title: {
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 36,
    textAlign: 'center',
    color: '#FFFFFF',
    width: '90%',
  },
  label: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 24,
    color: 'black',
  },
  labelSelector: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 24,
    color: '#1881B1',
  },
  label1: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 24,
    color: '#1881B1',
  },
  input: {
    marginTop: 8,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 24,
    color: 'black',
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    height: 40,
    width: 200,
    borderRadius: 5,
    justifyContent: 'center',
    backgroundColor: '#1881B1',
    marginTop: 40,
    marginBottom: '5%',
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  },
  footer: {
    flex: 2,
    width: '100%',
    marginTop: 50,
    alignItems: 'center',
  },
  submitButton: {
    display: 'flex',
    alignItems: 'center',
    height: 40,
    width: 200,
    borderRadius: 5,
    justifyContent: 'center',
    backgroundColor: '#1881B1',
  },
});


export default CreateForm;
