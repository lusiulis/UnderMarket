import {useState} from 'react';
import {View, StyleSheet, Text, TextInput, StyleProp, TextStyle} from 'react-native';
import {AppColors} from '../../../Assets/Styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {IconName} from '../../../Utils/common';
import { KeyboardType } from 'react-native';

type IInputProps = {
  icon?: IconName;
  onChange: (v: string) => void;
  style?: StyleProp<TextStyle>;
  value?: any;
  error?: boolean;
  placeHolder: string;
  secure?: boolean;
  color?: string;
  backgroundColor?: string;
  keyboardType?: KeyboardType;
  stateManagment?: boolean;
};

const Input = ({
  icon,
  onChange,
  style,
  value,
  error,
  placeHolder,
  secure,
  color,
  backgroundColor,
  stateManagment,
  keyboardType
}: IInputProps) => {
  const [focused, setFocused] = useState(false);
  const [inputValue, setInputValue] = useState(String(value))

  const getBorderColor = () => {
    if (error) {
      return AppColors.baseRed;
    }

    if (focused) {
      return AppColors.darkOcean;
    } else {
      return AppColors.grey;
    }
  };

  const styles = StyleSheet.create({
    wrapper: {
      borderRadius: 10,
      alignItems: 'center'
    },
    textInput: {
      color: color ? color : 'white',
      fontFamily: 'Montserrat-Regular',
    },
    error: {
      color: AppColors.baseRed,
      paddingTop: 4,
      fontSize: 12,
    },
  });

  const handleInputChange = (value: string) => {
    !((keyboardType === 'numeric' || keyboardType === 'number-pad') && value.length > 1 && value.startsWith('0')) ? setInputValue(value) : setInputValue(value.slice(1)) 
  }

  return (
    <View style={style}>
      <View
        style={[
          {backgroundColor: backgroundColor? backgroundColor : ''},
          styles.wrapper,
          {alignItems: icon ? 'center' : 'baseline'},
          {borderColor: getBorderColor(), flexDirection: 'row'},
        ]}>
        {icon && (
          <Icon name={icon} size={18} color={color ? color : 'white'} style={{marginRight: 10}} />
        )}
        <TextInput
          placeholderTextColor={color ? color : 'white'}
          style={[styles.textInput]}
          onChangeText={stateManagment ? handleInputChange : onChange}
          placeholder={placeHolder}
          value={stateManagment ? inputValue : value}
          keyboardType={keyboardType}
          onFocus={() => {
            setFocused(true);
          }}
          onBlur={() => {
            setFocused(false);
            if(stateManagment) onChange(inputValue);
          }}
          secureTextEntry={secure}
        />
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default Input;
