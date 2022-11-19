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
import { getShopByUser } from "../../../Models/Shop/shop.model"
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ISocialNetwork } from "../../../Models/Shop/shop"

//const Tab = createMaterialTopTabNavigator();

const ProfileShop = ({ ...props }) => {
  const { authState } = useContext(AuthContext);
  const navigation = useNavigation();
  const defaultImage = 'https://st2.depositphotos.com/1001248/8319/v/450/depositphotos_83194622-stock-illustration-store-icon.jpg';
  const [loading, setLoading] = useState(true);
  const [shop, setShop] = useState({ photo: '', name: '', description: '', phonenumber: '', followers: 0, posts: [], networks: Array<ISocialNetwork>() })
  const { shopId } = props;

  useEffect(() => {
    if (loading) {
      getShop();
    }
  })

  const getShop = async () => {
    const shop = await getShopByUser(shopId)
    console.log(shop)
    if (shop) {
      setShop({ photo: shop.photo ? shop.photo : '', name: shop.name, description: shop.description, phonenumber: shop.phoneNumber, followers: shop.followers ? shop.followers : 0, posts: [], networks: shop.networks ? shop.networks : [] })
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
        {shop.networks.map(net => {
          if (net.network === 'FACEBOOK') {
            return <TouchableOpacity onPress={() => openNetworks('facebook')}>
              <Image
                style={[styles.iconsNetworks, CommonStyles.mt_1]}
                source={require('../../../Assets/Icons/facebook.png')}
              />
            </TouchableOpacity>
          }
          if (net.network === 'INSTAGRAM') {
            return <TouchableOpacity onPress={() => openNetworks('instagram')}>
              <Image
                style={[styles.iconsNetworks, CommonStyles.mt_1]}
                source={require('../../../Assets/Icons/instagram.png')}
              />
            </TouchableOpacity>
          }
        })
        }
      </>
    )
  }

  const handleGoBack = () => {
    navigation.navigate('ShopsList');
  };

  return (
    <LinearGradient colors={['#1D5771', '#2A8187', '#46D9B5']} style={styles.container}>
      <Icon
        name="arrow-back-ios"
        size={25}
        color="white"
        style={styles.goBack}
        onPress={handleGoBack}
      />
      <View style={styles.form}>
        <Image
          style={styles.image}
          source={{
            uri: shop.photo ? shop.photo : defaultImage,
          }}
        />
        <View style={CommonStyles.pAll}>
          <Text style={styles.text}>{shop.followers.toString()}</Text>
          <AppText font='bold' fontSize={14}>Seguidores</AppText>
        </View>

        <View style={CommonStyles.pAll}>
          <Text style={styles.text}>{shop.posts.length}</Text>
          <AppText font='bold' fontSize={14}>Publicaciones</AppText>
        </View>

      </View>
      <View style={[CommonStyles.pt_1, CommonStyles.pl_1]}>
        <AppText font='bolder' fontSize={18}>{shop.name}</AppText>
        <Text style={styles.description}>{shop.description}</Text>
        <View style={styles.formNetworks}>
        {getNetworks()}
        </View>
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
    height: 35,
    marginRight: 6,
  },
  button: {
    padding: 8,
    borderRadius: 10
  },
  text: {
    textAlign: "center",
    fontSize: 24,
    color: "white",
    fontFamily: "Montserrat-Bold"
  },
  form: {
    display: "flex",
    flexDirection: "row",
    padding: 20,
    justifyContent: 'space-between'

  },
  goBack: {
    position: 'relative',
    top: '2%',
    left: 20
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
  },
  formNetworks:{
    display: 'flex',
    flexDirection: 'row',
    marginTop: 8
  },
})

export default ProfileShop;