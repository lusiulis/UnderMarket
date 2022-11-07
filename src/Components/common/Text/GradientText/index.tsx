import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import { IGradientTextProps } from '../text';
import AppText from '..';
import { AppGradientsColors } from '../../../../Assets/Styles';

const GradientText = ({colors, children, style, font, fontSize, onPress}: IGradientTextProps) => (
  <MaskedView maskElement={<AppText font={font} fontSize={fontSize}>{children}</AppText>} style={style}>
    <LinearGradient colors={colors ? colors : AppGradientsColors.active} start={{x: 0, y: 0}} end={{x: 1, y: 0}}>
      <AppText font={font} fontSize={fontSize} transparent onPress={onPress}>{children}</AppText>
    </LinearGradient>
  </MaskedView>
);


export default GradientText;
