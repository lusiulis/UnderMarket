import { useNavigation } from '@react-navigation/native';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {AppGradientsColors} from '../../../Assets/Styles';
import AppModal from '../../Common/AppModal';
import GradientButton from '../../Common/Button/GradientButton';
import AppText from '../../Common/Text';
import {IScreenProps} from '../../Navigation/navigation';

const AuthWidget = () => {
  const navigation = useNavigation();
  const handleLoginPress = () => {
    navigation.navigate('LogIn');
  };

  return (
    <AppModal>
      <LinearGradient
        colors={AppGradientsColors.active}
        style={styles.container}>
        <View style={styles.shadowContainer}>
          <AppText style={styles.text} fontSize={13}>
            Para utilizar está función debe Iniciar Sesión
          </AppText>
          <GradientButton
            colors={AppGradientsColors.base}
            onPress={handleLoginPress}
            style={styles.button}>
            <AppText font="bold" fontSize={20}>
              Iniciar Sesión
            </AppText>
          </GradientButton>
        </View>
      </LinearGradient>
    </AppModal>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadowContainer: {
    height: '40%',
    width: '70%',
    padding: '10%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 20,
  },
  button: {
    padding: 10,
    borderRadius: 10,
  },
  text: {
    textAlign: 'center',
  },
});

export default AuthWidget;
