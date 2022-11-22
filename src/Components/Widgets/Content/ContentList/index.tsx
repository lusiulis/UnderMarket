import {useContext, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  ViewStyle,
  TouchableOpacity,
  Image,
} from 'react-native';
import {ImageSlider} from 'react-native-image-slider-banner';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AppGradientsColors} from '../../../../Assets/Styles';
import {IContentCard} from '../../../../Models/Content/Content';
import AppModal from '../../../Common/AppModal';
import AppText from '../../../Common/Text';
import ProfileIcon from '../../../Snippets/ProfileIcon';
import ContentDetail from '../ContentDetail';
import SaveContent from '../SaveContent';

type IContentListProps = {
  contents: IContentCard[];
  style?: ViewStyle;
  onPagination?: () => void;
  refresh?: () => void;
};

const ContentList = ({
  contents,
  style,
  onPagination,
  refresh,
}: IContentListProps) => {
  const [selectedContent, setSelectedContent] = useState<IContentCard>();
  const [showCardModal, setShowCardModal] = useState(false);
  const [showModalSave, setShowModalSave] = useState(false);

  const getFormatedImages = (files?: any[]) =>
    files ? files.map((file: any) => ({img: file})) : [];

  const handlePressCard = (card: IContentCard) => {
    setSelectedContent(card);
    setShowCardModal(!showCardModal);
  };

  const handleCardCancel = () => {
    setShowCardModal(!showCardModal);
  };

  const handleSaveContent = (card: IContentCard) => {
    setSelectedContent(card);
    setShowModalSave(!showModalSave);
  };

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        {contents.map((content, index) => (
          <View style={{width: '80%'}} key={index}>
            <TouchableOpacity
              onPress={() => handlePressCard(content)}
              activeOpacity={1}>
              <View style={styles.item}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    flex: 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    borderRadius: 10,
                    padding: 5,
                  }}>
                  <ImageSlider
                    data={getFormatedImages(content.files)}
                    caroselImageStyle={{
                      resizeMode: 'cover',
                      flex: 1,
                      width: 200,
                      borderRadius: 10,
                    }}
                    caroselImageContainerStyle={{
                      alignItems: 'center',
                      flex: 1,
                      padding: 5,
                      width: '100%',
                    }}
                    showIndicator={false}
                    preview={false}
                  />
                </View>
                <View style={styles.profileContainer}>
                  <ProfileIcon source={content.shop.profileImage} />
                  <AppText font="bold">{content.shop.name}</AppText>
                </View>
                <View style={styles.contentHistory}>
                  <AppText font="bold">{content.title}</AppText>
                  <AppText maxLines={4}>{content.description}</AppText>
                </View>
                <LinearGradient
                  colors={AppGradientsColors.active}
                  start={{x: 1, y: 0}}
                  end={{x: 0, y: 0}}
                  style={{height: 2, width: '90%', borderRadius: 100}}
                />
                <View style={styles.priceContainer}>
                  <AppText font="bold">Precio:</AppText>
                  <AppText>{'₡'.concat(String(content.price))}</AppText>
                </View>
                <View style={styles.actionsContainer}>
                  <Icon
                    name="heart"
                    size={20}
                    color="black"
                    onPress={() => handleSaveContent(content)}
                  />
                  <Icon
                    name="cards-playing-heart"
                    size={20}
                    color="black"
                    onPress={() => handleSaveContent(content)}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      {selectedContent && (
        <ContentDetail
          show={showCardModal}
          content={selectedContent}
          hide={handleCardCancel}
        />
      )}
      {selectedContent && (
        <AppModal show={showModalSave}>
          <SaveContent
            close={() => setShowModalSave(false)}
            content={selectedContent}
          />
        </AppModal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    marginBottom: 55,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
    padding: 10,
  },
  item: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 20,
    marginTop: 5,
    alignItems: 'center',
    display: 'flex',
    padding: 10,
    width: '100%',
  },
  profileContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
    paddingBottom: 0,
  },
  contentHistory: {
    width: '100%',
    padding: 10,
  },
  priceContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    width: '100%',
  },
  actionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 60,
    marginRight: 'auto',
  },
});

export default ContentList;
