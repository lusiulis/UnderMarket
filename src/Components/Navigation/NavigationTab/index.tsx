import {View, StyleSheet, Text} from 'react-native';
import {AppColors, AppGradientsColors} from '../../../Assets/Styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProfileIcon from '../../Snippets/ProfileIcon';
import GradientWrapper from '../../Common/GradientWrapper';

type IIcon = 'home' | 'search' | 'notifications' | 'add-circle' | 'profile';

type INavigationTabProps = {
  focused: boolean;
  value: 'Home' | 'Search' | 'Notifications' | 'Profile' | 'Post';
  icon: IIcon;
};

const NavigationTab = ({focused, value, icon}: INavigationTabProps) => {
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
        <ProfileIcon focused={focused} />
      )}
    </View>
  );
};

export default NavigationTab;
