import {ReactElement} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {AppGradientsColors} from '../../../../Assets/Styles';

type IGradientButtonProps = {
  loading?: boolean;
  disabled?: boolean;
  colors?: Array<string>;
  style?: Object;
  children: ReactElement;
  onPress: () => void;
};

const GradientButton = ({
  colors,
  children,
  style,
  onPress,
  disabled
}: IGradientButtonProps) => {
  return (
    <LinearGradient
      style={style}
      colors={colors ? colors : AppGradientsColors.active}>
      <TouchableOpacity disabled={disabled} onPress={onPress}>{children}</TouchableOpacity>
    </LinearGradient>
  );
};

export default GradientButton;
