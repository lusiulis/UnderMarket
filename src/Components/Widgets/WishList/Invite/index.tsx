import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {StyleSheet, ToastAndroid, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {CommonStyles} from '../../../../Assets/Styles';
import {AuthContext} from '../../../../Contexts/appContentProvider';
import {
  getWishListIntegrators,
  inviteUser,
  searchProfileLight,
} from '../../../../Models/Profile';
import {IProfileLight, IWishList} from '../../../../Models/Profile/profile';
import Input from '../../../Common/Input';
import AppText from '../../../Common/Text';
import GradientText from '../../../Common/Text/GradientText';
import ProfileIcon from '../../../Snippets/ProfileIcon';

type IInviteProps = {
  info: IWishList;
  close: () => void;
};

const Invite = ({info, close}: IInviteProps) => {
  const {authState} = useContext(AuthContext);
  const [integratorsList, setIntegratorsList] = useState<IProfileLight[]>([]);
  const isMounted = useRef(false);
  const [userSearchList, setUserSearchList] = useState<IProfileLight[]>([]);
  const [searchList, setSearchList] = useState<IProfileLight[]>([]);
  const [userSearchValue, setUserSearchValue] = useState('');
  const [isFocused, setFocused] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const fetchData = useCallback(async () => {
    if (isMounted) {
      const data = await getWishListIntegrators(info.id);
      const searchData = await searchProfileLight(info.id);
      const realData = searchData.filter((profile) => !integratorsList.includes(profile) && !(authState.profile?.id === profile.id))
      setUserSearchList(realData);
      setIntegratorsList(data);
    }
  }, []);

  useEffect(() => {
    isMounted.current = true;
    fetchData();
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const newUsers =
      userSearchValue === ''
        ? userSearchList
        : userSearchList.filter(user =>
            user.username.includes(userSearchValue),
          );
    setSearchList(newUsers);
  }, [userSearchValue]);

  const handleInputChange = (value: string) => {
    setUserSearchValue(value);
  };

  const handleFocused = () => {
    setFocused(!isFocused);
    if (!showSearch) setShowSearch(true);
  };

  const handleInvite = async (profile: IProfileLight) => {
    await inviteUser(profile.id, info.id);
    close();
    ToastAndroid.show('¡Invitación enviada!', ToastAndroid.SHORT)
  }

  return (
    <View style={styles.main}>
      <Icon
        name="close"
        style={styles.closeIcon}
        size={15}
        color="black"
        onPress={close}
      />
      <View style={[CommonStyles.transparentContainer, styles.container]}>
        <AppText font="bold" fontSize={15}>
          Grupo de Acceso
        </AppText>
        <View style={styles.wishListName}>
          <AppText color="black" fontSize={15}>
            Lista:
          </AppText>
          <GradientText font="bold" fontSize={15}>
            {info.name}
          </GradientText>
        </View>

        <View style={styles.integratorsContainer}>
          <AppText
            font="bold"
            fontSize={15}
            color="black"
            style={{marginBottom: 10}}>
            Integrantes
          </AppText>
          {authState.profile && (
            <View style={styles.integratorItem}>
              <ProfileIcon source={authState.profile.profileImage} size={25} />
              <GradientText style={{marginLeft: 10}} font="bold" fontSize={12}>
                {authState.profile.username}
              </GradientText>
            </View>
          )}

          {integratorsList.map((integrator, index) => (
            <View key={index} style={styles.integratorItem}>
              <ProfileIcon source={integrator.profileImage} size={25} />
              <AppText style={{marginLeft: 10}} font="bold" fontSize={12}>
                {integrator.username}
              </AppText>
            </View>
          ))}
        </View>

        <View style={styles.inviteForm}>
          <AppText font="bold" fontSize={15} color="black">
            Invitar
          </AppText>
          {showSearch && searchList.length > 0 && (
            <View
              style={[
                CommonStyles.transparentContainer,
                styles.searchContainer,
              ]}>
              <Icon
                name="close"
                size={15}
                color="black"
                onPress={() => setShowSearch(false)}
                style={{
                  position: 'absolute',
                  top: 3,
                  right: 3,
                  padding: 5,
                  backgroundColor: 'white',
                  borderRadius: 100,
                  zIndex: 999,
                }}
              />
              {searchList.map((item, index) => (
                <TouchableOpacity key={index} style={styles.integratorItem} onPress={() => handleInvite(item)}>
                  <ProfileIcon source={item.profileImage} size={25} />
                  <AppText style={{marginLeft: 10}} font="bold" fontSize={12}>
                    {item.username}
                  </AppText>
                </TouchableOpacity>
              ))}
            </View>
          )}
          <Input
            value={userSearchValue}
            onChange={handleInputChange}
            placeHolder="Buscar Perfil..."
            style={styles.input}
            focused={isFocused}
            setFocused={handleFocused}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 100,
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 999,
  },
  container: {
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  wishListName: {
    padding: 10,
    width: '90%',
    justifyContent: 'space-between',
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    marginVertical: 20,
    display: 'flex',
    flexDirection: 'row',
  },
  integratorsContainer: {
    width: '90%',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  integratorItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 10,
    margin: 2,
  },
  inviteForm: {
    width: '90%',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  input: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 5,
    borderRadius: 10,
    marginTop: 10,
  },
  searchContainer: {
    marginTop: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Invite;
