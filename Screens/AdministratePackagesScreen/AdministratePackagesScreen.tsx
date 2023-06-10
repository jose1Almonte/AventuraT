import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { Background } from '../../Layouts/Background';
import { useUser } from '../../Context/UserContext';
import { NavigationProp } from '@react-navigation/native';
import { searchPackagesByEmail, searchPackagesExpiredByEmail } from '../../firebase/SearchPackagesByEmail';
import { deleteAllByEmail, deleteExpiredDocumentsByEmail, deleteSelectedPackage } from '../../firebase/DeletePackage';
import { LoadingScreenTransparentBackground, changePackageIsPublicValue } from '../../firebase/Firestore';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { NavigationProp } from '@react-navigation/native';


const Button = ({buttonStyle, buttonTextStyle, text, onPress}:{buttonStyle: any, buttonTextStyle: any, text: string, onPress: any}) => {
    return (
        <>
            <TouchableOpacity style={buttonStyle} onPress={onPress}>
                <Text style={buttonTextStyle}> {text} </Text>
            </TouchableOpacity>
        </>
    );
};

const CardBox = ({data, handleWantPersonallyErase, changeIsPublic, index, setIndexSelectedPackage, setSelectedPackage, cardBoxStyles, backgroundCardStyles}:{data: any, handleWantPersonallyErase: any, changeIsPublic: any, index: number, setIndexSelectedPackage: any, setSelectedPackage: any, cardBoxStyles: any, backgroundCardStyles: any}) => {

    const startDate = data.startDate.toDate();
    const startDay = startDate.getDate().toString().padStart(2, '0'); // Obtener el día y rellenar con ceros a la izquierda si es necesario
    const startMonth = (startDate.getMonth() + 1).toString().padStart(2, '0'); // Obtener el mes (se suma 1 porque los meses en JavaScript son indexados desde 0) y rellenar con ceros a la izquierda si es necesario
    const startYear = startDate.getFullYear();

    const endDate = data.endDate.toDate();
    const endDay = endDate.getDate().toString().padStart(2, '0'); // Obtener el día y rellenar con ceros a la izquierda si es necesario
    const endMonth = (endDate.getMonth() + 1).toString().padStart(2, '0'); // Obtener el mes (se suma 1 porque los meses en JavaScript son indexados desde 0) y rellenar con ceros a la izquierda si es necesario
    const endYear = endDate.getFullYear();

    const expireDate = data.expireDate.toDate();
    const expireDay = expireDate.getDate().toString().padStart(2, '0'); // Obtener el día y rellenar con ceros a la izquierda si es necesario
    const expireMonth = (expireDate.getMonth() + 1).toString().padStart(2, '0'); // Obtener el mes (se suma 1 porque los meses en JavaScript son indexados desde 0) y rellenar con ceros a la izquierda si es necesario
    const expireYear = expireDate.getFullYear();

    const handleSetIndexSelectedPackage = async () => {
        await setIndexSelectedPackage(index);
    };

    const [dataIsPublic, setDataIsPublic] = useState(data.isPublic);

    return (
        <TouchableOpacity style={cardBoxStyles} onPress={() =>{setSelectedPackage(true); handleSetIndexSelectedPackage();}}>
            <Background style={backgroundCardStyles} image={{uri: data?.mainImageUrl || 'data:image/jpeg;base64,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'}}>
                <View style={styles.backgroundColorCard}>

                    <View style={styles.firstRowCard}>

                        <View style={styles.firstRowLeft}>
                                <Text style={styles.text}>Caduca {expireDay}/{expireMonth}/{expireYear}</Text>
                        </View>

                        <TouchableOpacity style ={styles.firstRowCenter} onPress={() => {changeIsPublic(data, setDataIsPublic);}}>
                            {dataIsPublic ? (
                                    <Text style={styles.text}> Publico </Text>

                                ) : (

                                    <Text style={styles.text}> Privado </Text>
                            )}
                        </TouchableOpacity>

                        <View style={styles.firstRowRight}>
                            <TouchableOpacity style={styles.circle} onPress={() => {handleWantPersonallyErase(data);}}>
                                <View style={styles.imageBox}>
                                    <Image source={require('../../images/TrashCanLogo.png')} style={styles.image}/>
                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View style={styles.secondRowCardBox}>
                        <View style={styles.secondRowCard}>

                            <View style={styles.travelNameBox}>
                                <Text style={styles.bigText}> {data.name} </Text>
                            </View>

                            <View style={styles.datesBox}>
                                <Text style={styles.text}>Fecha inicio: {startDay}/{startMonth}/{startYear}</Text>
                                <Text style={styles.text}>Fecha fin: {endDay}/{endMonth}/{endYear}</Text>
                            </View>

                        </View>
                    </View>
                </View>
            </Background>
        </TouchableOpacity>
    );
};

