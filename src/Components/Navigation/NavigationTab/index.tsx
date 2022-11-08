import {View, StyleSheet, Image} from 'react-native';
import {AppColors, AppGradientsColors} from '../../../Assets/Styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProfileIcon from '../../Snippets/ProfileIcon';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';

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
      borderRadius: 35,
      backgroundColor: 'white',
    },
    image: {
      width: 35,
      height: 35,
      tintColor: focused ? AppColors.baseRed : 'black',
    },
    postImage: {
      width: 45,
      height: 45,
      tintColor: focused ? AppColors.baseRed : 'black',
    },
  });

  return (
    <View style={value === 'Post' ? styles.postContainer : styles.container}>
      {icon !== 'profile' ? (
        focused ? (
          <MaskedView
            maskElement={
              <View
                style={{
                  backgroundColor: 'transparent',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon name={icon} size={icon === 'add-circle' ? 50 : 35} />
              </View>
            }>
            <LinearGradient
              colors={AppGradientsColors.active}
              style={{
                backgroundColor: 'transparent',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon name={icon} size={icon === 'add-circle' ? 50 : 35} style={{opacity: 0}} />
            </LinearGradient>
          </MaskedView>
        ) : (
          <Icon
            name={icon}
            size={icon === 'add-circle' ? 50 : 35}
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
