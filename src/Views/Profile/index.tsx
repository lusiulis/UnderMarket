import { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Image, Button, TouchableOpacity } from 'react-native';
import { AppColors, CommonStyles } from '../../Assets/Styles';
import GradientButton from '../../Components/Common/Button/GradientButton';
import AppText from '../../Components/Common/Text';
import { AuthContext } from '../../Contexts/app.context.provider';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomSheet } from 'react-native-btr';
import Icons from 'react-native-vector-icons/MaterialIcons';
import { getUserShops } from '../../Models/Shop/shop.model';
import AuthWidget from '../../Components/Widgets/AuthWIdget';


const Profile = () => {
  const { authState, logOut } = useContext(AuthContext);
  const navigation = useNavigation();
  const defaultImage = 'https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255710-stock-illustration-avatar-vector-male-profile-gray.jpg';
  const [showCamera, setShowCamera] = useState(true);
  const [shopId, setShopId] = useState('');

  useEffect(() => {
    getShop();
  })

  const getShop = async () => {
    const shops = await getUserShops(String(authState.profile?.id))
    if (shops.length > 0) {
      setShopId(shops[0].id)
    } else {
      setShopId('');
    }
  }

  const handleRegister = () => {
    navigation.navigate('LogIn')
  };

  const [visible, setVisible] = useState(false);
  const toggleBottomNavigationView = () => {
    setVisible(!visible);
  };

  const handleShowCameraModal = () => {
    setShowCamera(!showCamera)
  }

  const showShop = () => {
    if (shopId != '') {
      navigation.navigate('ShopsList')
    } else {
      navigation.navigate('NewShop')
    }
  }

  const updatePassword = () => navigation.navigate('UpdatePassword')

  return (
    <View style={styles.container}>
      {authState.isAunthenticated ? (
        <>
          <LinearGradient
            colors={['#1D5771', '#2A8187', '#46D9B5']}
            style={styles.container}>
            <View style={styles.right}>
              <Icons
                size={25}
                name='menu'
                style={styles.iconMenu}
                color='#ffff'
                onPress={toggleBottomNavigationView} />
            </View>
            <View>

              <View style={styles.contentProfile}>
                <Image
                  source={{
                    uri: authState.profile?.profileImage ? authState.profile.profileImage : defaultImage,
                  }}
                  style={styles.imageStyle}
                />
                <Icons name='camera-enhance' size={40} style={styles.camera} color='black' onPress={handleShowCameraModal} />

              </View>
              <View style={styles.content}>
                <AppText fontSize={20} font="bolder">
                  Nombre
                </AppText>
                <AppText fontSize={18} >
                  {authState.profile?.username ? authState.profile?.username : ''}
                </AppText>

                <AppText style={CommonStyles.mt_2} fontSize={20} font="bolder">
                  Correo
                </AppText>
                <AppText fontSize={18} >
                  {authState.profile?.email ? authState.profile?.email : ''}
                </AppText>
                <TouchableOpacity >
                  <AppText style={styles.link} fontSize={20} font="bolder" onPress={() => updatePassword()}>
                    Cambiar Contraseña
                  </AppText>
                </TouchableOpacity>
              </View>

              <BottomSheet
                visible={visible}
                onBackButtonPress={toggleBottomNavigationView}
                onBackdropPress={toggleBottomNavigationView}
              >
                <View style={styles.sheet}>
                  <GradientButton colors={['#ffff', '#ffff']} onPress={() => { }} style={styles.button}>
                    <AppText color={'black'} fontSize={20} font="bold">
                      Editar Perfil
                    </AppText>
                  </GradientButton>

                  <GradientButton colors={['#ffff', '#ffff']} onPress={showShop} style={styles.button}>
                    <AppText color={'black'} fontSize={20} font="bold">
                      {shopId != '' ? 'Mis Tiendas' : 'Crear Tienda'}
                    </AppText>

                  </GradientButton>

                  <GradientButton colors={['#ffff', '#ffff']} onPress={logOut} style={styles.button}>
                    <AppText color={'red'} fontSize={20} font="bold">
                      Cerrar Sesión
                    </AppText>
                  </GradientButton>

                </View>

              </BottomSheet>
            </View>
          </LinearGradient>
        </>
      ) : (
        <AuthWidget />
      )}
    </View >
  );
};

const styles = StyleSheet.create({
  link: {
    marginTop: 20,
    textDecorationLine: "underline"
  },
  iconMenu: {
    borderRadius: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.3);',
    padding: 3
  },
  camera: {
    padding: 3,
    backgroundColor: 'rgba(0, 0, 0, 0.3);',
    borderRadius: 100,
    top: -30,
    right: -40
  },
  NotLogin: {
    alignItems: 'center',
    justifyContent: 'center',
    top: '40%'
  },
  right: {
    marginLeft: 'auto',
  },
  content: {
    padding: 30
  },
  contentProfile: {
    alignItems: 'center',
  },
  imageStyle: {
    width: 160,
    height: 160,
    borderRadius: 100,
    borderColor: '#ffff',
    borderStyle: 'solid',
    borderWidth: 2
  },
  sheet: {
    backgroundColor: '#ffff',
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  button: {
    padding: 15
  },
  docker: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Profile;
