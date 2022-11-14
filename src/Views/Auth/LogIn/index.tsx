import {useState} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {CommonStyles} from '../../../Assets/Styles';
import GradientButton from '../../../Components/Common/Button/GradientButton';
import Input from '../../../Components/Common/Input';
import AppText from '../../../Components/Common/Text';
import GradientText from '../../../Components/Common/Text/GradientText';
import {IAuthScreenProps} from '../../../Components/Navigation/navigation';
import {login} from '../../../Models/Auth';

const LogIn = ({navigation}: IAuthScreenProps) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleUsernameChage = (username: string) => {
    setFormData({...formData, username: username});
  };

  const handlePasswordChage = (password: string) => {
    setFormData({...formData, password: password});
  };

  const handleLogIn = async () => {
    const response = await login(formData);
    if (response.valid) {
      navigation.navigate('AppNavigation', response.data[0].id);
    }
  };

  const handleForgotPassword = () => {};

  const handleSignIn = () => {
    navigation.navigate('SignIn');
  };

  return (
    <View style={CommonStyles.mainContainer}>
      <Image
        style={styles.backgroud}
        source={require('../../../Assets/Images/login-back.png')}
      />
      <AppText font="bolder" fontSize={50}>
        UnderMarket
      </AppText>
      <AppText font="bold" fontSize={30}>
        The Market For All
      </AppText>
      <View style={styles.form}>
        <AppText font="bold" fontSize={30}>
          Inicio de Sesión
        </AppText>
        <View style={styles.inputContainer}>
          <Input
            onChange={handleUsernameChage}
            icon="person"
            value={formData.username}
            placeHolder="Usuario"
          />
          <Input
            onChange={handlePasswordChage}
            icon="lock"
            value={formData.password}
            placeHolder="Contraseña"
            secure
          />
        </View>
        <GradientButton
          style={styles.button}
          onPress={handleLogIn}
          font="bold"
          fontSize={20}>
          Iniciar Sesión
        </GradientButton>
        <GradientText
          font="bold"
          fontSize={15}
          style={styles.forgotText}
          onPress={handleForgotPassword}>
          Olvide mi Contraseña
        </GradientText>
        <View style={styles.welcomeContainer}>
          <AppText font="bold" fontSize={15}>
            ¿No tienes cuenta?
          </AppText>
          <GradientText
            font="bold"
            fontSize={15}
            style={styles.signinText}
            onPress={handleSignIn}>
            Registrarme
          </GradientText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroud: {
    position: 'absolute',
  },
  form: {
    marginTop: '10%',
    height: '60%',
    width: '80%',
    ...CommonStyles.transparentContainer,
  },
  inputContainer: {
    marginTop: '10%',
  },
  button: {
    marginTop: '7%',
  },
  forgotText: {
    marginTop: '7%',
  },
  welcomeContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '7%',
  },
  signinText: {
    marginLeft: '2%',
  },
});

export default LogIn;
