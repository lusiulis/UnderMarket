import {useContext} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {AppColors} from '../../Assets/Styles';
import GradientButton from '../../Components/Common/Button/GradientButton';
import AppText from '../../Components/Common/Text';
import {AuthContext} from '../../Contexts/app.context.provider';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
  const {authState} = useContext(AuthContext);
  const navigation = useNavigation();

  const handleRegister = () => {
    navigation.navigate('LogIn')
  };

  return (
    <View style={styles.container}>
      {authState.isAunthenticated ? (
        <>
          <AppText>Profile View</AppText>
        </>
      ) : (
        <GradientButton onPress={handleRegister} style={styles.button}>
          <AppText fontSize={20} font="bold">
            Iniciar Sesión
          </AppText>
        </GradientButton>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.turquoise,
  },
  button: {
    padding: 10,
    borderRadius: 10,
  },
});

export default Profile;