const SelectedPackageView = ({data, changeIsPublic, setSelectedPackage}:{data: any, changeIsPublic: any, setSelectedPackage: any}) => {

    const [dataIsPublic, setDataIsPublic] = useState(data.isPublic);

    const startDate = data.startDate.toDate();
    const startDay = startDate.getDate().toString().padStart(2, '0'); // Obtener el día y rellenar con ceros a la izquierda si es necesario
    const startMonth = (startDate.getMonth() + 1).toString().padStart(2, '0'); // Obtener el mes (se suma 1 porque los meses en JavaScript son indexados desde 0) y rellenar con ceros a la izquierda si es necesario
    const startYear = startDate.getFullYear();

    const endDate = data.endDate.toDate();
    const endDay = endDate.getDate().toString().padStart(2, '0'); // Obtener el día y rellenar con ceros a la izquierda si es necesario
    const endMonth = (endDate.getMonth() + 1).toString().padStart(2, '0'); // Obtener el mes (se suma 1 porque los meses en JavaScript son indexados desde 0) y rellenar con ceros a la izquierda si es necesario
    const endYear = endDate.getFullYear();

    const expireDate = data.expireDate.toDate();
    const expireDay = expireDate.getDate().toString().padStart(2, '0'); // Obtener el día y rellenar con ceros a la izquierda si es necesario
    const expireMonth = (expireDate.getMonth() + 1).toString().padStart(2, '0'); // Obtener el mes (se suma 1 porque los meses en JavaScript son indexados desde 0) y rellenar con ceros a la izquierda si es necesario
    const expireYear = expireDate.getFullYear();

    const handleSetSelectedPackage = async () => {
        await setSelectedPackage(false);
        // setReady(ready);
    };

    // const changeIsPublic = async () => {
    //     await changePackageIsPublicValue(data.id, !data.isPublic);
    //     data.isPublic = !data.isPublic;
    //     setDataIsPublic(data.isPublic);
    //     // Alert.alert(dataIsPublic.toString());
    // };

    // useEffect(() => {
    //     Alert.alert('Hello');
    // }, [dataIsPublic])

    return (
        <View style={stylesIndividualCard.giantSelectedCard}>

                <View style={stylesIndividualCard.card}>
                    <Background style={styles.backgroundCard} image={{uri: data?.mainImageUrl || 'data:image/jpeg;base64,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'}}>
                        <View style={styles.backgroundColorCard}>

                            <View style={stylesIndividualCard.firstRow}>
                                <View style={stylesIndividualCard.firstRowLeft}>
                                    <View style={stylesIndividualCard.firstRowLeftBox}>
                                        <Text>Edit</Text>
                                    </View>
                                </View>
                                <TouchableOpacity style={stylesIndividualCard.firstRowCenter} onPress={() => {changeIsPublic(data, setDataIsPublic);}}>
                                    {dataIsPublic ? (
                                        <Text style={stylesIndividualCard.bigText}>Público</Text>

                                        ) : (

                                            <Text style={stylesIndividualCard.bigText}>Privado</Text>
                                            )

                                    }
                                </TouchableOpacity>
                                <View style={stylesIndividualCard.firstRowRight}>
                                    <TouchableOpacity style={stylesIndividualCard.firstRowRightBox} onPress={() => {handleSetSelectedPackage();}}>
                                        <Text>Out</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style ={stylesIndividualCard.secondRow}>
                                <View style ={stylesIndividualCard.secondRowDescriptionBox}>
                                <View style={stylesIndividualCard.textBox}>
                                    <Text style={stylesIndividualCard.text}>Nombre de empresa:</Text>
                                    <Text style={stylesIndividualCard.text}>{data.name}</Text>
                                </View>
                                <View style={stylesIndividualCard.textBox}>
                                    <Text style={stylesIndividualCard.text}>Descripción: </Text>
                                    <Text style={stylesIndividualCard.text}>{data.description}</Text>
                                </View>
                                <View style={stylesIndividualCard.textBox}>
                                    <Text style={stylesIndividualCard.text}>Fecha inicio: </Text>
                                    <Text style={stylesIndividualCard.text}>{startDay}/{startMonth}/{startYear}</Text>
                                </View>
                                <View style={stylesIndividualCard.textBox}>
                                    <Text style={stylesIndividualCard.text}>Fecha fin: </Text>
                                    <Text style={stylesIndividualCard.text}>{endDay}/{endMonth}/{endYear}</Text>
                                </View>
                                <View style={stylesIndividualCard.textBox}>
                                    <Text style={stylesIndividualCard.text}>Fecha expira: </Text>
                                    <Text style={stylesIndividualCard.text}>{expireDay}/{expireMonth}/{expireYear}</Text>
                                </View>
                                <View style={stylesIndividualCard.textBox}>
                                    <Text style={stylesIndividualCard.text}>Precio: </Text>
                                    <Text style={stylesIndividualCard.text}>$ {data.price}</Text>
                                </View>
                                <View style={stylesIndividualCard.textBox}>
                                    <Text style={stylesIndividualCard.text}>Rating: </Text>
                                    <Text style={stylesIndividualCard.text}>{data.rating} estrellas</Text>
                                </View>
                                <View style={stylesIndividualCard.textBox}>
                                    <Text style={stylesIndividualCard.text}>Tipo: </Text>
                                    <Text style={stylesIndividualCard.text}>{data.tipo}</Text>
                                </View>
                                </View>
                            </View>

                        </View>
                    </Background>
                </View>

            </View>
    );
};

