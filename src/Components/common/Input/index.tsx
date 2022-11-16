import {useState} from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import {AppColors} from '../../../Assets/Styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {IconName} from '../../../Utils/common';

type IInputProps = {
  icon?: IconName;
  onChange: (v: string) => void;
  style?: Object;
  value: string;
  error?: boolean;
  placeHolder: string;
  secure?: boolean;
  color?: string;
  backgroundColor?: string;
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
}: IInputProps) => {
  const [focused, setFocused] = useState(false);

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
      paddingHorizontal: 5,
      alignItems: 'center',
    },
    textInput: {
      color: color ? color : 'white',
      fontFamily: 'Montserrat-Regular',
      width: '70%',
    },
    error: {
      color: AppColors.baseRed,
      paddingTop: 4,
      fontSize: 12,
    },
  });

  return (
    <View>
      <View
        style={[
          styles.wrapper,
          {alignItems: icon ? 'center' : 'baseline'},
          {borderColor: getBorderColor(), flexDirection: 'row'},
        ]}>
        <View>
          {icon && (
            <Icon name={icon} size={18} color={color ? color : 'white'} style={{marginRight: 10}} />
          )}
        </View>
        <TextInput
          placeholderTextColor={color ? color : 'white'}
          style={[styles.textInput, style]}
          onChangeText={onChange}
          placeholder={placeHolder}
          value={value}
          onFocus={() => {
            setFocused(true);
          }}
          onBlur={() => {
            setFocused(false);
          }}
          secureTextEntry={secure}
        />
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default Input;
