import MaskedView from '@react-native-masked-view/masked-view';
import {ReactElement} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { AppGradientsColors } from '../../../Assets/Styles';

type IGradientWrapperProps = {
  children: ReactElement;
  childrenTransparent: ReactElement;
  style?: Object;
  colors?: Array<string>
};

const GradientWrapper = ({children, style, colors, childrenTransparent}: IGradientWrapperProps) => {
  return <MaskedView maskElement={children} style={style}>
    <LinearGradient colors={colors ? colors : AppGradientsColors.active}>
      {childrenTransparent}
    </LinearGradient>
  </MaskedView>;
};

export default GradientWrapper;