const WantEraseViewAuxiliar = ({setWantErase, titleText, text1, text2, eraseExpired, setEraseExpired, eraseAll, setEraseAll, ifPressYes}:{setWantErase: any, titleText: string, text1: string, text2: string, eraseExpired: any, setEraseExpired: any, eraseAll: any, setEraseAll: any, ifPressYes: any}) => {

    const handleSaidNoWantToErase = () => {
        if (eraseExpired) {setEraseExpired(false);}
        if (eraseAll) {setEraseAll(false);}
        setWantErase(false);
    };
    return (
        <>
        <View style={stylesWantErase.firstBox}>
            <Text style={stylesWantErase.title}>{titleText}</Text>
        </View>
        <View style={stylesWantErase.secondBox}>
            <Button buttonStyle={stylesWantErase.buttonTop} buttonTextStyle={stylesWantErase.text} text={text1} onPress={()=>{ifPressYes();}}/>
            <Button buttonStyle={stylesWantErase.buttonBottom} buttonTextStyle={stylesWantErase.text} text={text2} onPress={()=>{handleSaidNoWantToErase();}}/>
        </View>
        </>

    );
};

const WantEraseView = ({setWantErase, eraseExpired, setEraseExpired, eraseAll, setEraseAll, handleEraseExpired, handleEraseAll}:{setWantErase: any, eraseExpired: any, setEraseExpired: any, eraseAll: any, setEraseAll: any, handleEraseExpired: any, handleEraseAll: any}) => {
    return (
        <View style={stylesWantErase.giantWantErase}>
            <View style={stylesWantErase.bigBox}>
                {eraseExpired && (
                    <WantEraseViewAuxiliar setWantErase={setWantErase} titleText={'¿Estas segur@ de borrar expirados?'} text1="Si, borra esa vaina" text2="No vale, pobrecito" eraseExpired={eraseExpired} setEraseExpired={setEraseExpired} eraseAll={eraseAll} setEraseAll={setEraseAll} ifPressYes={handleEraseExpired}/>
                    )
                }
                {eraseAll && (
                    <WantEraseViewAuxiliar setWantErase={setWantErase} titleText={'¿Estas segur@ de borrar todo?'} text1="Si, borra esa vaina" text2="No vale, pobrecito" eraseExpired={eraseExpired} setEraseExpired={setEraseExpired} eraseAll={eraseAll} setEraseAll={setEraseAll} ifPressYes={handleEraseAll}/>
                )}
            </View>
        </View>
    );
};

