import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import {Text, StyleProp, TextStyle, StyleSheet} from 'react-native';

type IGradientTextProps = {
  label: string;
  colors: string[];
  style: Object;
};

const GradientText = ({colors, label, style}: IGradientTextProps) => {
  const styles = StyleSheet.create({
    transparentText: {
      opacity: 0,
      ...style,
    },
  });
  return (
    <MaskedView maskElement={<Text style={style}>{label}</Text>}>
      <LinearGradient colors={colors} start={{x: 0, y: 0}} end={{x: 1, y: 0}}>
        <Text style={styles.transparentText}>{label}</Text>
      </LinearGradient>
    </MaskedView>
  );
};

export default GradientText;
