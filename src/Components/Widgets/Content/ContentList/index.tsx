import {useContext, useRef, useState} from 'react';
import {StyleSheet, View, ViewStyle, Image} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {ImageSlider} from 'react-native-image-slider-banner';
import LinearGradient from 'react-native-linear-gradient';
import {AppGradientsColors} from '../../../../Assets/Styles';
import {HomeContext} from '../../../../Contexts/homeContextProvider';
import {IContent, IContentCard} from '../../../../Models/Content/Content';
import AppModal from '../../../Common/AppModal';
import AppText from '../../../Common/Text';
import ProfileIcon from '../../../Snippets/ProfileIcon';
import ContentDetail from '../ContentDetail';

type IContentListProps = {
  contents: IContentCard[];
  style?: ViewStyle;
  onPagination?: () => void;
};

const ContentList = ({contents, style}: IContentListProps) => {
  const [selectedContent, setSelectedContent] = useState<IContentCard>();
  const [showCardModal, setShowCardModal] = useState(false);

  const getFormatedImages = (files?: any[]) =>
    files ? files.map((file: any) => ({img: file})) : [];

  const handlePressCard = (card: IContentCard) => {
    setSelectedContent(card);
    setShowCardModal(!showCardModal)
  };

  const handleCardCancel = () => {
    setShowCardModal(!showCardModal)
  }

  return (
    <View style={styles.main}>
      <ScrollView>
        <View style={styles.container}>
          {contents.map((content, index) => (
            <View style={{width: '45%'}} key={index}>
              <TouchableOpacity onPress={() => handlePressCard(content)}>
                <View style={styles.item}>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: 200,
                    }}>
                    <ImageSlider
                      data={getFormatedImages(content.files)}
                      previewImageStyle={{width: 200, height: 200}}
                      caroselImageContainerStyle={{
                        width: String(100 / content.files.length).concat('%'),
                        alignItems: 'center',
                      }}
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
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
      <ContentDetail show={showCardModal} content={selectedContent} hide={handleCardCancel} />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    marginBottom: 30,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
    padding: 10,
  },
  item: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 20,
    marginTop: 5,
    alignItems: 'center',
    display: 'flex',
    padding: 10,
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
});

export default ContentList;
