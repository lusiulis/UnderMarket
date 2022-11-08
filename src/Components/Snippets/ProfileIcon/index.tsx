import {View, StyleSheet, ViewStyle, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { AppGradientsColors } from '../../../Assets/Styles';

type IProfileIconProps = {
  style?: ViewStyle;
  size?: number;
  focused?: boolean;
};

const ProfileIcon = ({style, size, focused}: IProfileIconProps) => {
  const styles = StyleSheet.create({
    profileContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        padding: '2%'
    },
    imageStyle: {
        width: size ? size : 35,
        height: size ? size : 35,
        borderRadius: 100,
    }
  });
  return focused ? 
    <LinearGradient style={[styles.profileContainer, style]} colors={AppGradientsColors.active}>
      <Image
        source={require('../../../Assets/Images/StaticProfile.png')}
        style={styles.imageStyle}
      />
    </LinearGradient>
  :
    <View style={[styles.profileContainer, style, {backgroundColor: 'black'}]}>
      <Image
        source={require('../../../Assets/Images/StaticProfile.png')}
        style={styles.imageStyle}
      />
    </View>
};

export default ProfileIcon;
