import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {AppGradientsColors} from '../../../Assets/Styles';
import AppModal from '../../../Components/Common/AppModal';
import GradientButton from '../../../Components/Common/Button/GradientButton';
import GradientWrapper from '../../../Components/Common/GradientWrapper';
import AppText from '../../../Components/Common/Text';
import GradientText from '../../../Components/Common/Text/GradientText';
import {IScreenProps} from '../../../Components/Navigation/navigation';
import ContentList from '../../../Components/Widgets/Content/ContentList';
import Invite from '../../../Components/Widgets/WishList/Invite';
import { AuthContext } from '../../../Contexts/appContentProvider';
import {getWishListDetails} from '../../../Models/Profile';
import {IWishList} from '../../../Models/Profile/profile';

const WishListDetail = ({route, navigation}: IScreenProps) => {
  const { authState } = useContext(AuthContext);
  const [wishListData, setWishListData] = useState<IWishList>();
  const [showInvite, setShowInvite] = useState(false);
  const isMounted = useRef(false);

  const fetchData = useCallback(async () => {
    if (isMounted && route.params?.id) {
      const data = await getWishListDetails(route.params.id);
      setWishListData(data);
    }
  }, [route.params.id]);

  useEffect(() => {
    isMounted.current = true;
    fetchData();
    return () => {
      isMounted.current = false;
    };
  }, [route.params]);

  const handleNavigateButton = () => {
    navigation.navigate('Home');
  };

  const handlePressBack = () => {
    console.log('entra');
    navigation.goBack();
  };

  const handleShowInvite = () => {
    setShowInvite(!showInvite);
  };

  return (
    <LinearGradient colors={AppGradientsColors.base} style={styles.main}>
      <Icon
        size={16}
        color="black"
        style={styles.backIcon}
        onPress={handlePressBack}
        name="arrow-back"
      />
      {authState.profile?.id === wishListData?.author.id && <GradientButton
        onPress={handleShowInvite}
        style={{
          position: 'absolute',
          padding: 5,
          borderRadius: 100,
          right: 10,
          top: 10,
          zIndex: 999
        }}>
        <Icon name="group-add" color="white" size={25} />
      </GradientButton>}
      {wishListData && (
        <ScrollView contentContainerStyle={{alignItems: 'center'}}>
          <View style={styles.presentation}>
            <GradientText
              font="bold"
              fontSize={15}
              style={{marginVertical: 10}}>
              {wishListData.name}
            </GradientText>
            <AppText color="black" fontSize={12}>
              {wishListData.description}
            </AppText>
          </View>
          <Image
            source={{uri: wishListData.previewImage}}
            style={styles.image}
          />
          <LinearGradient
            style={styles.separator}
            colors={AppGradientsColors.active}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
          />
          {wishListData.contents.length > 0 ? (
            <ContentList contents={wishListData.contents} />
          ) : (
            <>
              <AppText fontSize={12}>No hay contenidos guardados en la lista...</AppText>

              <AppText font="bold" fontSize={12} style={{marginTop: 10}}>
                ¡Empieza a Navegar y guarda contenidos!
              </AppText>

              <GradientButton
                onPress={handleNavigateButton}
                style={styles.button}>
                <AppText font="bold" fontSize={15}>
                  Navegar
                </AppText>
              </GradientButton>
            </>
          )}
          <AppModal show={showInvite}>
            <Invite close={handleShowInvite} info={wishListData} />
          </AppModal>
        </ScrollView>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 10,
    paddingBottom: 0,
    backgroundColor: '#1D5771',
  },
  backIcon: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 100,
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 999,
  },
  presentation: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 20,
    padding: 15,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  separator: {
    padding: 2,
    width: '70%',
    marginVertical: 20,
    borderRadius: 100,
  },
  button: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 20,
  },
});

export default WishListDetail;
