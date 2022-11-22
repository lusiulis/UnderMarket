import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {AppGradientsColors, CommonStyles} from '../../Assets/Styles';
import AppModal from '../../Components/Common/AppModal';
import GradientButton from '../../Components/Common/Button/GradientButton';
import AppText from '../../Components/Common/Text';
import GradientText from '../../Components/Common/Text/GradientText';
import {IScreenProps} from '../../Components/Navigation/navigation';
import ProfileIcon from '../../Components/Snippets/ProfileIcon';
import Invitations from '../../Components/Widgets/WishList/Invitations';
import WishListForm from '../../Components/Widgets/WishList/WIshListForm';
import {AuthContext} from '../../Contexts/appContentProvider';
import {
  getProfileWishLists,
  getProfileWishListsInvitations,
} from '../../Models/Profile';
import {
  IWishListInvitation,
  IWishListLight,
} from '../../Models/Profile/profile';

const WishList = ({navigation}: IScreenProps) => {
  const {authState} = useContext(AuthContext);
  const [wishLists, setWishLists] = useState<IWishListLight[]>([]);
  const [invitations, setInvitations] = useState<IWishListInvitation[]>([]);
  const [showWishList, setShowWishList] = useState(false);
  const [showInvitations, setShowInvitations] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const isMounted = useRef(false);

  const fetchWishListsInfo = useCallback(async () => {
    if (isMounted && authState.profile) {
      const wishListData = await getProfileWishLists(authState.profile.id);
      const invitations = await getProfileWishListsInvitations(
        authState.profile.id,
      );
      setWishLists(wishListData);
      setInvitations(invitations);
    }
  }, [authState.profile]);

  useEffect(() => {
    isMounted.current = true;
    fetchWishListsInfo();
    return () => {
      isMounted.current = false;
    };
  }, [authState.profile]);

  const handlePressBack = () => {
    navigation.goBack();
  }

  const handlePressItem = (wishlist: IWishListLight) => {
    setShowWishList(!showWishList);
    navigation.navigate('WishListDetail', {id: wishlist.id});
  };

  const handleNewWishlist = (refresh?: boolean) => {
    if(refresh) handleRefreshList();
    setShowAddForm(!showAddForm);
  };

  const handleShowInvitations = () => {
    setShowInvitations(!showInvitations);
  };

  const handleRemoveFromList = (id: string) => {
    const newInvitations = invitations.filter(
      invitation => invitation.id !== id,
    );
    setInvitations(newInvitations);
    if (newInvitations.length === 0) setShowInvitations(false);
  };

  const handleRefreshList = async () => {
    if (authState.profile) {
      const wishListData = await getProfileWishLists(authState.profile.id);
      setWishLists(wishListData);
    }
  };

  return (
    <View style={styles.main}>
      <Icon size={16} color='black' style={styles.backIcon} onPress={handlePressBack} name='arrow-back' />
      <ScrollView
        style={{width: '100%'}}
        contentContainerStyle={styles.scrollContainer}>
        <AppText font="bolder" fontSize={25}>
          Listas de Deseos
        </AppText>
        {invitations.length > 0 && (
          <TouchableOpacity
            style={styles.invitationMenu}
            onPress={handleShowInvitations}>
            <Icon name="email" color="black" size={25} />
            <LinearGradient
              style={{
                position: 'absolute',
                borderRadius: 100,
                backgroundColor: 'white',
                left: -7,
                bottom: -7,
              }}
              colors={AppGradientsColors.active}>
              <AppText style={{margin: 4}} font="bolder" fontSize={10}>
                {String(invitations.length).concat('+')}
              </AppText>
            </LinearGradient>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => handleNewWishlist()} style={styles.button}>
          <GradientText
            start={{x: 0, y: 1}}
            end={{x: 0, y: 0}}
            font="bold"
            fontSize={15}>
            Nueva Lista
          </GradientText>
        </TouchableOpacity>
        {wishLists.length === 0 ? (
          <View></View>
        ) : (
          <View style={[CommonStyles.transparentContainer, styles.wishList]}>
            {wishLists.length > 0 ? (
              wishLists.map((wishList, index) => (
                <GradientButton
                  onPress={() => handlePressItem(wishList)}
                  style={styles.wishListItem}
                  colors={AppGradientsColors.active}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  key={index}>
                  <View style={{alignItems: 'center'}}>
                    <AppText
                      font="bold"
                      fontSize={12}
                      style={{textAlign: 'center', marginBottom: 10}}>
                      {wishList.name}
                    </AppText>

                    <Image
                      source={{uri: wishList.previewImage}}
                      style={styles.image}
                    />

                    <View style={styles.profileContainer}>
                      <AppText fontSize={12} font="bold">
                        {wishList.author.username}
                      </AppText>
                      <ProfileIcon
                        size={25}
                        source={wishList.author.profileImage}
                        style={{marginLeft: 5}}
                      />
                    </View>
                  </View>
                </GradientButton>
              ))
            ) : (
              <AppText font="bold">No hay listas de deseo...</AppText>
            )}
          </View>
        )}
      </ScrollView>
      <AppModal show={showInvitations}>
        <Invitations
          invitations={invitations}
          close={handleShowInvitations}
          handleRemoveFromList={handleRemoveFromList}
          handleRefreshList={handleRefreshList}
        />
      </AppModal>
      <AppModal show={showAddForm}>
        <WishListForm close={handleNewWishlist}/>
      </AppModal>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#1D5771',
    flex: 1,
    alignItems: 'center',
    padding: 10,
    paddingBottom: 0
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
  invitationMenu: {
    position: 'absolute',
    right: 0,
  },
  button: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginVertical: 20,
  },
  wishList: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  wishListItem: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 10,
    margin: 5,
    width: '45%',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 20,
    alignSelf: 'center',
  },
  scrollContainer: {
    alignItems: 'center',
  },
  profileContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginLeft: 'auto',
  },
});

export default WishList;
