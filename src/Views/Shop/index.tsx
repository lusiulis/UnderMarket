import {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {CommonStyles} from '../../Assets/Styles';
import AppText from '../../Components/Common/Text';
import GradientButton from '../../Components/Common/Button/GradientButton';
import {getShopById} from '../../Models/Shop/shop.model';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {IShop, IShopLight, ISocialNetwork} from '../../Models/Shop/shop';
import AppModal from '../../Components/Common/AppModal';
import {IContentCard} from '../../Models/Content/Content';
import ContentList from '../../Components/Widgets/Content/ContentList';
import {getContentsByShopId} from '../../Models/Content';
import {ScrollView} from 'react-native-gesture-handler';
import {IScreenProps} from '../../Components/Navigation/navigation';
import {Initializer} from '../../Utils';

const Shop = ({route, navigation}: IScreenProps) => {
  const defaultImage =
    'https://st2.depositphotos.com/1001248/8319/v/450/depositphotos_83194622-stock-illustration-store-icon.jpg';

  const [shopInfo, setShopInfo] = useState<IShop>(Initializer.IShop);

  useEffect(() => {
    getShop(route.params.id);
  }, []);

  const getShop = async (id: string) => {
    const shop = await getShopById(id);
    setShopInfo(shop);
  };

  const openNetworks = (data: string) => {
    if (data == 'whatsapp') {
      Linking.openURL(`https://wa.me/{shops[0].phoneNumber.replace('+','')}`);
    }
  };

  const followUnfollowShop = async () => {};

  const getNetworks = () => {
    return (
      <>
        <TouchableOpacity onPress={() => openNetworks('whatsapp')}>
          <Image
            style={[styles.iconsNetworks, CommonStyles.mt_1]}
            source={require('../../Assets/Icons/whatsapp.png')}
          />
        </TouchableOpacity>
        
        {shopInfo.networks.map(net => {
          if (net.network === 'FACEBOOK') {
            return (
              <TouchableOpacity onPress={() => openNetworks('facebook')}>
                <Image
                  style={[styles.iconsNetworks, CommonStyles.mt_1]}
                  source={require('../../Assets/Icons/facebook.png')}
                />
              </TouchableOpacity>
            );
          }
          if (net.network === 'INSTAGRAM') {
            return (
              <TouchableOpacity onPress={() => openNetworks('instagram')}>
                <Image
                  style={[styles.iconsNetworks, CommonStyles.mt_1]}
                  source={require('../../Assets/Icons/instagram.png')}
                />
              </TouchableOpacity>
            );
          }
        })}
      </>
    );
  };

  return (
        <LinearGradient
          colors={['#1D5771', '#2A8187', '#46D9B5']}
          style={styles.container}>
          <ScrollView>
            <Icon
              name="arrow-back-ios"
              size={25}
              color="white"
              style={styles.goBack}
              onPress={() => navigation.goBack()}
            />
            <View style={styles.form}>
              <Image
                style={styles.image}
                source={{
                  uri: shopInfo.profileImage !== '' ? shopInfo.profileImage : defaultImage
                }}
              />
              <View style={CommonStyles.pAll}>
                <Text style={styles.text}>{shopInfo.followers}</Text>
                <AppText font="bold" fontSize={14}>
                  Seguidores
                </AppText>
              </View>

              <View style={CommonStyles.pAll}>
                <Text style={styles.text}>{shopInfo.posts.length}</Text>
                <AppText font="bold" fontSize={14}>
                  Publicaciones
                </AppText>
              </View>
            </View>
            <View style={[CommonStyles.pt_1, CommonStyles.pl_1]}>
              <AppText font="bolder" fontSize={18}>
                {shopInfo.name}
              </AppText>
              <Text style={styles.description}>
                {shopInfo.description}
              </Text>
              <View style={styles.formNetworks}>{getNetworks()}</View>
            </View>
            <View style={styles.form}>
              <GradientButton
                onPress={followUnfollowShop}
                style={styles.button}>
                <AppText fontSize={16} font="bold">
                  Seguir
                </AppText>
              </GradientButton>
            </View>
            <ContentList contents={shopInfo.posts} />
          </ScrollView>
        </LinearGradient>
  );
};

const styles = StyleSheet.create({
  iconsNetworks: {
    borderRadius: 50,
    width: 35,
    height: 35,
    marginRight: 6,
  },
  button: {
    padding: 8,
    borderRadius: 10,
  },
  text: {
    textAlign: 'center',
    fontSize: 24,
    color: 'white',
    fontFamily: 'Montserrat-Bold',
  },
  form: {
    display: 'flex',
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
  },
  goBack: {
    position: 'relative',
    top: '2%',
    left: 20,
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
    backgroundColor: 'white',
  },
  description: {
    paddingTop: 10,
    fontSize: 16,
    width: '100%',
    color: '#D8D8D8',
  },
  formNetworks: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 8,
  },
});

export default Shop;