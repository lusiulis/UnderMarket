import { View, Image, StyleSheet, Switch } from 'react-native';
import { CommonStyles } from '../../../Assets/Styles';
import AppText from '../../../Components/Common/Text';
import GradientText from '../../../Components/Common/Text/GradientText';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { IAppScreenProps, IScreenProps } from '../../../Components/Navigation/navigation';
import Input from '../../../Components/Common/Input';
import { useState } from 'react';
import GradientButton from '../../../Components/Common/Button/GradientButton';
import { signIn } from '../../../Models/Auth';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {
  ToastAndroid,
  Platform,
} from 'react-native';

const SignIn = ({ navigation }: IAppScreenProps) => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
  });

  const [isStore, setIsStore] = useState(false);

  const handleGoBack = () => {
    navigation.navigate('LogIn');
  };

  const handleToggleChange = () => setIsStore(!isStore);

  const handleInputChange = (value: string, input: string) => {
    if (input === 'email') setFormData({ ...formData, email: value });
    else if (input === 'username') setFormData({ ...formData, username: value });
    else if (input === 'password') setFormData({ ...formData, password: value });
    else if (input === 'confirmPassword')
      setFormData({ ...formData, confirmPassword: value });
    else if (input === 'phoneNumber')
      setFormData({ ...formData, phoneNumber: value });
  };

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      if (Platform.OS === 'android') {
        ToastAndroid.show('Las contraseñas no coinciden', ToastAndroid.SHORT)
      }
    }else{
      const { phoneNumber, ...userData } = formData;
      await signIn(userData).then(x => {
        if (Platform.OS === 'android') {
          ToastAndroid.show('Registrado correctamente', ToastAndroid.SHORT)
        }
        navigation.navigate('LogIn');
      }).catch(error => {
        if (Platform.OS === 'android') {
          ToastAndroid.show('Error al registrarse', ToastAndroid.SHORT)
        }
      });
    }
  };

  const validateForm = () => {
    return !formData.username || !formData.confirmPassword || !formData.email || !formData.password;
  }

  return (
    <LinearGradient colors={['#1D5771', '#2A8187', '#46D9B5']} style={{ flex: 1 }}>
      <View style={{ alignItems: 'center' }} >
        <Image
          style={styles.backgroud}
          source={require('../../../Assets/Images/login-back.png')}
        />
        <View style={styles.form}>
          <Icon
            name="arrow-back-ios"
            size={25}
            color="white"
            style={styles.goBack}
            onPress={handleGoBack}
          />
          <AppText font="bold" fontSize={25}>
            Registro
          </AppText>
          <View style={styles.inputsContainer}>
            <GradientText font="bold" fontSize={20} style={{ marginBottom: 20 }}>
              Información de la Cuenta
            </GradientText>
            <View>
              <ScrollView>

                <Input
                  value={formData.email}
                  placeHolder="Correo"
                  icon="alternate-email"
                  onChange={value => handleInputChange(value, 'email')}
                />
                <Input
                  value={formData.username}
                  placeHolder="Nombre de Usuario"
                  icon="person"
                  onChange={value => handleInputChange(value, 'username')}
                />
                <Input
                  value={formData.password}
                  placeHolder="Contraseña"
                  secure
                  icon="lock"
                  onChange={value => handleInputChange(value, 'password')}
                />
                <Input
                  value={formData.confirmPassword}
                  placeHolder="Confirmar Contraseña"
                  secure
                  icon="lock"
                  onChange={value => handleInputChange(value, 'confirmPassword')}
                />
                {isStore && (
                  <Input
                    value={formData.phoneNumber}
                    placeHolder="Número de Telefono"
                    icon="phone"
                    onChange={value => handleInputChange(value, 'phoneNumber')}
                  />
                )}
              </ScrollView>
            </View>
          </View>
          <GradientButton onPress={handleSubmit} style={styles.button} disabled={validateForm()}>
            <AppText font="bold" fontSize={20}>
              Registrarme
            </AppText>
          </GradientButton>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  backgroud: {
    position: 'absolute',
  },
  form: {
    height: '80%',
    width: '80%',
    paddingVertical: '5%',
    justifyContent: 'space-between',
    ...CommonStyles.transparentContainer,
    top: '6%'
  },
  goBack: {
    position: 'absolute',
    left: 20,
    top: '4%',
  },
  inputsContainer: {},
  accountType: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    padding: 10,
    borderRadius: 10,
  },
});

export default SignIn;
