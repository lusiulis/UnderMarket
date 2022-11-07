import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {IAppTextProps} from './text';

const AppFonts = {
  normal: 'Montserrat',
  medium: 'Montserrat-Medium',
  bold: 'Montserrat-Bold',
  bolder: 'Montserrat-ExtraBold',
};

const AppText = ({children, font, fontSize, color, onPress, transparent}: IAppTextProps) => {
  const styles = StyleSheet.create({
    textStyle: {
      fontFamily: AppFonts[font ? font : 'normal'],
      fontSize: fontSize ? fontSize : 10,
      color: color ? color : 'white',
      opacity: transparent ? 0 : 1,
    },
  });
  return (
    <Text onPress={onPress} style={styles.textStyle}>
      {children}
    </Text>
  );
};

export default AppText;
