import { Camera } from 'react-native-vision-camera';
import { View, StyleSheet, Image } from 'react-native';
import AppCamera from '../../Components/Camera';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { AppGradientsColors, CommonStyles } from '../../Assets/Styles';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppText from '../../Components/Common/Text';
import { ICameraFile } from '../../Components/Camera/Camera';
import { AuthContext } from '../../Contexts/appContentProvider';
import AuthWidget from '../../Components/Widgets/AuthWIdget';
import GradientWrapper from '../../Components/Common/GradientWrapper';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import GradientButton from '../../Components/Common/Button/GradientButton';
import Input from '../../Components/Common/Input';
import { IContentType } from '../../Models/Content/Content';
import AppSelect from '../../Components/Common/Input/Select';
import { getUserShops } from '../../Models/Shop/shop.model';
import { IScreenProps } from '../../Components/Navigation/navigation';
import { ICategory, IDivition } from '../../Models/Category/Category';
import { getAllDivitions } from '../../Models/Category';
import { addContent } from '../../Models/Content';
import GradientText from '../../Components/Common/Text/GradientText';
import { UploadImage } from '../../Utils';
import { Picker } from '@react-native-picker/picker';
import { IShopLight } from '../../Models/Shop/shop';
import CategorySelector from '../../Components/Widgets/Category/CategorySelector';
import {
  ToastAndroid,
  Platform,
} from 'react-native';

const cameraPermissions = async () => {
  const cameraPermission = await Camera.getCameraPermissionStatus();
  const microphonePermission = await Camera.getMicrophonePermissionStatus();

  const newCameraPermission = await Camera.requestCameraPermission();
  const newMicrophonePermission = await Camera.requestMicrophonePermission();
};

