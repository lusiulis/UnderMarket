import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppColors } from '../../../Assets/Styles';




const Button = ({ ...props }) => {

    const { loading, disabled, secondary, primary, title, danger, onPress, style } = props;

    const getBgColor = () => {
        if (disabled) {
            return AppColors.grey;
        }
        if (primary) {
            return AppColors.darkOcean;
        }
        if (danger) {
            return AppColors.baseRed;
        }

        if (secondary) {
            return AppColors.turquoise;
        }
    };
    return (
        <TouchableOpacity
            disabled={disabled}
            onPress={onPress}
            style={[styles.wrapper, { backgroundColor: getBgColor() }, style]}>
            <View style={[styles.loaderSection]}>
                {loading && (
                    <ActivityIndicator
                        color={primary ? AppColors.turquoise : AppColors.darkOcean}
                    />
                )}
                <Text
                    style={{
                        color: disabled ? 'black' : AppColors.white,
                        paddingLeft: loading ? 5 : 0,
                    }}>
                    {title}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        height: 42,
        paddingHorizontal: 5,
        marginVertical: 5,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },

    loaderSection: {
        flexDirection: 'row',
    },

});

export default Button;