import { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Image, Button, TouchableOpacity } from 'react-native';
import { AppColors, AppGradientsColors, CommonStyles } from '../../Assets/Styles';
import GradientButton from '../../Components/Common/Button/GradientButton';
import AppText from '../../Components/Common/Text';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomSheet } from 'react-native-btr';
import Icons from 'react-native-vector-icons/MaterialIcons';
import { getUserShops } from '../../Models/Shop/shop.model';
import AuthWidget from '../../Components/Widgets/AuthWIdget';
import { AuthContext } from '../../Contexts/appContentProvider';
import UpdatePassword from '../Auth/UpdatePassword';
import { IAppScreenProps } from '../../Components/Navigation/navigation';
import AppCamera from '../../Components/Camera';
import { ICameraFile } from '../../Components/Camera/Camera';
import { UploadImage } from '../../Utils';
import { updateProfileImageUser, updateUser } from '../../Models/User/user.model';
import Input from '../../Components/Common/Input';


const Profile = ({ navigation }: IAppScreenProps) => {
  const { authState, logOut, setAuthenticatedUser } = useContext(AuthContext);
  const defaultImage = 'https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255710-stock-illustration-avatar-vector-male-profile-gray.jpg';
  const [showCamera, setShowCamera] = useState(false);
  const [shopId, setShopId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState({ uri: '', filename: '' });
  const [visibleModal, setVisibleModal] = useState(false);
  const [update, setUpdate] = useState(false)
  const [formData, setFormData] = useState({ username: '', email: '' })

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

  const toggleBottomNavigationView = () => {
    setVisibleModal(!visibleModal);
  };

  const handleShowCameraModal = () => {
    setVisibleModal(false)
    setShowCamera(!showCamera)
  }

  const handleModalShowChange = (file?: ICameraFile[]) => {
    if (file) {
      setFile({ uri: file[0]?.uri ? file[0]?.uri : '', filename: file[0]?.filename ? file[0]?.filename : '' })
      setShowCamera(!showCamera);
      setAuthenticatedUser({ id: authState.profile?.id ? authState.profile?.id : '', email: authState.profile?.email ? authState.profile?.email : '', username: authState.profile?.username ? authState.profile?.username : '', profileImage: file[0]?.uri ? file[0]?.uri : '' })
    }
  };

  const showShop = () => {
    setVisibleModal(false)
    if (shopId != '') {
      navigation.navigate('ShopsList')
    } else {
      navigation.navigate('NewShop')
    }
  }

  const updateStateModal = () => setShowModal(!showModal)

  const cancel = () => {
    setFile({ uri: '', filename: '' });
  }

  const saveFile = async () => {
    console.log(file)
    const image = await UploadImage(file)
    await updateProfileImageUser(String(authState.profile?.id), image)
    setFile({ uri: '', filename: '' });
  }

  const updateProfile = () => {
    setVisibleModal(false)
    setUpdate(true);
    setFormData({ username: authState.profile?.username ? authState.profile?.username : '', email: authState.profile?.email ? authState.profile?.email : '' })
  }

  const save = async () => {
    await updateUser(authState.profile?.id ? authState.profile?.id : '', formData.username, formData.email)
    setAuthenticatedUser({ id: String(authState.profile?.id), username: String(formData.username), email: String(formData.email) })
    setUpdate(false)

  }

  const handleInputChange = (value: string, input: string) => {
    if (input === 'name') {
      setFormData({ ...formData, username: value })
    } else if (input === 'email') {
      setFormData({ ...formData, email: value })
    }
  };
  return (
    <View style={styles.container}>
      {authState.isAunthenticated ? (
        <>
          {showCamera ? (
            <AppCamera handleShow={handleModalShowChange} />
          ) : (
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
                  {file.filename === '' ? (
                    <>
                      <Image
                        source={{
                          uri: authState.profile?.profileImage ? authState.profile.profileImage : defaultImage,
                        }}
                        style={styles.imageStyle}
                      />
                      <Icons name='camera-enhance' size={40} style={styles.camera} color='black' onPress={handleShowCameraModal} />
                    </>

                  ) : (
                    <>
                      <Image
                        source={{
                          uri: file.filename ? file.uri : defaultImage,
                        }}
                        style={styles.imageStyle}
                      />
                      <View style={styles.row}>
                        <Icons name='cancel' size={40} style={{ backgroundColor: 'rgba(0, 0, 0, 0.3);', borderRadius: 100 }} color='#A00000' onPress={cancel} />
                        <Icons name='check' size={40} style={{ backgroundColor: 'rgba(0, 0, 0, 0.3);', borderRadius: 100 }} color='green' onPress={saveFile} />
                      </View>
                    </>
                  )}


                </View>
                <View style={styles.content}>
                  <AppText fontSize={20} font="bolder">
                    Nombre
                  </AppText>
                  {update ? (
                    <Input
                      backgroundColor={'#FFFFFF4F'}
                      value={formData.username}
                      placeHolder="Usuario"
                      icon="person"
                      onChange={value => handleInputChange(value, 'name')}
                    />
                  ) : (
                    <AppText fontSize={18} >
                      {authState.profile?.username ? authState.profile?.username : ''}
                    </AppText>
                  )}


                  <AppText style={CommonStyles.mt_2} fontSize={20} font="bolder">
                    Correo
                  </AppText>
                  {update ? (
                    <Input
                      backgroundColor={'#FFFFFF4F'}
                      value={formData.email}
                      placeHolder="Correo"
                      icon="email"
                      onChange={value => handleInputChange(value, 'email')}
                    />
                  ) : (
                    <AppText fontSize={18} >
                      {authState.profile?.email ? authState.profile?.email : ''}
                    </AppText>
                  )}
                  {update ? (
                    <View style={[styles.row, { width: '100%', top: 30 }]}>
                      <GradientButton
                        colors={AppGradientsColors.cancel}
                        onPress={() => setUpdate(false)}
                        style={styles.button}>
                        <AppText font='bold' style={{ textAlign: 'center' }} fontSize={16}>Cancelar</AppText>
                      </GradientButton>
                      <GradientButton
                        colors={AppGradientsColors.active}
                        onPress={save}
                        style={styles.button}>
                        <AppText font='bold' style={{ textAlign: 'center' }} fontSize={16}>Guardar</AppText>
                      </GradientButton>
                    </View>
                  ) : (
                    <TouchableOpacity >
                      <AppText style={styles.link} fontSize={20} font="bolder" onPress={updateStateModal}>
                        Cambiar Contraseña
                      </AppText>
                    </TouchableOpacity>
                  )
                  }
                </View>
                <BottomSheet
                  visible={visibleModal}
                  onBackButtonPress={toggleBottomNavigationView}
                  onBackdropPress={toggleBottomNavigationView}
                >
                  <View style={styles.sheet}>
                    <GradientButton colors={['#ffff', '#ffff']} onPress={updateProfile} style={styles.button}>
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
              <UpdatePassword show={showModal} hide={updateStateModal} />
            </LinearGradient>
          )
          }

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
  row: {
    display: 'flex',
    flexDirection: 'row',
    width: '40%',
    justifyContent: 'space-between',
    top: -10
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
