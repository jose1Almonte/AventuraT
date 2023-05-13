import { Text, Alert, TextInput, Button ,View, StyleSheet, TextStyle} from 'react-native';
import React from 'react';
import { useState} from 'react';
// import { Colors } from 'react-native/Libraries/NewAppScreen';

interface Enterprise {
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

    const [enterprise, setEnterprise] = useState<Enterprise>({
    enterpriseName: null,
    rif: null,
    personResponsible: null,
    });

    const [showValues, setShowValues] = useState(false);

    const handleShowValues = () => {
        Alert.alert('Alerta', 'Se han guardado sus datos');
        setShowValues(true);
    };
    const noShowValues = () => {
        setShowValues(false);
    };

// Esto puede ser util mas adelante
//<Text> {empresa.enterpriseName} </Text>
//<Text> {empresa.rif} </Text>
//<Text> {empresa.personResponsible} </Text>

    return (
        <View style = {styles.bigBox}>

            <InputBoxes  textStyle={styles.text} text={'Nombre de la Empresa:'} textInputStyle={styles.littleBox} placeholder={'Ingrese el nombre de la empresa aquí'} placeholderTextColor={'#BEBEBE'} value={enterprise.enterpriseName ?? ''} onChangeText={(text) => setEnterprise({...enterprise, enterpriseName: text})}/>
            <InputBoxes  textStyle={styles.text} text={'RIF de la Empresa:'} textInputStyle={styles.littleBox} placeholder={'Ingrese el RIF de la empresa aquí'} placeholderTextColor={'#BEBEBE'} value={enterprise.rif ?? ''} onChangeText={(text) => setEnterprise({...enterprise, rif: text})}/>
            <InputBoxes  textStyle={styles.text} text={'Encargado de la Empresa:'} textInputStyle={styles.littleBox} placeholder={'Ingrese el nombre del encargado aquí'} placeholderTextColor={'#BEBEBE'} value={enterprise.personResponsible ?? ''} onChangeText={(text) => setEnterprise({...enterprise, personResponsible: text})}/>

            <Button title="mi botoncito" onPress={handleShowValues}/>

            {showValues &&
                <View style={styles.littleBox}>

                    <Text style={styles.text}>{enterprise.enterpriseName}</Text>
                    <Text style={styles.text}>{enterprise.rif}</Text>
                    <Text style={styles.text}>{enterprise.personResponsible}</Text>

                    <Button title="mi botoncito2" onPress={noShowValues}/>
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    littleBox:{
    flex: 1 / 3,
    backgroundColor:'white',
    },
    text:{
    flex: 1 / 3,
    color:'black',
    },
    bigBox:{
        flex: 1,
    },
});
