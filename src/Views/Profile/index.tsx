import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {IScreenProps} from '../../Components/Navigation/navigation';
import {
  View,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {IProfile} from '../../Models/Profile/profile';
import {getProfileInfo} from '../../Models/Profile';
import LinearGradient from 'react-native-linear-gradient';
import {AppGradientsColors, CommonStyles} from '../../Assets/Styles';
import {AuthContext} from '../../Contexts/appContentProvider';
import AppText from '../../Components/Common/Text';
import AuthWidget from '../../Components/Widgets/AuthWIdget';
import {ScrollView} from 'react-native-gesture-handler';
import ProfileIcon from '../../Components/Snippets/ProfileIcon';
import {Initializer, UploadImage} from '../../Utils';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import GradientButton from '../../Components/Common/Button/GradientButton';
import {BottomSheet} from 'react-native-btr';
import UpdatePassword from '../Auth/UpdatePassword';
import AppCamera from '../../Components/Camera';
import {ICameraFile} from '../../Components/Camera/Camera';
import Input from '../../Components/Common/Input';
import {updateUser} from '../../Models/User/user.model';
import {IUpdateUser} from '../../Models/User/user';

const Profile = ({route, navigation}: IScreenProps) => {
  const {authState, logOut} = useContext(AuthContext);
  const [profileInfo, setProfileInfo] = useState<IProfile>(
    Initializer.IProfile,
  );
  const isMounted = useRef(false);

  const fetchProfileInfo = useCallback(async () => {
    if (isMounted && authState.profile) {
      const data = await getProfileInfo(
        route.params && route.params.id
          ? route.params.id
          : authState.profile.id,
      );
      setFormData({
        email: data.email,
        id: data.id,
        name: data.name,
        username: data.username,
      });
      setProfileInfo(data);
    }
  }, [route.params, authState.profile]);

  const [showBottomMenu, setShowBottomMenu] = useState(false);
  const [showUpdateProfile, setShowUpdateProfile] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ICameraFile>();
  const [formData, setFormData] = useState<IUpdateUser>({
    id: '',
  });

  useEffect(() => {
    isMounted.current = true;
    fetchProfileInfo();
    return () => {
      isMounted.current = false;
    };
  }, [route.params, authState.profile]);

  const handleBottomMenuShow = () => {
    setShowBottomMenu(!showBottomMenu);
  };

  const handleUpdateProfile = () => {
    setShowBottomMenu(false);
    setShowUpdateProfile(!showUpdateProfile);
  };

  const handleShowShops = () => {
    setShowBottomMenu(false);
    navigation.navigate('ShopsList');
  };

  const handleChangePassword = () => {
    setShowChangePassword(!showChangePassword);
  };

  const handleLogOut = () => {
    logOut();
    setShowBottomMenu(false);
  };

  const handleShowCamera = (files?: ICameraFile[]) => {
    if (files && files.length > 0) setSelectedImage(files[0]);
    setShowCamera(!showCamera);
  };

  const handleWishLists = () => {
    setShowBottomMenu(false);
    navigation.navigate('WishList');
  }

  const handleImageCancel = () => {
    setSelectedImage(undefined);
  };

  const handleInputChange = (
    value: string,
    target: 'email' | 'username' | 'name',
  ) => {
    setFormData(
      target === 'email'
        ? {...formData, email: value}
        : target === 'name'
        ? {...formData, name: value}
        : {...formData, username: value},
    );
  };

  const handleFormSubmit = async () => {
    if (
      !formData.email &&
      !formData.username &&
      !formData.name &&
      !selectedImage
    ) {
      ToastAndroid.show('Debe de realizar algun cambio', ToastAndroid.SHORT);
      return;
    }
    let payload: IUpdateUser = {
      id: profileInfo.id,
      email: formData.email,
      username: formData.username,
      name: formData.name,
    };
    if (selectedImage) {
      const imageUrl = await UploadImage(selectedImage);
      payload.profileImage = imageUrl;
    }
    await updateUser(payload);
    const newProfileInfo = await getProfileInfo(profileInfo.id);
    setProfileInfo(newProfileInfo);
    setShowUpdateProfile(false);
    ToastAndroid.show('Perfil Actualizado Correctamente', ToastAndroid.SHORT);
    setSelectedImage(undefined);
  };

  const ProfileContent = () => (
    <>
      <AppText font="bolder" fontSize={20} style={{marginVertical: 20}}>
        {profileInfo.username}
      </AppText>
      <AppText font="bold" fontSize={20} style={{marginVertical: 10}}>
        {profileInfo.name}
      </AppText>
      <View style={[styles.profileNumbers, CommonStyles.transparentContainer]}>
        <View style={styles.numberItem}>
          <Icon size={30} name="people" color="#ffff" />
          <AppText>{String(profileInfo.following.length)}</AppText>
        </View>
        <View style={styles.numberItem}>
          <MaterialIcons size={30} name="account-heart" color="#ffff" />
          <AppText>{String(profileInfo.following.length)}</AppText>
        </View>
      </View>
      <LinearGradient
        colors={AppGradientsColors.active}
        style={styles.separator}
      />
    </>
  );

  const ProfileForm = () => (
    <View style={[CommonStyles.transparentContainer, styles.formContainer]}>
      <AppText font="bold" fontSize={15}>
        Editar Perfil
      </AppText>
      <Input
        stateManagment
        value={formData.username}
        style={styles.formInput}
        icon="person"
        placeHolder="Nombre de Usuario"
        onChange={value => handleInputChange(value, 'username')}
      />
      <Input
        stateManagment
        value={formData.email}
        style={styles.formInput}
        icon="email"
        placeHolder="Correo"
        onChange={value => handleInputChange(value, 'email')}
      />
      <Input
        stateManagment
        value={formData.name}
        style={styles.formInput}
        icon="person"
        placeHolder="Nombre"
        onChange={value => handleInputChange(value, 'name')}
      />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '80%',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity style={[styles.submit, {backgroundColor: 'white'}]}>
          <AppText
            font="bold"
            fontSize={15}
            color="black"
            onPress={handleUpdateProfile}>
            Cancelar
          </AppText>
        </TouchableOpacity>
        <GradientButton onPress={handleFormSubmit} style={styles.submit}>
          <AppText font="bold" fontSize={15}>
            Guardar
          </AppText>
        </GradientButton>
      </View>
    </View>
  );

  return (
    <LinearGradient colors={AppGradientsColors.base} style={styles.main}>
      {authState.isAunthenticated ? (
        <>
          {authState.profile?.id === profileInfo.id && !showUpdateProfile && (
            <GradientButton
              onPress={handleBottomMenuShow}
              style={styles.menuButton}>
              <Icon size={25} name="menu" color="#ffff" />
            </GradientButton>
          )}
          <ScrollView contentContainerStyle={styles.container}>
            {selectedImage ? (
              <ProfileIcon source={selectedImage.uri} focused size={150} />
            ) : (
              <ProfileIcon
                source={profileInfo.profileImage}
                focused
                size={150}
              />
            )}
            {showUpdateProfile && (
              <View style={styles.imagesActions}>
                {selectedImage && (
                  <Icon
                    name="cancel"
                    size={35}
                    color="#C21A1A"
                    onPress={handleImageCancel}
                  />
                )}
                <Icon
                  style={{marginLeft: 'auto'}}
                  name="camera"
                  size={35}
                  color="white"
                  onPress={() => handleShowCamera()}
                />
              </View>
            )}
            {!showUpdateProfile ? <ProfileContent /> : <ProfileForm />}
          </ScrollView>
          <BottomSheet
            visible={showBottomMenu}
            onBackButtonPress={handleBottomMenuShow}
            onBackdropPress={handleBottomMenuShow}>
            <View style={styles.sheet}>
              <View style={{ width: '50%', backgroundColor: 'black', padding: 1, borderRadius: 100, margin: 20}} />
              <TouchableOpacity onPress={handleWishLists}>
                <AppText
                  color={'black'}
                  fontSize={20}
                  style={{padding: 10}}
                  font="bold">
                  Listas de Deseo
                </AppText>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleUpdateProfile}>
                <AppText
                  color={'black'}
                  fontSize={20}
                  style={{padding: 10}}
                  font="bold">
                  Editar Perfil
                </AppText>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleChangePassword}>
                <AppText
                  color={'black'}
                  fontSize={20}
                  style={{padding: 10}}
                  font="bold">
                  Cambiar Contraseña
                </AppText>
              </TouchableOpacity>

              <TouchableOpacity style={{padding: 10}} onPress={handleShowShops}>
                <AppText color={'black'} fontSize={20} font="bold">
                  Mis Tiendas
                </AppText>
              </TouchableOpacity>

              <TouchableOpacity style={{padding: 10}} onPress={handleLogOut}>
                <AppText color={'red'} fontSize={20} font="bold">
                  Cerrar Sesión
                </AppText>
              </TouchableOpacity>
            </View>
          </BottomSheet>
          <UpdatePassword
            show={showChangePassword}
            hide={handleChangePassword}
          />
          {showCamera && <AppCamera handleShow={handleShowCamera} />}
        </>
      ) : (
        <AuthWidget />
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
  },
  menuButton: {
    position: 'absolute',
    zIndex: 999,
    marginLeft: 'auto',
    right: 10,
    top: 10,
    padding: 10,
    borderRadius: 100,
  },
  container: {
    alignItems: 'center',
    paddingTop: '10%',
  },
  imagesActions: {
    display: 'flex',
    flexDirection: 'row',
    width: 120,
    top: -30,
    justifyContent: 'space-between',
  },
  separator: {
    padding: 2,
    width: '50%',
    borderRadius: 100,
    marginVertical: 10,
  },
  profileNumbers: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    width: '50%',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  numberItem: {
    alignItems: 'center',
  },
  sheet: {
    backgroundColor: '#ffff',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  formContainer: {
    padding: 20,
    width: '80%',
  },
  formInput: {
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
  submit: {
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
});

export default Profile;
