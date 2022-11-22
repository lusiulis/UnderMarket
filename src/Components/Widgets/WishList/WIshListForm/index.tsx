import {useContext, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  ToastAndroid,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {AppGradientsColors, CommonStyles} from '../../../../Assets/Styles';
import {AuthContext} from '../../../../Contexts/appContentProvider';
import {addProfileWishList} from '../../../../Models/Profile';
import {IWishList} from '../../../../Models/Profile/profile';
import GradientButton from '../../../Common/Button/GradientButton';
import Input from '../../../Common/Input';
import AppText from '../../../Common/Text';
import GradientText from '../../../Common/Text/GradientText';

type IWishListFormProps = {
  close: (refresh?: boolean) => void;
};

const defaultWishListPreviewImage =
  'https://cdn-icons-png.flaticon.com/512/4379/4379561.png';

const WishListForm = ({close}: IWishListFormProps) => {
  const {authState} = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const handleInputChange = (value: string, input: string) => {
    setFormData(
      input === 'name'
        ? {...formData, name: value}
        : {...formData, description: value},
    );
  };

  const validForm = formData.description.length > 0 && formData.name.length > 0

  const handleSubmit = async () => {
    if (authState.profile && validForm) {
      await addProfileWishList({
        authorId: authState.profile.id,
        ...formData,
      });
      close(true);
    }
  };

  return (
    <LinearGradient colors={AppGradientsColors.active} style={styles.main}>
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}>
            <Icon
          name="close"
          style={styles.closeIcon}
          size={15}
          color="black"
          onPress={() => close()}
        />
        <View style={[CommonStyles.transparentContainer, styles.container]}>
          <AppText font="bold" fontSize={18}>
            Crear Lista de Deseos
          </AppText>
          <Image
            source={{uri: defaultWishListPreviewImage}}
            style={styles.image}
          />
          <View
            style={[CommonStyles.transparentContainer, styles.inputsContainer]}>
            <Input
              value={formData.name}
              icon="title"
              style={styles.input}
              placeHolder="Nombre.."
              onChange={value => handleInputChange(value, 'name')}
            />
            <Input
              value={formData.description}
              icon="description"
              style={styles.input}
              placeHolder="Descripción.."
              onChange={value => handleInputChange(value, 'description')}
            />
          </View>

          <GradientButton colors={['white', 'white']} onPress={handleSubmit} style={styles.submit} disabled={!validForm}>
            <GradientText font="bold" fontSize={15}>
              Guardar Lista de Deseos
            </GradientText>
          </GradientButton>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  container: {
    padding: 20,
    width: '80%',
  },
  image: {
    width: 100,
    height: 100,
    margin: 20,
  },
  inputsContainer: {
    width: '100%',
  },
  input: {
    width: '100%',
  },
  submit: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  closeIcon: {
    position: 'absolute',
    left: 10,
    top: 10,
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 100,
  },
});

export default WishListForm;
