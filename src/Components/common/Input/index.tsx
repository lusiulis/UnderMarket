import {useState} from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import {AppColors} from '../../../Assets/Styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {IconName} from '../../../Utils/common';
import { KeyboardType } from 'react-native';

type IInputProps = {
  icon?: IconName;
  onChange: (v: string) => void;
  style?: Object;
  value?: any;
  error?: boolean;
  placeHolder: string;
  secure?: boolean;
  color?: string;
  backgroundColor?: string;
  keyboardType?: KeyboardType
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
          onChangeText={handleInputChange}
          placeholder={placeHolder}
          value={inputValue}
          keyboardType={keyboardType}
          onFocus={() => {
            setFocused(true);
          }}
          onBlur={() => {
            setFocused(false);
            onChange(inputValue);
          }}
          secureTextEntry={secure}
        />
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default Input;
