import {useState} from 'react';
import {
  DatePickerAndroid,
  Image,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Input from '../../../Components/Common/Input';
import AppText from '../../../Components/Common/Text';
import {IScreenProps} from '../../../Components/Navigation/navigation';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import GradientButton from '../../../Components/Common/Button/GradientButton';
import {AppGradientsColors} from '../../../Assets/Styles';
import {createEvent} from '../../../Models/Event/event.model';
import {ToastAndroid, Platform} from 'react-native';

const CreateEvent = ({route, navigation}: IScreenProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dateStart: '',
    dateEnd: '',
  });
  const [datePickerStart, setDatePickerStart] = useState(false);
  const [datePickerEnd, setDatePickerEnd] = useState(false);
  const [formDate, setformDate] = useState({
    dateStart: new Date(),
    dateEnd: new Date(),
  });

  const handleInputChange = (value: string, input: string) => {
    if (input === 'name') {
      setFormData({...formData, title: value});
    } else if (input === 'description') {
      setFormData({...formData, description: value});
    }
  };

  function onDateSelected(value: any, type: string) {
    setDatePickerStart(false);
    setDatePickerEnd(false);
    const dateStart =
      new Date(value).getDate().toString() +
      '/' +
      String(new Date(value).getMonth() + 1) +
      '/' +
      new Date(value).getFullYear().toString();
    const dateEnd =
      new Date(value).getDate().toString() +
      '/' +
      String(new Date(value).getMonth() + 1) +
      '/' +
      new Date(value).getFullYear().toString();
    type === 'start'
      ? setFormData({...formData, dateStart: dateStart})
      : setFormData({...formData, dateEnd: dateEnd});
    type === 'start'
      ? setformDate({...formDate, dateStart: value})
      : setformDate({...formDate, dateEnd: value});
  }

  const validateForm = () => {
    return (
      !formData.title ||
      !formData.dateStart ||
      !formData.description ||
      !formData.dateEnd
    );
  };

  const saveEvent = async () => {
    await createEvent({
      ...formData,
      dateEnd: formDate.dateEnd,
      shopId: route.params.id,
    })
      .then(x => {
        if (Platform.OS === 'android') {
          ToastAndroid.show('Evento creado correctamente', ToastAndroid.SHORT);
        }
        navigation.navigate('Events');
      })
      .catch(error => {
        if (Platform.OS === 'android') {
          ToastAndroid.show('Error al crear el evento', ToastAndroid.SHORT);
        }
      });
  };

  return (
    <>
      <LinearGradient
        colors={['#1D5771', '#2A8187', '#46D9B5']}
        style={styles.container}>
        <AppText
          font="bolder"
          style={{textAlign: 'center', marginTop: 40}}
          fontSize={24}>
          Crear Evento
        </AppText>

        <ScrollView>
          <View style={styles.content}>
            <Image source={require('../../../Assets/Icons/calendar.png')} />
            <View style={{width: '80%', marginTop: 30}}>
              <Input
                backgroundColor={'#FFFFFF4F'}
                value={formData.title}
                placeHolder="Titulo del evento"
                icon="event"
                onChange={value => handleInputChange(value, 'name')}
              />
              <Input
                style={{marginTop: 30}}
                backgroundColor={'#FFFFFF4F'}
                value={formData.description}
                placeHolder="Descripción"
                icon="notes"
                onChange={value => handleInputChange(value, 'description')}
              />
              <TouchableOpacity onPress={() => setDatePickerStart(true)}>
                <Input
                  icon="event"
                  onChange={() => {}}
                  style={{marginTop: 30}}
                  backgroundColor={'#FFFFFF4F'}
                  editable={true}
                  value={formData.dateStart}
                  placeHolder="Fecha de inicio"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setDatePickerEnd(true)}>
                <Input
                  icon="event"
                  onChange={() => {}}
                  style={{marginTop: 30}}
                  backgroundColor={'#FFFFFF4F'}
                  editable={true}
                  value={formData.dateEnd}
                  placeHolder="Fecha fin"
                />
              </TouchableOpacity>

              {datePickerStart && (
                <DateTimePicker
                  value={formDate.dateStart}
                  mode={'date'}
                  is24Hour={true}
                  onChange={value =>
                    onDateSelected(value.nativeEvent.timestamp, 'start')
                  }
                  style={styles.datePicker}
                />
              )}

              {datePickerEnd && (
                <DateTimePicker
                  value={formDate.dateEnd}
                  mode={'date'}
                  is24Hour={true}
                  onChange={value =>
                    onDateSelected(value.nativeEvent.timestamp, 'end')
                  }
                  style={styles.datePicker}
                />
              )}
            </View>
            <View style={styles.row}>
              <GradientButton
                colors={AppGradientsColors.cancel}
                onPress={() => navigation.navigate('Profile')}
                style={styles.button}>
                <AppText
                  font="bold"
                  style={{textAlign: 'center'}}
                  fontSize={20}>
                  Cancelar
                </AppText>
              </GradientButton>
              <GradientButton
                colors={AppGradientsColors.active}
                onPress={saveEvent}
                style={styles.button}
                disabled={validateForm()}>
                <AppText
                  font="bold"
                  style={{textAlign: 'center'}}
                  fontSize={20}>
                  Guardar
                </AppText>
              </GradientButton>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    padding: 10,
    borderRadius: 10,
    marginRight: 15,
  },
  row: {
    marginTop: 50,
    display: 'flex',
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-around',
  },
  content: {
    alignItems: 'center',
    marginTop: 20,
  },
  datePicker: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 320,
    height: 260,
    display: 'flex',
  },
});

export default CreateEvent;
