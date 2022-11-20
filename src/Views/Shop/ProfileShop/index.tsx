import { useContext, useEffect, useState } from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import Home from "../../Home"
import Search from "../../Search"
import { useNavigation } from '@react-navigation/native';
import { CommonStyles } from "../../../Assets/Styles"
import AppText from "../../../Components/Common/Text"
import GradientButton from "../../../Components/Common/Button/GradientButton"
import { getShopById } from "../../../Models/Shop/shop.model"
import Icon from 'react-native-vector-icons/MaterialIcons';
import { IShopLight, ISocialNetwork } from "../../../Models/Shop/shop"
import { AuthContext } from "../../../Contexts/appContentProvider"
import AppModal from "../../../Components/Common/AppModal"
import UpdateShop from "../UpdateShop"
import Dialog from "react-native-dialog";

type IModal = {
  selectedShop?: IShopLight;
  hide: () => void;
  show: boolean;
};

const ProfileShop = ({ selectedShop, hide, show }: IModal) => {
  const defaultImage = 'https://st2.depositphotos.com/1001248/8319/v/450/depositphotos_83194622-stock-illustration-store-icon.jpg';
  const [data, setData] = useState({ followers: 0, posts: [], networks: Array<ISocialNetwork>() })
  const [loading, setLoading] = useState(true);
  const [shopUpdateShop, setShopUpdateShop] = useState(false);
  const [shopSelect, setShopSelect] = useState<IShopLight>();
  const [visibleModal, setVisibleModal] = useState(false);


  useEffect(() => {
    if (loading) {
      getShop(selectedShop?.id ? selectedShop?.id : '');
    }
  }, [])

  const getShop = async (id: string) => {
    const shop = await getShopById(id);
    setData({ followers: shop.followers ? shop.followers : 0, posts: [], networks: shop.networks ? shop.networks : [] })
    setLoading(false)
  }

  const openNetworks = (network: string, link: string) => {
    if (network == 'whatsapp') {
      link = 'https://wa.me/506' + selectedShop?.phoneNumber + '?text=Hola.%20¿Me%20das%20información?'
      Linking.openURL(link);
    } else if (network == 'facebook') {
      Linking.openURL('https://es-la.facebook.com/' + link);
    } else if (network == 'instagram') {
      Linking.openURL('https://www.instagram.com/' + link);
    }
  }

  const followUnfollowShop = async () => {

  }

  const updateStateModal = () => {
    setVisibleModal(false)
    setShopSelect(selectedShop)
    setShopUpdateShop(!shopUpdateShop)
  }

  const getNetworks = () => {
    return (
      <>
        {selectedShop?.phoneNumber &&
          <TouchableOpacity onPress={() => openNetworks('whatsapp', '')}>
            <Image
              style={[styles.iconsNetworks, CommonStyles.mt_1]}
              source={require('../../../Assets/Icons/whatsapp.png')}
            />
          </TouchableOpacity>

        }
        {data.networks.map(net => {
          if (net.network === 'FACEBOOK') {
            return <TouchableOpacity onPress={() => openNetworks('facebook', net.link)}>
              <Image
                style={[styles.iconsNetworks, CommonStyles.mt_1]}
                source={require('../../../Assets/Icons/facebook.png')}
              />
            </TouchableOpacity>
          }
          if (net.network === 'INSTAGRAM') {
            return <TouchableOpacity onPress={() => openNetworks('instagram', net.link)}>
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

  return (
    <AppModal show={show}>
      <>
        <LinearGradient colors={['#1D5771', '#2A8187', '#46D9B5']} style={styles.container}>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Icon
              name="arrow-back-ios"
              size={25}
              color="white"
              style={styles.goBack}
              onPress={hide}
            />
            <Icon
              size={25}
              name='menu'
              style={{ top: '2%', marginLeft: 'auto' }}
              color='#ffff'
              onPress={() => setVisibleModal(true)} />
          </View>
          <View >
            <Dialog.Container visible={visibleModal}>
              <Dialog.Title>Editar Tienda</Dialog.Title>
              <Dialog.Description>
                Seguro que deseea editar la tienda?
              </Dialog.Description>
              <Dialog.Button label="Cancelar" onPress={() => setVisibleModal(false)} />
              <Dialog.Button label="Continuar" onPress={updateStateModal} />
            </Dialog.Container>
          </View>
          <View style={styles.form}>
            <Image
              style={styles.image}
              source={{
                uri: selectedShop?.profileImage ? selectedShop.profileImage : defaultImage,
              }}
            />
            <View style={CommonStyles.pAll}>
              <Text style={styles.text}>{data.followers}</Text>
              <AppText font='bold' fontSize={14}>Seguidores</AppText>
            </View>

            <View style={CommonStyles.pAll}>
              <Text style={styles.text}>{data.posts.length}</Text>
              <AppText font='bold' fontSize={14}>Publicaciones</AppText>
            </View>

          </View>
          <View style={[CommonStyles.pt_1, CommonStyles.pl_1]}>
            <AppText font='bolder' fontSize={18}>{selectedShop?.name ? selectedShop.name : ''}</AppText>
            <Text style={styles.description}>{selectedShop?.description}</Text>
            <View style={styles.formNetworks}>
              {getNetworks()}
            </View>
          </View>
          <View style={styles.form}>
            <GradientButton onPress={followUnfollowShop} style={styles.button}>
              <AppText fontSize={16} font="bold" >
                Seguir
              </AppText>
            </GradientButton>
          </View>

          <AppText fontSize={16} font="bold" >
            la cartaaaaa de contenidoooooooos faltaaaaaaaa
          </AppText>

        </LinearGradient>
        <UpdateShop show={shopUpdateShop} shop={shopSelect} hide={updateStateModal} />
      </>
    </AppModal>
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
  formNetworks: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 8
  },
})

export default ProfileShop;