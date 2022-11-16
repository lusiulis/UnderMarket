import {ReactElement} from 'react';
import {StyleSheet, Modal, ViewStyle} from 'react-native';

type IAppModalProps = {children: ReactElement; style?: ViewStyle};

const AppModal = ({children, style}: IAppModalProps) => {
  return <Modal style={[styles.background, style]}>{children}</Modal>;
};

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,.4)',
  },
});

export default AppModal;
