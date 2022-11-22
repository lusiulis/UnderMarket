import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {ScrollView, StyleSheet, View, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {AppGradientsColors, CommonStyles} from '../../Assets/Styles';
import AppText from '../../Components/Common/Text';
import GradientText from '../../Components/Common/Text/GradientText';
import {IScreenProps} from '../../Components/Navigation/navigation';
import {AuthContext} from '../../Contexts/appContentProvider';
import {getProfileWishLists} from '../../Models/Profile';
import {IInvitation, IWishListLight} from '../../Models/Profile/profile';

const WishList = ({navigation}: IScreenProps) => {
  const {authState} = useContext(AuthContext);
  const [wishLists, setWishLists] = useState<IWishListLight[]>([]);
  const isMounted = useRef(false);

  const fetchWishListsInfo = useCallback(async () => {
    if (isMounted && authState.profile) {
      const data = await getProfileWishLists(authState.profile.id);
      console.log(data)
      setWishLists(data);
    }
  }, [authState.profile]);

  useEffect(() => {
    isMounted.current = true;
    fetchWishListsInfo();
    return () => {
      isMounted.current = false;
    };
  }, [authState.profile]);

  return (
    <View style={styles.main}>
      <ScrollView>
        <GradientText
          font="bolder"
          fontSize={25}
          start={{x: 0, y: 1}}
          end={{x: 0, y: 0}}>
          Listas de Deseos
        </GradientText>
        {wishLists.length === 0 ? (
          <View></View>
        ) : (
          <View style={[CommonStyles.transparentContainer, styles.wishList]}>
            {wishLists.map((wishList, index) => (
              <LinearGradient
                style={styles.wishListItem}
                colors={AppGradientsColors.active}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                key={index}>
                <AppText font='bold' fontSize={12}>{wishList.name}</AppText>
                <View style={styles.imageContainer}>
                  <Image source={{uri: wishList.previewImage}}  />
                </View>
              </LinearGradient>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#1D5771',
    flex: 1,
    alignItems: 'center',
    padding: 10,
    paddingTop: 20,
    paddingBottom: 0,
  },
  wishList: {
    marginTop: 10
  },
  wishListItem: {
    padding: 10,
    borderRadius: 10
  },
  imageContainer: {

  }
});

export default WishList;
