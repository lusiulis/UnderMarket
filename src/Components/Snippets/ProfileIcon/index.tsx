import {useNavigation} from '@react-navigation/native';
import {
  View,
  StyleSheet,
  ViewStyle,
  Image,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {AppGradientsColors} from '../../../Assets/Styles';
import GradientButton from '../../Common/Button/GradientButton';

type IProfileIconProps = {
  style?: ViewStyle;
  size?: number;
  focused?: boolean;
  source?: string;
  redirects?: {
    id: string;
    isShop: boolean;
  };
};

const ProfileIcon = ({
  style,
  size,
  focused,
  source,
  redirects,
}: IProfileIconProps) => {
  const styles = StyleSheet.create({
    profileContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 100,
      padding: 2,
    },
    imageStyle: {
      width: size ? size : 35,
      height: size ? size : 35,
      borderRadius: 100,
    },
  });

  const navigation = useNavigation();

  const defaultImage =
    'https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255710-stock-illustration-avatar-vector-male-profile-gray.jpg';

  const handleProfileIconPress = () => {
    if (redirects) {
      redirects.isShop
        ? navigation.navigate('Shop', {id: redirects.id})
        : navigation.navigate('Profile', {id: redirects.id});
    }
  };

  return focused ? (
    redirects ? (
      <GradientButton
        onPress={handleProfileIconPress}
        style={[styles.profileContainer, style]}
        colors={AppGradientsColors.active}>
        <Image
          source={{
            width: size ? size : 35,
            height: size ? size : 35,
            uri: source ? source : defaultImage,
          }}
          style={styles.imageStyle}
        />
      </GradientButton>
    ) : (
      <LinearGradient
        style={[styles.profileContainer, style]}
        colors={AppGradientsColors.active}>
        <Image
          source={{
            width: size ? size : 35,
            height: size ? size : 35,
            uri: source ? source : defaultImage,
          }}
          style={styles.imageStyle}
        />
      </LinearGradient>
    )
  ) : redirects ? (
    <TouchableOpacity
      style={[styles.profileContainer, style, {backgroundColor: 'black'}]}
      onPress={handleProfileIconPress}>
      <Image
        source={{
          width: size ? size : 35,
          height: size ? size : 35,
          uri: source && source !== '' ? source : defaultImage,
        }}
        style={styles.imageStyle}
      />
    </TouchableOpacity>
  ) : (
    <View style={[styles.profileContainer, style, {backgroundColor: 'black'}]}>
      <Image
        source={{
          width: size ? size : 35,
          height: size ? size : 35,
          uri: source && source !== '' ? source : defaultImage,
        }}
        style={styles.imageStyle}
      />
    </View>
  );
};

export default ProfileIcon;
