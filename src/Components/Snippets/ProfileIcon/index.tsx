import {View, StyleSheet, ViewStyle, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {AppGradientsColors} from '../../../Assets/Styles';

type IProfileIconProps = {
  style?: ViewStyle;
  size?: number;
  focused?: boolean;
  source?: string
};

const ProfileIcon = ({style, size, focused, source}: IProfileIconProps) => {

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

  const defaultImage = 'https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255710-stock-illustration-avatar-vector-male-profile-gray.jpg';

  return focused ? (
    <LinearGradient
      style={[styles.profileContainer, style]}
      colors={AppGradientsColors.active}>
      <Image
        source={{
          width: size ? size : 35,
          height: size ? size : 35,
          uri: source ? source: defaultImage,
        }}
        style={styles.imageStyle}
      />
    </LinearGradient>
  ) : (
    <View style={[styles.profileContainer, style, {backgroundColor: 'black'}]}>
      <Image
        source={{
          width: size ? size : 35,
          height: size ? size : 35,
          uri: source ? source: defaultImage,
        }}
        style={styles.imageStyle}
      />
    </View>
  );
};

export default ProfileIcon;
