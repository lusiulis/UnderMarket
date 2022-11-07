import { useState } from "react";
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { AppColors } from "../../../Assets/Styles";
import Icon from "react-native-vector-icons/MaterialIcons";
import { IconName } from "../../../Utils/common"

type IInputProps = {
    icon: IconName;
    onChange: (v: string) => void;
    style?: Object;
    value: string;
    error?: boolean;
    placeHolder?: string;
    secure?: boolean;
}

const Input = ({icon, onChange, style, value, error, placeHolder, secure}: IInputProps) => {
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

    return (
      <View style={styles.inputContainer}>
        <View
          style={[
            styles.wrapper,
            { alignItems: icon ? 'center' : 'baseline' },
            { borderColor: getBorderColor(), flexDirection: 'row' },
          ]}>
          <View>
            {icon && <Icon name={icon} size={18} color='white' /> }
          </View>
          <TextInput
            placeholderTextColor='white'
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
    )
}

const styles = StyleSheet.create({
    wrapper: {
        borderRadius: 10,
        paddingHorizontal: 5,
        backgroundColor: 'rgba(33, 31, 31, 0.7)',
        alignItems: "center"
    },
    inputContainer: {
        paddingVertical: 12,
    },
    textInput: {
        color: 'white',
        fontFamily: 'Montserrat-Bold',
        width: '85%',
        marginLeft: '5%'
    },
    error: {
        color: AppColors.baseRed,
        paddingTop: 4,
        fontSize: 12,
    },

});

export default Input