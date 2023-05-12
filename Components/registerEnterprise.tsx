import { Text, Alert, TextInput, Button ,View, StyleSheet} from 'react-native'
import React from 'react'
import { useState} from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';

interface Empresa {
    enterpriseName: string | null;
    rif: string | null;
    personResponsible: string | null;
    
}

const styles = StyleSheet.create({
    cajita:{
    flex: 1/3,
    backgroundColor:'white',
    },
    texto:{
    flex: 1/3,
    color:"black",
    },
    cajota:{
        flex: 1
    }
});

export default function RegisterEnterprise() {

    const [empresa, setEmpresa] = useState<Empresa>({
      enterpriseName: null,
      rif: null,
      personResponsible: null,
    });

    const [mostrarValores, setMostrarValores] = useState(false);

    const handleMostrarValores = () => {
        Alert.alert("Alerta", "Se han guardado sus datos")
        setMostrarValores(true);
    }
    const noMostrarValores = () => {
        setMostrarValores(false);
    }

// Esto puede ser util mas adelante
//<Text> {empresa.enterpriseName} </Text>
//<Text> {empresa.rif} </Text>
//<Text> {empresa.personResponsible} </Text>

    return (
        <View style = {styles.cajota}>
            <View>
                <Text style = {styles.texto}> Nombre de la Empresa: </Text>
                <TextInput
                style = {styles.cajita}
                placeholder="Ingrese el nombre de la empresa aquí"
                placeholderTextColor="#BEBEBE"
                value={empresa.enterpriseName ?? ''} 
                onChangeText={(text) => setEmpresa({...empresa, enterpriseName: text})}/>
                
            </View>
            <View>
                <Text style = {styles.texto}> RIF de la Empresa: </Text>
                <TextInput
                style = {styles.cajita}
                placeholder="Ingrese el RIF de la empresa aquí"
                placeholderTextColor="#BEBEBE"
                value={empresa.rif ?? ''} 
                onChangeText={(text) => setEmpresa({...empresa, rif: text})}/>
                
            </View>
            <View>
                <Text style = {styles.texto}> Encargado de la Empresa: </Text>
                <TextInput
                style = {styles.cajita}
                placeholder="Ingrese el nombre del encargado aquí"
                placeholderTextColor="#BEBEBE"
                value={empresa.personResponsible ?? ''} 
                onChangeText={(text) => setEmpresa({...empresa, personResponsible: text})}/>
                
            </View>
            <Button
                title='mi botoncito'
                onPress={handleMostrarValores} 
            />
            {mostrarValores &&
                <View style={styles.cajita}>
                <Text style={styles.texto}>{empresa.enterpriseName}</Text>
                <Text style={styles.texto}>{empresa.rif}</Text>
                <Text style={styles.texto}>{empresa.personResponsible}</Text>
                <Button
                    title='mi botoncito2'
                    onPress={noMostrarValores}
                />
                </View>
            }
        </View>
        
    )
        
}
