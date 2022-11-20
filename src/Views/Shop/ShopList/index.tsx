import { useNavigation } from "@react-navigation/native"
import { useContext, useEffect, useState } from "react"
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import Icon from 'react-native-vector-icons/MaterialIcons';
import GradientButton from "../../../Components/Common/Button/GradientButton"
import AppText from "../../../Components/Common/Text"
import { IAppScreenProps } from "../../../Components/Navigation/navigation";
import AuthWidget from "../../../Components/Widgets/AuthWIdget";
import { AuthContext } from "../../../Contexts/appContentProvider";
import { IShopLight } from "../../../Models/Shop/shop"
import { getUserShops } from "../../../Models/Shop/shop.model"
import ProfileShop from "../ProfileShop";

const ShopsList = ({ navigation }: IAppScreenProps) => {
    const [loading, setLoading] = useState(true);
    const { authState } = useContext(AuthContext);
    const [shops, setShops] = useState(Array<IShopLight>());
    const defaultImage = 'https://st2.depositphotos.com/1001248/8319/v/450/depositphotos_83194622-stock-illustration-store-icon.jpg';
    const [showModal, setShowModal] = useState(false);
    const [selectedShop, setSelectedShop] = useState<IShopLight>();

    useEffect(() => {
        if (loading) {
            getShops();
        }
    }, [])

    const updateStateModal = () => setShowModal(!showModal)

    const getShops = async () => {
        const shopsRes = await getUserShops(String(authState.profile?.id));
        setShops(shopsRes)
        if (shops.length > 0) {
            setLoading(false);
        }
    }

    const newShop = () => {
        navigation.navigate('NewShop')
    }

    const handleGoBack = () => {
        navigation.navigate('Profile');
    };

    const viewShop = async (shop: IShopLight) => {
        setSelectedShop(shop)
        setShowModal(!showModal)
    }

    return (
        <>
            {authState.isAunthenticated ? (
                <>
                    <LinearGradient colors={['#1D5771', '#2A8187', '#46D9B5']}
                        style={styles.container}>
                        <View style={styles.content}>
                            <Icon
                                name="arrow-back-ios"
                                size={25}
                                color="white"
                                style={styles.goBack}
                                onPress={handleGoBack}
                            />
                            <ScrollView >
                                <>
                                    <GradientButton style={styles.button} onPress={() => newShop()}>
                                        <AppText style={{ textAlign: 'center' }} font="bold" fontSize={16}>
                                            Crear Tienda
                                        </AppText>
                                    </GradientButton>

                                    {shops.map(shop => (
                                        <TouchableOpacity onPress={() => viewShop(shop)}>
                                            <View style={styles.form}>
                                                <Image
                                                    style={styles.image}
                                                    source={{
                                                        uri: shop.profileImage ? shop.profileImage?.toString() : defaultImage,
                                                    }} />
                                                <AppText style={{ paddingTop: 20, paddingLeft: 13 }} font="bold" fontSize={18}>{shop.name}</AppText>
                                            </View>
                                        </TouchableOpacity>

                                    ))}

                                </>
                            </ScrollView>
                        </View>
                    </LinearGradient>
                    <ProfileShop show={showModal} selectedShop={selectedShop} hide={updateStateModal} />
                </>
            ) : (
                <AuthWidget />
            )}
        </>


    )

}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    goBack: {
        position: 'relative',
        top: '4%',
    },
    content: {
        width: '90%',
        alignSelf: 'center'
    },
    button: {
        padding: 12,
        borderRadius: 10,
        marginTop: 30,
        marginBottom: 20
    },
    image: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        width: 70,
        height: 70,
        backgroundColor: "white",

    },
    form: {
        display: "flex",
        flexDirection: "row",
        padding: 8,
        justifyContent: 'flex-start',
        backgroundColor: '#FFFFFF4F',
        borderRadius: 10,
        marginVertical: 6,
    },
})
export default ShopsList