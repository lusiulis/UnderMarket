import MaskedView from '@react-native-masked-view/masked-view';
import {ReactElement} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {StyleProp, View, ViewStyle} from 'react-native';
import {AppGradientsColors} from '../../../Assets/Styles';

type IGradientWrapperProps = {
  children: ReactElement;
  style?: StyleProp<ViewStyle>;
  colors?: Array<string>;
};

const GradientWrapper = ({children, style, colors}: IGradientWrapperProps) => {
  return (
    <MaskedView
      style={{flex: 1, flexDirection: 'row', height: '100%'}}
      maskElement={
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {children}
        </View>
      }>
      <LinearGradient colors={colors ? colors : AppGradientsColors.active} style={{flex: 1}} />
    </MaskedView>
  );
};

export default GradientWrapper;
