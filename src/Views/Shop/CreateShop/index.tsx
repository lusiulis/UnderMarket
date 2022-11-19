import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import AppText from "../../../Components/Common/Text";
import Icons from 'react-native-vector-icons/MaterialIcons';
import { useContext, useEffect, useState } from "react";
import Input from "../../../Components/Common/Input";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { addShop, createShop, getUserShops } from "../../../Models/Shop/shop.model";
import { AuthContext } from "../../../Contexts/app.context.provider";
import { CommonStyles } from "../../../Assets/Styles";
import GradientButton from "../../../Components/Common/Button/GradientButton";
import { useNavigation } from "@react-navigation/native";
import { ISocialNetwork } from "../../../Models/Shop/shop";

const CreateShop = () => {
    const defaultImage = 'https://st2.depositphotos.com/1001248/8319/v/450/depositphotos_83194622-stock-illustration-store-icon.jpg';
    const [showCamera, setShowCamera] = useState(true);
    const [formData, setFormData] = useState({ name: '', description: '', photo: '', phoneNumber: '', address: '', networks: [] as Array<ISocialNetwork> })
    const [loading, setLoading] = useState(true);
    const { authState } = useContext(AuthContext);
    const [shopId, setShopId] = useState('');
    const navigation = useNavigation();
    const [accordionState, SetAccordionState] = useState(false)
    const [updatedHeight, setUpdatedHeight] = useState(0)
    const [facebook, setFacebook] = useState('')
    const [instagram, setInstagram] = useState('')

    useEffect(() => {
        if (loading) {
            getShop();
        }
    }, [])

    const getShop = async () => {
        const shops = await getUserShops(String(authState.profile?.id))
        if (shops.length > 0) {
            setLoading(false);
            setShopId(shops[0].id)
        }
    }

    const handleShowCameraModal = () => {
        setShowCamera(!showCamera)
    }

    const handleInputChange = (value: string, input: string) => {
        if (input === 'name') {
            setFormData({ ...formData, name: value })
        } else if (input === 'description') {
            setFormData({ ...formData, description: value })
        } else if (input === 'photo') {
            setFormData({ ...formData, photo: value })
        } else if (input === 'phoneNumber') {
            setFormData({ ...formData, phoneNumber: value })
        }
        else if (input === 'address') {
            setFormData({ ...formData, address: value })
        }
        else if (input === 'facebook') {
            setFacebook(value)
        }
        else if (input === 'instagram') {
            setInstagram(value)
        }

    };

    const validateForm = () => {
        return !formData.name || !formData.description || !formData.phoneNumber;
    }

    const getNetworks = () => {

    }
    const saveShop = async () => {
        let networks: Array<ISocialNetwork> = [];
        if (facebook !== '') {
            networks.push({ network: 'FACEBOOK', link: facebook })
        }
        if (instagram !== '') {
            networks.push({ network: 'INSTAGRAM', link: facebook })
        }

        await createShop({ ...formData, userId: String(authState.profile?.id) }, networks ? networks : []).then(x => {
            console.log('creado correctamente');
            navigation.navigate('Profile');
        }).catch(error => {
            console.log(error)
        });
    }

    const accordion = () => {
        SetAccordionState(!accordionState);
        if (accordionState) {
            setUpdatedHeight(0)
        } else {
            setUpdatedHeight(160)
        }
    }

    const handleGoBack = () => {
        navigation.navigate('Profile');
    };

    return (
        <LinearGradient colors={['#1D5771', '#2A8187', '#46D9B5']}
            style={styles.container}>
            <ScrollView >
                <View>
                    <Icon
                        name="arrow-back-ios"
                        size={25}
                        color="white"
                        style={styles.goBack}
                        onPress={handleGoBack}
                    />
                    <View style={styles.content}>
                        <Image
                            source={{ uri: defaultImage }
                            }
                            style={styles.image}
                        />
                        <Icons name='camera-enhance' size={35} style={styles.camera} color='black' onPress={handleShowCameraModal} />
                        <View>
                            <AppText style={CommonStyles.mb_1} fontSize={15} font="bolder">Nombre</AppText>
                            <Input
                                backgroundColor={'#FFFFFF4F'}
                                value={formData.name}
                                placeHolder="Nombre de la tienda"
                                icon="store"
                                onChange={value => handleInputChange(value, 'name')}
                            />
                        </View>
                        <View style={CommonStyles.mt_2}>
                            <AppText style={CommonStyles.mb_1} fontSize={15} font="bolder">Descripción</AppText>
                            <Input
                                style={CommonStyles.pt_1}
                                backgroundColor={'#FFFFFF4F'}
                                value={formData.description}
                                placeHolder="Descripción"
                                icon="title"
                                onChange={value => handleInputChange(value, 'description')}
                            />
                        </View>
                        <View style={CommonStyles.mt_2}>
                            <AppText style={CommonStyles.mb_1} fontSize={15} font="bolder">Número de Teléfono</AppText>
                            <Input
                                backgroundColor={'#FFFFFF4F'}
                                value={formData.phoneNumber}
                                placeHolder="Número de Teléfono"
                                icon="phone"
                                onChange={value => handleInputChange(value, 'phoneNumber')}
                            />
                        </View>

                        <View style={CommonStyles.mt_2}>
                            <AppText style={CommonStyles.mb_1} fontSize={15} font="bolder">Dirección</AppText>
                            <Input
                                backgroundColor={'#FFFFFF4F'}
                                value={formData.address}
                                placeHolder="Dirección"
                                icon="place"
                                onChange={value => handleInputChange(value, 'address')}
                            />
                        </View>
                        <View style={[styles.accordionHolder, { marginTop: 30 }]}>

                            <TouchableOpacity activeOpacity={0.5} onPress={() => accordion()} style={styles.Button}>
                                <AppText fontSize={15} font="bolder">Redes Sociales</AppText>
                            </TouchableOpacity>

                            <View style={{ height: updatedHeight, overflow: 'hidden' }}>
                                <View style={CommonStyles.mt_2}>
                                    <Input
                                        backgroundColor={'#FFFFFF19'}
                                        value={facebook}
                                        placeHolder="Facebook"
                                        icon="facebook"
                                        onChange={value => handleInputChange(value, 'facebook')}
                                    />
                                </View>
                                <View style={CommonStyles.mt_2}>
                                    <Input
                                        backgroundColor={'#FFFFFF19'}
                                        value={instagram}
                                        placeHolder="Instagram"
                                        icon="center-focus-strong"
                                        onChange={value => handleInputChange(value, 'instagram')}
                                    />
                                </View>
                            </View>
                        </View>
                        <GradientButton style={styles.button} onPress={saveShop} disabled={validateForm()}>
                            <AppText font="bold" fontSize={16}>
                                Guardar
                            </AppText>
                        </GradientButton>
                    </View>
                </View>
            </ScrollView>
        </LinearGradient>

    );
}

const styles = StyleSheet.create({
    accordionHolder: {
        borderWidth: 1,
        borderColor: '#FFFFFF4F',
        borderRadius: 10,
        width: '78%',
    },
    goBack: {
        position: 'absolute',
        top: '4%',
        left: 20
    },
    Button: {
        padding: 13.5,
        backgroundColor: '#FFFFFF4F',
        borderRadius: 10,
    },
    button: {
        padding: 12,
        borderRadius: 10,
        marginTop: 30,
    },
    content: {
        paddingTop: 30,
        alignItems: 'center',
    },
    camera: {
        padding: 3,
        backgroundColor: 'rgba(0, 0, 0, 0.3);',
        borderRadius: 100,
        top: -30,
        right: -40
    },
    image: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        width: 120,
        height: 120,
        backgroundColor: "white"
    },
    container: {
        flex: 1,
    },
    backgroud: {
    },
    form: {
        width: '90%',
        paddingVertical: '5%',
        justifyContent: 'space-between',
    },

});
export default CreateShop;