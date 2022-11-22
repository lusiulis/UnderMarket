import {View, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProfileIcon from '../../Snippets/ProfileIcon';
import GradientWrapper from '../../Common/GradientWrapper';
import { useContext } from 'react';
import { AuthContext } from '../../../Contexts/appContentProvider';

type IIcon = 'home' | 'event' | 'notifications' | 'add-circle' | 'profile';

type INavigationTabProps = {
  focused: boolean;
  value: 'Home' | 'Events' | 'Notifications' | 'Profile' | 'Post';
  icon: IIcon;
};

const NavigationTab = ({focused, value, icon}: INavigationTabProps) => {
  const {authState} = useContext(AuthContext);

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    postContainer: {
      top: '-25%',
      justifyContent: 'center',
      alignItems: 'center',
    }
  });

  return (
    <View style={value === 'Post' ? styles.postContainer : styles.container}>
      {icon !== 'profile' ? (
        focused ? (
          <GradientWrapper>
            <Icon
              size={icon === 'add-circle' ? 55 : 35}
              name={icon}
              color="black"
            />
          </GradientWrapper>
        ) : (
          <Icon
            name={icon}
            size={icon === 'add-circle' ? 55 : 35}
            color="black"
          />
        )
      ) : (
        <ProfileIcon focused={focused} source={authState.profile?.profileImage} />
      )}
    </View>
  );
};

export default NavigationTab;
