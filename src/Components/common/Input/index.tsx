import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { StyleSheet } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import { AppColors } from '../../../Assets/Styles';

const Input = ({
    ...props

}) => {
    const { onChangeText, icon, style,
        value, label, error, placeholder } = props;
    const [focused, setFocused] = React.useState(false);


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
            {label && <Text>{label}</Text>}

            <View
                style={[
                    styles.wrapper,
                    { alignItems: icon ? 'center' : 'baseline' },
                    { borderColor: getBorderColor(), flexDirection: 'row' },
                ]}>
                <View>
                    {icon && <Icon  name={icon} size={30} /> }
                </View>

                <TextInput
                    style={[styles.textInput, style]}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    value={value}
                    onFocus={() => {
                        setFocused(true);
                    }}
                    onBlur={() => {
                        setFocused(false);
                    }}
                    {...props}
                />
            </View>

            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        height: 42,
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 5,
        marginTop: 5,
    },

    inputContainer: {
        paddingVertical: 12,
    },

    textInput: {
        width: '85%',
    },

    error: {
        color: AppColors.baseRed,
        paddingTop: 4,
        fontSize: 12,
    },

});


export default Input;
