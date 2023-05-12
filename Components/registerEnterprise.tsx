import { Text, Alert, TextInput, Button ,View, StyleSheet, TextStyle} from 'react-native';
import React from 'react';
import { useState} from 'react';
// import { Colors } from 'react-native/Libraries/NewAppScreen';

interface Empresa {
    enterpriseName: string | null;
    rif: string | null;
    personResponsible: string | null;

}

interface InputBoxesProps {
    textStyle: TextStyle,
    text: any,
    textInputStyle: TextStyle,
    placeholder: string,
    placeholderTextColor: string,
    value: any,
    onChangeText: ((text: string) => void) | undefined,
}

const InputBoxes = ({
    textStyle,
    text,
    textInputStyle,
    placeholder,
    placeholderTextColor,
    value,
    onChangeText,
}: InputBoxesProps) => {

    return (
        <View>
            <Text style = {textStyle}> {text} </Text>
                    <TextInput
                    style = {textInputStyle}
                    placeholder = {placeholder}
                    placeholderTextColor = {placeholderTextColor}
                    value = {value}
                    onChangeText = {onChangeText}/>
        </View>
    );
};

export default function RegisterEnterprise() {

    const [empresa, setEmpresa] = useState<Empresa>({
      enterpriseName: null,
      rif: null,
      personResponsible: null,
    });

    const [mostrarValores, setMostrarValores] = useState(false);

    const handleMostrarValores = () => {
        Alert.alert('Alerta', 'Se han guardado sus datos');
        setMostrarValores(true);
    };
    const noMostrarValores = () => {
        setMostrarValores(false);
    };

// Esto puede ser util mas adelante
//<Text> {empresa.enterpriseName} </Text>
//<Text> {empresa.rif} </Text>
//<Text> {empresa.personResponsible} </Text>

    return (
        <View style = {styles.cajota}>

            <InputBoxes  textStyle={styles.texto} text={'Nombre de la Empresa:'} textInputStyle={styles.cajita} placeholder={'Ingrese el nombre de la empresa aquí'} placeholderTextColor={'#BEBEBE'} value={empresa.enterpriseName ?? ''} onChangeText={(text) => setEmpresa({...empresa, enterpriseName: text})}/>
            <InputBoxes  textStyle={styles.texto} text={'RIF de la Empresa:'} textInputStyle={styles.cajita} placeholder={'Ingrese el RIF de la empresa aquí'} placeholderTextColor={'#BEBEBE'} value={empresa.rif ?? ''} onChangeText={(text) => setEmpresa({...empresa, rif: text})}/>
            <InputBoxes  textStyle={styles.texto} text={'Encargado de la Empresa:'} textInputStyle={styles.cajita} placeholder={'Ingrese el nombre del encargado aquí'} placeholderTextColor={'#BEBEBE'} value={empresa.personResponsible ?? ''} onChangeText={(text) => setEmpresa({...empresa, personResponsible: text})}/>

            <Button title="mi botoncito" onPress={handleMostrarValores}/>

            {mostrarValores &&
                <View style={styles.cajita}>

                    <Text style={styles.texto}>{empresa.enterpriseName}</Text>
                    <Text style={styles.texto}>{empresa.rif}</Text>
                    <Text style={styles.texto}>{empresa.personResponsible}</Text>

                    <Button title="mi botoncito2" onPress={noMostrarValores}/>
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    cajita:{
    flex: 1 / 3,
    backgroundColor:'white',
    },
    texto:{
    flex: 1 / 3,
    color:'black',
    },
    cajota:{
        flex: 1,
    },
});