const AdministratePackagesScreen = ({navigation}:{navigation: NavigationProp<Record<string, object | undefined>>;}) => {
    const {user} = useUser();
    const [ready, setReady] = useState(false);
    const [searchingExpiredPackages, setSearchingExpiredPackages] = useState(false);
    const [documents, setDocuments] = useState<Document[]>([]);
    const [selectedPackage, setSelectedPackage] = useState(false);
    const [indexSelectedPackage, setIndexSelectedPackage] = useState(0);

    const [wantErase, setWantErase] = useState(false);
    const [eraseExpired, setEraseExpired] = useState(false);
    const [eraseAll, setEraseAll] = useState(false);

    const [wantPersonallyErase, setWantPersonallyErase] = useState(false);
    const [dataToErasePersonally, setDataToErasePersonally] = useState<Partial<Record<string, any>>>({});
    const [loadingSomeThing, setLoadingSomething] = useState(false);

    const handleWantPersonallyErase = (data: Partial<Record<string, any>>) => {
        setDataToErasePersonally(data);
        setWantPersonallyErase(true);
    };

    const handleTrashCanPress = useCallback(
        async (data: Partial<Record<string, any>>) => {
            setLoadingSomething(true);
            await deleteSelectedPackage(data.id);
            // console.log('Estamos en handleTrash', 'VAMOOO TUUTUT')
            setWantPersonallyErase(false);
            if (!ready){
                setReady(true);
            } else {
                setReady(false);
            }
            setLoadingSomething(false);

        },[ready]
    );

    const handleSetConfirmationToEraseAll = async () => {
        setEraseAll(true);
        setWantErase(true);
    };

    const handleSetConfirmationToEraseExpired = async () => {
        setEraseExpired(true);
        setWantErase(true);
    };

    const handleEraseExpired = async () => {
        setLoadingSomething(true);
            const emailEnterprise = user?.email;
            const packagesExist = await deleteExpiredDocumentsByEmail(emailEnterprise);

            if (!ready){
                setReady(true);
            } else {
                setReady(false);
            }
            if (eraseExpired) {setEraseExpired(false);}
            if (eraseAll) {setEraseAll(false);}
            setWantErase(false);
            if (packagesExist){Alert.alert('Listo', 'Se han borrado todos los paquetes expirados de forma exitosa');} else {Alert.alert('Nada', 'Nada que borrar');}
            setLoadingSomething(false);

        };

        const handleEraseAll = async () => {
            setLoadingSomething(true);
            const emailEnterprise = user?.email;
            const packagesExist = await deleteAllByEmail(emailEnterprise);
            if (!ready){
                setReady(true);
            } else {
                setReady(false);
            }
            if (eraseExpired) {setEraseExpired(false);}
            if (eraseAll) {setEraseAll(false);}
            setWantErase(false);

            if (packagesExist){Alert.alert('Listo', 'Se han borrado todos los paquetes de forma exitosa');} else {Alert.alert('Nada', 'Nada que borrar');}
            setLoadingSomething(false);
        };

        const changeIsPublic = async (data: { id: { toString: () => string | undefined; }; isPublic: boolean; }, setDataIsPublic: (arg0: boolean) => void) => {
            setLoadingSomething(true);
            await changePackageIsPublicValue(data.id, !data.isPublic);
            data.isPublic = !data.isPublic;
            setDataIsPublic(data.isPublic);
            setLoadingSomething(false);
            // Alert.alert(dataIsPublic.toString());
        };

        useEffect(()=>{
            if (!user){
            Alert.alert('Te pasaste man, no estas logeado');
            navigation.navigate('HomeScreen');
        }
    },[user, navigation]);

    useEffect(()=>{
        const handleQuerySnapshot = async () => {
                setLoadingSomething(true);
                try {
                    let querySnapshot;
                    if (searchingExpiredPackages){
                        querySnapshot = await searchPackagesExpiredByEmail(user?.email);
                    } else {
                        querySnapshot = await searchPackagesByEmail(user?.email);
                    }


                    const docs = querySnapshot.docs.map((doc) => doc.data());
                    setDocuments(docs);
                    // console.log('DOCS: ', docs);
                } catch (error){
                    // console.warn(error);
                    console.log(error);
                }
                setLoadingSomething(false);
            };

            handleQuerySnapshot();
    }, [user?.email, ready, searchingExpiredPackages]);


    return (
    <>
        {loadingSomeThing && (
            <LoadingScreenTransparentBackground/>
        )}
        {wantErase && (
            <WantEraseView setWantErase={setWantErase} eraseExpired={eraseExpired} setEraseExpired={setEraseExpired} eraseAll={eraseAll} setEraseAll={setEraseAll} handleEraseExpired={handleEraseExpired} handleEraseAll={handleEraseAll}/>
        )}

        {selectedPackage && (
            <SelectedPackageView data={documents[indexSelectedPackage]} changeIsPublic={changeIsPublic} setSelectedPackage={setSelectedPackage}/>
        )}

        {wantPersonallyErase && (
            <View style={stylesWantErase.giantWantErase}>
                <View style={stylesWantErase.bigBox}>
                    <View style={stylesWantErase.firstBox}>
                        <Text style={stylesWantErase.title}>¿Quieres borrar el paquete "{dataToErasePersonally.name}" ?</Text>
                    </View>
                    <View style={stylesWantErase.secondBox}>
                        <Button buttonStyle={stylesWantErase.buttonTop} buttonTextStyle={stylesWantErase.text} text = "Si, borra ese paquete"   onPress={()=>{handleTrashCanPress(dataToErasePersonally);}}/>
                        <Button buttonStyle={stylesWantErase.buttonBottom} buttonTextStyle={stylesWantErase.text} text="No, no borres ese paquete" onPress={()=>{setWantPersonallyErase(false);}}/>
                    </View>
                </View>
            </View>
        )}

        <View style={styles.giantBox}>
        <View style={styles.firstBox}>
            <TouchableOpacity style={styles.comebackButtonBox}>
                <Image source={require('../../images/comeBackLogo.png')}/>
            </TouchableOpacity>
            <View style={styles.titleBox}>
                <Text style={styles.title}>AventuraT con tus Paquetes</Text>
            </View>
            <View style={styles.profilePictureBox}>
                <TouchableOpacity style={styles.profilePictureMiniBox}>
                <Image source={{uri: user?.photoURL || 'data:image/png;base64,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'}} style={styles.image}/>
                </TouchableOpacity>
            </View>
        </View>

        <View style={styles.secondBox}>

            <View style={styles.buttonsBox}>

                <Button buttonStyle={styles.button} buttonTextStyle={styles.buttonText} text="Todos los paquetes" onPress={()=>{setSearchingExpiredPackages(false);}}/>
                <Button buttonStyle={styles.button} buttonTextStyle={styles.buttonText} text="Paquetes caducados" onPress={()=>{setSearchingExpiredPackages(true);}}/>
                <Button buttonStyle={styles.buttonEraseExpired} buttonTextStyle={styles.buttonText} text="Borrar caducados" onPress={() => {handleSetConfirmationToEraseExpired();}}/>
                <Button buttonStyle={styles.buttonEraseAll} buttonTextStyle={styles.buttonText} text="Eliminar TODO" onPress={() => {handleSetConfirmationToEraseAll();}}/>

            </View>


        </View>




        <View style={styles.thirdBox}>
            <ScrollView style={styles.scrollView} contentContainerStyle = {styles.scrollViewContentContainerStyle}>

                {documents.map((document, index) => (
                    <CardBox key={index} data={document} handleWantPersonallyErase={handleWantPersonallyErase} changeIsPublic={changeIsPublic} index={index} setIndexSelectedPackage={setIndexSelectedPackage} setSelectedPackage={setSelectedPackage} cardBoxStyles={styles.cardBox} backgroundCardStyles={styles.backgroundCard}/>
                ))}

                {/* <CardBox cardBoxStyles={styles.cardBox} backgroundCardStyles={styles.backgroundCard}/> */}
                {/* <CardBox cardBoxStyles={styles.cardBox} backgroundCardStyles={styles.backgroundCard}/>
                <CardBox cardBoxStyles={styles.cardBox} backgroundCardStyles={styles.backgroundCard}/>
                <CardBox cardBoxStyles={styles.cardBox} backgroundCardStyles={styles.backgroundCard}/> */}

            </ScrollView>
        </View>


        </View>
    </>
  );
};

