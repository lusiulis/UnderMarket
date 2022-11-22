import {ReactElement} from 'react';
import {StyleProp, TouchableOpacity, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {AppGradientsColors} from '../../../../Assets/Styles';

type IGradientButtonProps = {
  loading?: boolean;
  disabled?: boolean;
  colors?: Array<string>;
  style?: StyleProp<ViewStyle>;
  children: ReactElement;
  onPress: () => void;
  start?: {
    x: number;
    y: number;
  };
  end?: {
    x: number;
    y: number;
  };
};

const GradientButton = ({
  colors,
  children,
  style,
  onPress,
  disabled,
  start,
  end,
}: IGradientButtonProps) => {
  return (
    <LinearGradient
      style={[style, {opacity: disabled ? .7 : 1}]}
      colors={colors ? colors : AppGradientsColors.active}
      start={start}
      end={end}>
      <TouchableOpacity disabled={disabled} onPress={onPress}>
        {children}
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default GradientButton;
