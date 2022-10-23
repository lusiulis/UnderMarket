import { StyleSheet } from "react-native"

export const CommonSyles = StyleSheet.create({
    baseShadow: {
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 4,
    },
    transparentContainer: {
        borderRadius: 20,
        backgroundColor: 'rgba(18, 39, 49, 0.49)'
    },
    mt_1 : {
        marginTop: 10
    },
    mt_2 : {
        marginTop: 20
    }
})

export const AppColors = {
    turquoise: "#46D9B5",
    darkOcean: "#1D5771",
    calidPink: "#E28888",
    baseRed: "#B51F3A",
    grey: '#adb5bd',
    white: '#ffffff',
}