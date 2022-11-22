import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {Image, StyleSheet, ToastAndroid, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {AppGradientsColors, CommonStyles} from '../../../../Assets/Styles';
import {AuthContext} from '../../../../Contexts/appContentProvider';
import {IContentCard} from '../../../../Models/Content/Content';
import {
  addToWishList,
  getProfileWishListsCards,
} from '../../../../Models/Profile';
import {IWishListCard} from '../../../../Models/Profile/profile';
import GradientButton from '../../../Common/Button/GradientButton';
import AppText from '../../../Common/Text';

type ISaveContentProps = {
  close: () => void;
  content: IContentCard;
};

const SaveContent = ({close, content}: ISaveContentProps) => {
  const [wishLists, setWishLists] = useState<IWishListCard[]>([]);
  const {authState} = useContext(AuthContext);
  const isMounted = useRef(false);

  const fetchWishListsData = useCallback(async () => {
    if (isMounted && authState.profile) {
      const data = await getProfileWishListsCards(authState.profile.id);
      setWishLists(data);
    }
  }, []);

  useEffect(() => {
    isMounted.current = true;
    fetchWishListsData();
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleSave = async (value: IWishListCard) => {
    if(await addToWishList(value.id, content)) {
        close();
        ToastAndroid.show('¡Articulo Guardado!', ToastAndroid.SHORT);
    }else {
        ToastAndroid.show('Ya existe el artiuclo en la lista', ToastAndroid.SHORT);
    }
    
  };

  return (
    <View style={styles.main}>
      <Icon
        size={15}
        style={styles.closeIcon}
        color="black"
        name="close"
        onPress={close}
      />
      <View style={styles.container}>
        <AppText font="bold" fontSize={15} color="black">
          Seleccione la Lista de Deseos
        </AppText>
        <View
          style={[
            CommonStyles.transparentContainer,
            styles.wishListsContainer,
          ]}>
          {wishLists.length > 0 ? (
            wishLists.map((wishlist, index) => (
              <GradientButton
                onPress={() => handleSave(wishlist)}
                colors={AppGradientsColors.active}
                key={index}
                style={styles.wishListItem}>
                <>
                  <AppText font="bold" fontSize={12}>
                    {wishlist.name}
                  </AppText>
                  <Image
                    source={{uri: wishlist.previewImage}}
                    style={styles.image}
                  />
                </>
              </GradientButton>
            ))
          ) : (
            <AppText fontSize={12}>No hay Listas de Deseo registradas</AppText>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '80%',
    padding: 10,
    alignItems: 'center',
  },
  wishListsContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  wishListItem: {
    padding: 10,
    borderRadius: 10,
    margin: 5,
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    marginVertical: 5,
    borderRadius: 10,
  },
  closeIcon: {
    position: 'absolute',
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 100,
    zIndex: 999,
    top: 10,
    left: 10,
  },
});

export default SaveContent;