export default AdministratePackagesScreen;

const styles = StyleSheet.create({
    giantBox:{
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    firstBox:{
        flex: 10.25,
        // backgroundColor: 'yellow',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },

    secondBox:{
        flex: 22.5,
        justifyContent: 'center',
        alignItems: 'center',
    },

    thirdBox:{
        flex: 67.25,
        backgroundColor: '#1DB5BE',
        alignItems: 'center',
    },

    scrollView:{
        // backgroundColor: 'red',
        width: '100%',
    },

    scrollViewContentContainerStyle:{
        alignItems: 'center',

    },

    comebackButtonBox:{
        width: '16.25%',
        // backgroundColor:'black',
        alignItems: 'center',
        justifyContent: 'center',
        height: '73.17%',
    },
    titleBox:{
        width: '67.5%',
        // backgroundColor:'green',
        // justifyContent: 'center',
        alignItems:'center',
        justifyContent: 'center',
        height: '73.17%',
    },
    profilePictureBox:{
        width: '16.25%',
        // backgroundColor:'black',
        height: '73.17%',
        // borderRadius: 50,
        // overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title:{
        // fontFamily: 'Poppins',
        // fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 20,
        lineHeight: 30,
        textAlign: 'center',
        color: '#000000',
    },

    buttonsBox:{
        width: '86.67%',
        height: '63.33%',
        // backgroundColor: 'blue',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },

    button:{
        height: '37.72%',
        width: '41.35%',
        backgroundColor: '#1881B1',
        borderRadius: 8,
        marginBottom: '8.2%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonEraseExpired:{
        height: '37.72%',
        width: '41.35%',
        backgroundColor: '#0B6087',
        borderRadius: 8,
        marginBottom: '8.2%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonEraseAll:{
        height: '37.72%',
        width: '41.35%',
        backgroundColor: '#940A0A',
        borderRadius: 8,
        marginBottom: '8.2%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonText:{
        fontWeight: '700',
        fontSize: 11,
        lineHeight: 16,
        textAlign: 'center',
        color: '#FFFFFF',
    },

    cardBox:{
        width: '86.67%',
        // backgroundColor: 'green',
        marginTop: '3%',
        height: 128,
        // height: '23.79%',
        borderRadius: 20,
        borderColor: 'black',
        borderWidth: 2,
    },

    backgroundCard:{
        flex: 1,
        borderRadius: 20,
        overflow: 'hidden',
    },

    firstRowCard:{
        flexDirection: 'row',
        // backgroundColor: 'red',
        height: '24.22%',
        width: '100%',
        justifyContent: 'space-between',
    },

    firstRowLeft:{
        width: '33.65%',
        height: '100%',
        // backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 20,
        borderBottomLeftRadius: 0,
        borderTopRightRadius: 0, // Si deseas aplicar un radio diferente a las esquinas superiores derechas
        borderBottomRightRadius: 20, // Si deseas aplicar un radio diferente a las esquinas inferiores derechas
    },

    firstRowCenter:{
        width: '33.65%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
        // backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',

    },

    firstRowRight:{
        // backgroundColor: 'green',
        width: '9.94%',
        height: '100%',
        justifyContent: 'center',
    },

    circle:{
        height: '83.87%',
        width: '83.87%',
        // backgroundColor: 'blue',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
    },

    imageBox:{
        width: '47%',
        height: '47%',
    },

    image:{
        flex: 1,
        width: undefined,
        height: undefined,
        resizeMode: 'cover',
    },

    secondRowCardBox:{
        width: '100%',
        height: '75.78%',
        // backgroundColor: 'white',
        justifyContent: 'flex-end',
    },

    secondRowCard: {
        flexDirection: 'row',
        // backgroundColor: 'red',
        height: '38.45%',
        width: '100%',
        alignSelf: 'flex-end',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    travelNameBox:{
        height: '100%',
        width: '51.92%',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'black',
    },

    datesBox:{
        height: '100%',
        width: '48.08%',
        justifyContent: 'center',
        alignItems: 'center',

        // backgroundColor: 'black',

    },

    bigText:{
        fontFamily: 'Poppins-Regular',
        color: 'black',
        fontWeight: '500',
        fontSize: 10,
        lineHeight: 18,
        display: 'flex',
    },

    text:{
        color: 'black',
        fontWeight: '500',
        fontSize: 9,
        lineHeight: 14,
        margin: '1%',
    },

    profilePictureMiniBox:{
        width: '51.28%',
        height: '50%',
        borderRadius: 50,
        overflow: 'hidden',
    },
    backgroundColorCard:{
        flex: 1,
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },

});

const stylesIndividualCard = StyleSheet.create({
    giantSelectedCard:{
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: '100%',
        backgroundColor: 'blackrgba(0, 0, 0, 0.36)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
        // borderColor: 'black',
        // borderWidth: 2,
    },

    card:{
        width: '85%',
        height: '47.125%',
        backgroundColor: 'white',
        borderRadius: 20,
        borderColor: 'black',
        borderWidth: 2,
    },

    firstRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: '14.324%',
    },

    firstRowLeft: {
        width: '17.647%',
        height: '100%',
        // backgroundColor: 'rgba(0, 0, 0, 0.28)',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },

    firstRowLeftBox:{
        width: '70%',
        height: '70%',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        // backgroundColor:'red',

    },

    firstRowCenter: {
        width: '42.157%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderBottomStartRadius: 20,
        borderBottomEndRadius: 20,
    },

    firstRowRight: {
        width: '17.647%',
        height: '100%',
        // backgroundColor: 'rgba(0, 0, 0, 0.28)',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    firstRowRightBox:{
        width: '70%',
        height: '70%',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        // backgroundColor:'red',

    },

    secondRow: {
        height: '85.676%',
        justifyContent: 'flex-end',
    },

    secondRowDescriptionBox:{
        alignItems: 'center',
        height: '88.235%',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 20,
    },

    bigText:{
        fontFamily: 'Poppins-Regular',
        color: 'black',
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 18,
        display: 'flex',
    },

    textBox:{
        width: '80%',
        // backgroundColor: 'red',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // backgroundColor: 'rgba(255,255,255,0.3)',
        padding: '2%',
        marginVertical: '1%',
    },

    text:{
        fontFamily: 'Poppins-Regular',
        color: 'black',
        fontWeight: '500',
        fontSize: 12,
        lineHeight: 18,
        display: 'flex',
    },

});

const stylesWantErase = StyleSheet.create({
    giantWantErase:{
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: '100%',
        backgroundColor: 'blackrgba(0, 0, 0, 0.36)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
    },
    bigBox:{
        width: '85%',
        // backgroundColor: 'rgba(255, 255, 255, 0.77)',
        backgroundColor: '#FFFFFF',
        height: 172,
        borderRadius: 20,
        // justifyContent: 'center',
        // alignItems: 'center',
    },

    firstBox:{
        width: '100%',
        height: '25.581%',
        // backgroundColor: 'green',
        // borderRadius: 20,
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',

    },

    secondBox:{
        width: '100%',
        height: '74.419%',
        // backgroundColor: 'black',
        // borderRadius: 20,
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

    title:{
        fontWeight: '500',
        fontSize: 16,
        lineHeight: 24,
        color: '#333333',
    },

    text:{
        fontFamily: 'Poppins-Regular',
        fontWeight: '700',
        fontSize: 18,
        lineHeight: 27,
        color: '#FFFFFF',
    },

    buttonTop:{
        backgroundColor: '#630D0D',
        width: '81.046%',
        height: 43,
        marginTop: '4.667%',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonBottom:{
        backgroundColor: '#1881B1',
        width: '81.046%',
        height: 43,
        marginVertical: '4.667%',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },

});
