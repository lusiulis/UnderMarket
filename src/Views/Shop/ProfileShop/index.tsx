import { useContext, useEffect, useState } from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import Home from "../../Home"
import Search from "../../Search"
import { useNavigation } from '@react-navigation/native';
import { CommonStyles } from "../../../Assets/Styles"
import AppText from "../../../Components/Common/Text"
import GradientButton from "../../../Components/Common/Button/GradientButton"
import { AuthContext } from "../../../Contexts/app.context.provider"
import { getUserShops } from "../../../Models/Shop/shop.model"

//const Tab = createMaterialTopTabNavigator();

const ProfileShop = () => {
  const { authState } = useContext(AuthContext);
  const navigation = useNavigation();
  const defaultImage = 'https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255710-stock-illustration-avatar-vector-male-profile-gray.jpg';
  const [loading, setLoading] = useState(true);
  const [shop, setShop] = useState({ name: '', description: '', phonenumber: '' })

  useEffect(() => {
    if (loading) {
      getShop();
    }
  })

  const getShop = async () => {
    const shops = await getUserShops(String(authState.profile?.id))
    if (shops.length > 0) {
      setShop({ name: shops[0].name, description: shops[0].description, phonenumber: shops[0].phoneNumber })
      setLoading(false)
    }
  }
  const openNetworks = (data: string) => {
    if (data == 'whatsapp') {
      Linking.openURL(`https://wa.me/{shops[0].phoneNumber.replace('+','')}`);
    }
  }
  const getNetworks = () => {
    return (
      <>
        {shop.phonenumber &&
          <TouchableOpacity onPress={() => openNetworks('whatsapp')}>
            <Image
              style={[styles.iconsNetworks, CommonStyles.mt_1]}
              source={require('../../../Assets/Icons/whatsapp.png')}
            />
          </TouchableOpacity>

        }

      </>

    )
  }

  return (
    <LinearGradient colors={['#1D5771', '#2A8187', '#46D9B5']} style={styles.container}>
      <View style={styles.form}>
        <Image
          style={styles.image}
          source={{
            uri: authState.profile?.profileImage ? authState.profile.profileImage : defaultImage,
          }}
        />
        <View style={CommonStyles.pAll}>
          <Text style={styles.text}>2</Text>
          <AppText font='bold' fontSize={14}>Seguidores</AppText>
        </View>

        <View style={CommonStyles.pAll}>
          <Text style={styles.text}>2</Text>
          <AppText font='bold' fontSize={14}>Publicaciones</AppText>
        </View>

      </View>
      <View style={[CommonStyles.pt_1, CommonStyles.pl_1]}>
        <AppText font='bolder' fontSize={18}>{shop.name}</AppText>
        <Text style={styles.description}>{shop.description}</Text>
        {getNetworks()}
      </View>
      <View style={styles.form}>
        <GradientButton onPress={() => null} style={styles.button}>
          <AppText fontSize={16} font="bold" >
            Seguir
          </AppText>
        </GradientButton>
      </View>

      <AppText fontSize={16} font="bold" >
        la cartaaaaa de contenidoooooooos faltaaaaaaaa
      </AppText>

    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  iconsNetworks: {
    borderRadius: 50,
    width: 35,
    height: 35
  },
  button: {
    padding: 8,
    borderRadius: 10
  },
  text: {
    textAlign: "center",
    fontSize: 22,
    color: "white",
    fontFamily: "Montserrat-Bold"
  },
  form: {
    display: "flex",
    flexDirection: "row",
    padding: 20,
    justifyContent: 'space-between'

  },
  container: {
    flex: 1,
  },
  image: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    width: 70,
    height: 70,
    backgroundColor: "white"
  },
  description: {
    paddingTop: 10,
    fontSize: 16,
    width: "100%",
    color: "#D8D8D8"
  }
})

export default ProfileShop;