type IFormPost = {
  media: ICameraFile[];
  title: string;
  description: string;
  contentType: IContentType;
  price: number;
};
const Post = ({ navigation }: IScreenProps) => {
  cameraPermissions();
  const { authState } = useContext(AuthContext);
  const [showCamera, setShowCamera] = useState(true);
  const [formData, setFormData] = useState<IFormPost>({
    media: [],
    title: '',
    description: '',
    contentType: 'product',
    price: 0,
  });
  const isMounted = useRef(false);
  const [userShops, setUserShops] = useState<IShopLight[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<ICategory[]>([]);
  const [selectedShop, setSelectedShop] = useState<IShopLight>({
    id: '',
    name: '',
    profileImage: ''
  });

  const fetchData = useCallback(async () => {
    if (isMounted) {
      const shops = authState.profile?.id
        ? await getUserShops(authState.profile.id)
        : [];
      setUserShops(shops);
      if (shops[0]) setSelectedShop(shops[0]);
    }
  }, [authState.profile?.id]);

  useEffect(() => {
    isMounted.current = true;
    fetchData();
    return () => {
      isMounted.current = false;
    };
  }, [authState.profile?.id]);

  const handleModalShowChange = (files?: ICameraFile[]) => {
    if (files) setFormData({ ...formData, media: [...formData.media, ...files] });
    setShowCamera(!showCamera);
  };

  const handleShowCameraModal = () => {
    setShowCamera(!showCamera);
  };

  const removeMediaElement = (index: number) => {
    const newMedia = formData.media;
    newMedia.splice(index, 1);
    setFormData({ ...formData, media: [...newMedia] });
  };

  const handleTitleInputChange = (value: string) => {
    setFormData({ ...formData, title: value });
  };
  const handleDescriptionInputChange = (value: string) => {
    setFormData({ ...formData, description: value });
  };
  const handlePriceInputChange = (value: string) => {
    setFormData({ ...formData, price: Number(value) });
  };

  const handleShopChange = (value: IShopLight) => {
    setSelectedShop(value);
  };

  const handleClearForm = () => {
    setFormData({
      media: [],
      title: '',
      description: '',
      contentType: 'product',
      price: 0,
    });
    setSelectedCategories([]);
    setSelectedShop(userShops[0]);
  };

  const submitForm = async () => {
    if (
      authState.profile?.id &&
      formData.title.length > 0 &&
      formData.description.length > 0 &&
      formData.media.length > 0 &&
      selectedShop &&
      selectedCategories.length > 0
    ) {
      const uploadedImages = await Promise.all(
        formData.media.map(async media => await UploadImage(media)),
      );
      await addContent({
        shopId: selectedShop.id,
        title: formData.title,
        description: formData.description,
        price: formData.price,
        contentType: 'image',
        files: uploadedImages,
        categorys: selectedCategories.map(category => category.id),
      }).then(x => {
        if (Platform.OS === 'android') {
          ToastAndroid.show('Publicación agregada correctamente', ToastAndroid.SHORT)
        }
        handleClearForm();
        navigation.navigate('Home')
      }).catch(error => {
        if (Platform.OS === 'android') {
          ToastAndroid.show('Error al agregar la publicación', ToastAndroid.SHORT)
        }
      });
    } else {
      if (Platform.OS === 'android') {
        ToastAndroid.show('Datos incompletos para realizar la publicación', ToastAndroid.SHORT)
      }
    }
  };

  const PostImages = () => (
    <View style={styles.imagesShadowContainer}>
      <AppText font="bold" fontSize={17}>
        Imagenes
      </AppText>
      <View style={styles.imagesFormContainer}>
        <View style={styles.imagesContainer}>
          {formData.media.length > 0 ? (
            formData.media.length > 3 ? (
              <>
                {formData.media.slice(0, 3).map((mediaItem, index) => (
                  <View key={index}>
                    <Image
                      source={{ ...mediaItem, width: 60 }}
                      style={styles.image}
                    />
                    <Icon
                      style={{ position: 'absolute', top: 0 }}
                      name="remove-circle"
                      size={20}
                      color="black"
                      onPress={() => removeMediaElement(index)}
                    />
                  </View>
                ))}
                <View style={[styles.image, styles.imageOverflow]}>
                  <AppText font="bold" fontSize={20}>
                    {'+' + String(formData.media.length - 3)}
                  </AppText>
                </View>
              </>
            ) : (
              formData.media.map((mediaItem, index) => (
                <View key={index}>
                  <Image
                    source={{ ...mediaItem, width: 60 }}
                    style={styles.image}
                  />
                  <Icon
                    style={{ position: 'absolute', top: 0 }}
                    name="remove-circle"
                    size={20}
                    color="black"
                    onPress={() => removeMediaElement(index)}
                  />
                </View>
              ))
            )
          ) : (
            <AppText fontSize={12} style={{ textAlign: 'center' }}>
              No hay Imagenes Seleccionadas
            </AppText>
          )}
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity
            onPress={handleShowCameraModal}
            style={{ height: 40, width: 40 }}>
            <GradientWrapper>
              <Icon name="camera" size={40} onPress={handleShowCameraModal} />
            </GradientWrapper>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const PostForm = () => (
    <View style={styles.formContainer}>
      <AppText font="bold" fontSize={17}>
        Información de Publicación
      </AppText>
      <View style={styles.inputsContainer}>
        <Input
          value={formData.title}
          onChange={handleTitleInputChange}
          placeHolder="Titulo del Producto"
          style={styles.formInputs}
          stateManagment
        />
        <Input
          value={formData.description}
          onChange={handleDescriptionInputChange}
          placeHolder="Descripción del Producto"
          style={[styles.formInputs, { marginTop: 10 }]}
          stateManagment
        />
        <View style={styles.priceContainer}>
          <AppText fontSize={15}>Precio:</AppText>
          <Input
            value={formData.price}
            onChange={handlePriceInputChange}
            keyboardType="numeric"
            placeHolder="Precio"
            style={styles.priceInput}
            stateManagment
          />
        </View>
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.4)',
            borderRadius: 20,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <AppText style={{ marginLeft: 10 }} font="bold" fontSize={15}>
            {'Tienda: '}
          </AppText>
          <Picker
            selectedValue={selectedShop}
            onValueChange={itemValue => handleShopChange(itemValue)}
            placeholder="No hay tiendas..."
            style={{ color: 'white', width: '70%' }}>
            {userShops.map((shop, index) => (
              <Picker.Item key={index} label={shop.name} value={shop} />
            ))}
          </Picker>
        </View>
      </View>
    </View>
  );

  return authState.profile?.id ? (
    showCamera ? (
      <AppCamera handleShow={handleModalShowChange} />
    ) : (
      <LinearGradient
        colors={['#1D5771', '#2A8187', '#46D9B5']}
        style={[CommonStyles.mainContainer, styles.mainContainer]}>
        <LinearGradient
          colors={AppGradientsColors.active}
          style={[
            styles.backgroundBlob,
            {
              top: 0,
              right: 0,
              transform: [{ translateX: 60 }, { rotate: '45deg' }],
            },
          ]}
        />
        <LinearGradient
          colors={AppGradientsColors.active}
          style={[
            styles.backgroundBlob,
            {
              bottom: 0,
              left: 0,
              transform: [{ translateX: -60 }, { rotate: '210deg' }],
            },
          ]}
        />
        <View style={{ flex: 1, width: '100%' }}>
          <ScrollView
            style={{
              marginBottom: 60,
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '10%',
                paddingBottom: 10,
              }}>
              <PostImages />
              <PostForm />
              <CategorySelector
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
              />
              <GradientButton
                onPress={submitForm}
                style={[styles.button, { marginTop: '10%' }]}>
                <AppText font="bold" fontSize={20}>
                  Publicar
                </AppText>
              </GradientButton>
            </View>
          </ScrollView>
        </View>
      </LinearGradient>
    )
  ) : (
    <AuthWidget />
  );
};

const styles = StyleSheet.create({
  mainContainer: {},
  backgroundBlob: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 10,
    opacity: 0.4,
  },
  imagesShadowContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.4);',
    width: '80%',
    borderRadius: 20,
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    display: 'flex',
  },
  imagesFormContainer: {
    width: '100%',
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  imagesContainer: {
    padding: '3%',
    backgroundColor: 'rgba(0, 0, 0, 0.3);',
    borderRadius: 20,
    width: '80%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    height: 100,
  },
  image: {
    height: '100%',
    borderRadius: 10,
  },
  imageOverflow: {
    backgroundColor: 'rgba(0, 0, 0, 0.7);',
    height: 40,
    position: 'absolute',
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    right: 5,
    top: 5,
    display: 'flex',
  },
  formContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.4);',
    width: '80%',
    borderRadius: 20,
    padding: 20,
    marginVertical: '10%',
    alignItems: 'center',
  },
  inputsContainer: {
    marginTop: '10%',
    width: '100%',
    justifyContent: 'space-between',
  },
  formActions: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: '20%',
  },
  button: {
    padding: 10,
    borderRadius: 10,
  },
  formInputs: {
    backgroundColor: 'rgba(0, 0, 0, 0.4);',
    borderRadius: 20,
    padding: 5,
    width: '100%',
  },
  divitionSelect: {
    padding: 10,
    backgroundColor: 'black',
  },
  priceContainer: {
    marginVertical: '10%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  priceInput: {
    backgroundColor: 'rgba(0, 0, 0, 0.4);',
    borderRadius: 20,
    padding: 5,
    width: '70%',
  },
});

export default Post;
