import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { AppGradientsColors } from '../../../../Assets/Styles';
import AppText from '../../Text';
import { IFont } from '../../Text/text';

type IGradientButtonProps = {
    loading?: boolean;
    disabled?: boolean;
    colors?: Array<string>;
    style?: Object;
    children: string;
    onPress: () => void;
    font?: IFont;
    fontSize?: number;
    color?: string;
}

const GradientButton = ({colors, children, style, onPress, font, fontSize, color}: IGradientButtonProps) => {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <LinearGradient colors={colors ? colors : AppGradientsColors.active} style={styles.greadientContainer}>
          <AppText font={font} fontSize={fontSize} color={color}>{children}</AppText>
      </LinearGradient>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    greadientContainer: {
        padding: 20,
        borderRadius: 10
    }
})

export default GradientButton