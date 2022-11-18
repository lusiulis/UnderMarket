import {ReactElement} from 'react';
import {StyleSheet, Modal, ViewStyle, View} from 'react-native';

type IAppModalProps = {children: ReactElement; style?: ViewStyle, show?: boolean};

const AppModal = ({children, style, show}: IAppModalProps) => {
  return <Modal visible={show ? show : true} transparent><View style={[styles.background, style]}>{children}</View></Modal>;
};

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,.4)',
  },
});

export default AppModal;
