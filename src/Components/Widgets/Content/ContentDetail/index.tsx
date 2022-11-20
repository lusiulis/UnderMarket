import {useCallback, useEffect, useRef, useState} from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {ImageSlider} from 'react-native-image-slider-banner';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ActionIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AppGradientsColors, CommonStyles} from '../../../../Assets/Styles';
import {getCategoryById} from '../../../../Models/Category';
import {ICategory} from '../../../../Models/Category/Category';
import {IContentCard} from '../../../../Models/Content/Content';
import AppModal from '../../../Common/AppModal';
import GradientButton from '../../../Common/Button/GradientButton';
import GradientWrapper from '../../../Common/GradientWrapper';
import AppText from '../../../Common/Text';
import GradientText from '../../../Common/Text/GradientText';
import ProfileIcon from '../../../Snippets/ProfileIcon';

type IContentDetail = {
  content: IContentCard;
  hide: () => void;
  show: boolean;
};

const getFormatedImages = (files?: any[]) =>
  files ? files.map((file: any) => ({img: file})) : [];

const ContentDetail = ({content, hide, show}: IContentDetail) => {
  const [contentCategories, setContentCategories] = useState<ICategory[]>([]);
  const isMounted = useRef(false);

  const fetchCategories = useCallback(async () => {
    if (isMounted) {
      const categories = await Promise.all(
        content.categorys.map(async id => {
          return await getCategoryById(id);
        }),
      );
      setContentCategories(categories);
    }
  }, []);

  useEffect(() => {
    isMounted.current = true;
    fetchCategories();
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleWishList = () => {};

  const handleShare = () => {};

  const handleShowNetworks = () => {};

  return (
    <AppModal show={show} style={styles.modal}>
      <LinearGradient
        colors={['#1D5771', '#2A8187', '#46D9B5']}
        style={styles.container}>
        <GradientButton
          onPress={hide}
          style={{
            position: 'absolute',
            padding: 3,
            zIndex: 10,
            borderRadius: 100,
            left: 10,
            top: 10,
          }}>
          <Icon name="arrow-back" size={20} color="white" />
        </GradientButton>
        <ScrollView>
          <View>
            <View style={{flex: 1, height: 400}}>
              <ImageSlider
                data={getFormatedImages(content.files)}
                caroselImageStyle={{
                  resizeMode: 'cover',
                  flex: 1,
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                }}
                caroselImageContainerStyle={{
                  width: '100%',
                  alignItems: 'center',
                  flex: 1,
                }}
                showIndicator={false}
              />
            </View>
            <View
              style={[CommonStyles.transparentContainer, styles.contentCard]}>
              <View style={styles.contentHistory}>
                <ProfileIcon source={content.shop.profileImage} focused />
                <View style={styles.historyDescription}>
                  <AppText font="bold" fontSize={15}>
                    {content.shop.name}
                  </AppText>
                  <AppText font="bold" fontSize={12}>
                    {content.title}
                  </AppText>
                </View>
              </View>
              <AppText style={{marginVertical: 10}} fontSize={11}>
                {content.description}
              </AppText>
              <AppText
                style={{marginVertical: 10, width: '100%'}}
                font="bold"
                fontSize={12}>
                Categorias:
              </AppText>
              <View style={styles.categoriesContainer}>
                {contentCategories.map((category, index) => (
                  <LinearGradient
                    colors={AppGradientsColors.active}
                    key={index}
                    style={styles.categoryItem}>
                    <AppText font="bold">{category.name}</AppText>
                  </LinearGradient>
                ))}
              </View>
              <AppText
                style={{marginVertical: 10, width: '100%'}}
                font="bold"
                fontSize={12}>
                Precios
              </AppText>
              <View style={styles.priceContainer}>
                <AppText font="bold" fontSize={12}>
                  ₡
                </AppText>
                <AppText font="bold" fontSize={12}>
                  {String(content.price)}
                </AppText>
              </View>
              <View style={styles.actionsContainer}>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                  <ActionIcons
                    name="cards-playing-heart"
                    size={20}
                    color="black"
                    onPress={handleWishList}
                  />
                  <ActionIcons
                    style={{marginLeft: 20}}
                    name="share-variant"
                    size={20}
                    color="black"
                    onPress={handleShare}
                  />
                </View>
                <GradientButton
                  onPress={handleShowNetworks}
                  style={styles.button}>
                  <AppText font="bold" fontSize={12}>
                    Comprar
                  </AppText>
                </GradientButton>
              </View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </AppModal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    height: '100%',
    width: '100%',
  },
  contentCard: {
    margin: '5%',
    width: '60%',
    padding: 10,
  },
  contentHistory: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  historyDescription: {
    alignItems: 'flex-end',
  },
  categoriesContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  categoryItem: {
    padding: 5,
    borderRadius: 10,
    margin: 5,
  },
  priceContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    margin: 10,
  },
  actionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    padding: 5,
    borderRadius: 10,
  },
});

export default ContentDetail;
