import {Camera} from 'react-native-vision-camera';
import {View, StyleSheet, Image} from 'react-native';
import AppCamera from '../../Components/Camera';
import {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {AppGradientsColors, CommonStyles} from '../../Assets/Styles';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppText from '../../Components/Common/Text';
import {ICameraFile} from '../../Components/Camera/Camera';
import {AuthContext} from '../../Contexts/app.context.provider';
import AuthWidget from '../../Components/Widgets/AuthWIdget';
import GradientWrapper from '../../Components/Common/GradientWrapper';
import {TouchableOpacity} from 'react-native-gesture-handler';
import GradientButton from '../../Components/Common/Button/GradientButton';
import Input from '../../Components/Common/Input';
import {IContentType} from '../../Models/Content/Content';
import AppSelect from '../../Components/Common/Input/Select';
import {getUserShops} from '../../Models/Shop/shop.model';
import {IScreenProps} from '../../Components/Navigation/navigation';
import {ICategory, IDivition} from '../../Models/Category/Category';
import {getAllDivitions} from '../../Models/Category';
import {addContent} from '../../Models/Content';
import GradientText from '../../Components/Common/Text/GradientText';
import {UploadImage} from '../../Utils';

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
  shopId: string;
  price: number;
};
const Post = ({navigation}: IScreenProps) => {
  cameraPermissions();
  const {authState} = useContext(AuthContext);
  const [showCamera, setShowCamera] = useState(true);
  const [formData, setFormData] = useState<IFormPost>({
    media: [],
    title: '',
    description: '',
    contentType: 'product',
    shopId: '',
    price: 0,
  });
  const isMounted = useRef(false);
  const [divitions, setDivitons] = useState<IDivition[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);

  const fetchStoresData = useCallback(async () => {
    if (isMounted) {
      const divitions = await getAllDivitions();
      setDivitons(divitions);
    }
  }, []);

  useEffect(() => {
    isMounted.current = true;
    fetchStoresData();
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleModalShowChange = (files?: ICameraFile[]) => {
    if (files) setFormData({...formData, media: [...formData.media, ...files]});
    setShowCamera(!showCamera);
  };

  const handleShowCameraModal = () => {
    setShowCamera(!showCamera);
  };

  const removeMediaElement = (index: number) => {
    const newMedia = formData.media;
    newMedia.splice(index, 1);
    setFormData({...formData, media: [...newMedia]});
  };

  const handleTitleInputChange = (value: string) => {
    setFormData({...formData, title: value});
  };
  const handleDescriptionInputChange = (value: string) => {
    setFormData({...formData, description: value});
  };
  const handlePriceInputChange = (value: string) => {
    setFormData({...formData, price: Number(value)});
  };

  const handleDivitionChange = (value: string) => {
    console.log(value);

    return;
  };

  const handleCancel = () => {
    console.log('entra');
    setFormData({
      media: [],
      title: '',
      description: '',
      contentType: 'product',
      shopId: '',
      price: 0,
    });
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Home');
  };

  const submitForm = async () => {
    if (
      authState.profile?.id &&
      formData.title.length > 0 &&
      formData.description.length > 0 &&
      formData.media.length > 0
    ) {
      const uploadedImages = await Promise.all(
        formData.media.map(async media => await UploadImage(media)),
      );
      const response = await addContent({
        userId: authState.profile.id,
        title: formData.title,
        description: formData.description,
        price: formData.price,
        contentType: 'image',
        filesUrl: uploadedImages,
        categoryId: 'naXbY13cwqRc06vUhvFf',
      });
      console.log(response);
    } else {
      console.log('invalid form');
      console.log(formData);
    }
  };

  const PostImages = () => (
    <View style={styles.imagesShadowContainer}>
      <AppText font="bold" fontSize={10}>
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
                      source={{...mediaItem, width: 60}}
                      style={styles.image}
                    />
                    <Icon
                      style={{position: 'absolute', top: 0}}
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
                    source={{...mediaItem, width: 60}}
                    style={styles.image}
                  />
                  <Icon
                    style={{position: 'absolute', top: 0}}
                    name="remove-circle"
                    size={20}
                    color="black"
                    onPress={() => removeMediaElement(index)}
                  />
                </View>
              ))
            )
          ) : (
            <AppText>No hay Imagenes Seleccionadas</AppText>
          )}
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={handleShowCameraModal}
            style={{height: 40, width: 40}}>
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
      <AppText font="bold" fontSize={15}>
        Información de Publicación
      </AppText>
      <View style={styles.inputsContainer}>
        <Input
          icon="person"
          value={formData.title}
          onChange={handleTitleInputChange}
          placeHolder="Titulo del Producto"
          style={styles.formInputs}
        />
        <Input
          icon="person"
          value={formData.description}
          onChange={handleDescriptionInputChange}
          placeHolder="Descripción del Producto"
          style={styles.formInputs}
        />
        <View style={styles.priceContainer}>
          <GradientText font="bold" fontSize={15}>
            Precio:
          </GradientText>
          <Input
            value={formData.price}
            onChange={handlePriceInputChange}
            keyboardType="numeric"
            placeHolder="Precio"
            style={styles.priceInput}
          />
        </View>
      </View>
    </View>
  );

  return authState.profile?.id ? (
    <LinearGradient
      colors={['#1D5771', '#2A8187', '#46D9B5']}
      style={[CommonStyles.mainContainer, styles.mainContainer]}>
      {showCamera ? (
        <AppCamera handleShow={handleModalShowChange} />
      ) : (
        <>
          <LinearGradient
            colors={AppGradientsColors.active}
            style={[
              styles.backgroundBlob,
              {
                top: 0,
                right: 0,
                transform: [{translateX: 60}, {rotate: '45deg'}],
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
                transform: [{translateX: -60}, {rotate: '210deg'}],
              },
            ]}
          />
          <PostImages />
          <PostForm />
          <View style={styles.formActions}>
            <TouchableOpacity
              onPress={handleCancel}
              style={[
                styles.button,
                {
                  backgroundColor: 'rgba(194, 26, 26, 1)',
                },
              ]}>
              <AppText font="bold" fontSize={20}>
                Cancelar
              </AppText>
            </TouchableOpacity>
            <GradientButton onPress={submitForm} style={styles.button}>
              <AppText font="bold" fontSize={20}>
                Publicar
              </AppText>
            </GradientButton>
          </View>
        </>
      )}
    </LinearGradient>
  ) : (
    <AuthWidget />
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: '10%',
    justifyContent: 'space-between',
    paddingBottom: '20%',
  },
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
    height: '20%',
    borderRadius: 20,
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    display: 'flex',
  },
  imagesFormContainer: {
    height: '80%',
    width: '100%',
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imagesContainer: {
    padding: '3%',
    backgroundColor: 'rgba(0, 0, 0, 0.3);',
    height: '90%',
    borderRadius: 20,
    width: '80%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
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
    height: '60%',
    borderRadius: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  inputsContainer: {
    width: '100%',
    height: '80%',
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
