import { useContext } from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {CommonStyles} from '../../../../Assets/Styles';
import { AuthContext } from '../../../../Contexts/appContentProvider';
import { acceptWishListInvitation, dennyWishListInvitation } from '../../../../Models/Profile';
import {
  IInvitation,
  IWishListInvitation,
} from '../../../../Models/Profile/profile';
import GradientButton from '../../../Common/Button/GradientButton';
import AppText from '../../../Common/Text';
import GradientText from '../../../Common/Text/GradientText';
import ProfileIcon from '../../../Snippets/ProfileIcon';

type IInvitationsProps = {
  invitations: IWishListInvitation[];
  close: () => void;
  handleRemoveFromList: (id: string) => void;
  handleRefreshList: () => void;
};

const Invitations = ({invitations, close, handleRemoveFromList, handleRefreshList}: IInvitationsProps) => {
  const {authState} = useContext(AuthContext);

  const handleDenny = async (invitation: IWishListInvitation) => {
    if(authState.profile) {
      await dennyWishListInvitation(authState.profile.id, invitation.id)
      handleRemoveFromList(invitation.id)
    }
  };

  const handleAccept = async (invitation: IWishListInvitation) => {
    if(authState.profile) {
        await acceptWishListInvitation(authState.profile.id, invitation.id)
        handleRemoveFromList(invitation.id);
        handleRefreshList();
      }
  };

  return (
    <View style={styles.main}>
      <View style={[CommonStyles.transparentContainer, styles.container]}>
        <AppText font="bolder" fontSize={15}>
          Invititaciones
        </AppText>
        <Icon
          name="close"
          style={styles.closeIcon}
          size={15}
          color="black"
          onPress={close}
        />
        <View style={{marginTop: 20, width: '100%'}}>
          {invitations.map((invitation, index) => (
            <View style={styles.item} key={index}>
              <GradientText fontSize={12} font="bold">
                {invitation.name}
              </GradientText>
              <AppText fontSize={12} color="black">
                {invitation.description}
              </AppText>
              <View style={styles.bottomContainer}>
                <View style={styles.bottomSubContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleDenny(invitation)}>
                    <AppText font="bold" fontSize={12}>
                      Rechazar
                    </AppText>
                  </TouchableOpacity>
                  <GradientButton
                    style={styles.button}
                    onPress={() => handleAccept(invitation)}>
                    <AppText font="bold" fontSize={12}>
                      Aprobar
                    </AppText>
                  </GradientButton>
                </View>
                <View style={styles.bottomSubContainer}>
                  <AppText color="black" font="bold" fontSize={12}>
                    {invitation.author.username}
                  </AppText>
                  <ProfileIcon
                    style={{marginLeft: 10}}
                    source={invitation.author.profileImage}
                    size={15}
                  />
                </View>
              </View>
            </View>
          ))}
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
    position: 'absolute',
    right: 10,
    top: 10,
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 100,
  },
  container: {
    width: '80%',
    alignItems: 'center',
  },
  item: {
    width: '100%',
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
  },
  bottomContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottomSubContainer: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    padding: 5,
    backgroundColor: 'red',
    borderRadius: 10,
    marginHorizontal: 5,
  },
});

export default Invitations;
