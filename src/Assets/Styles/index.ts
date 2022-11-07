import { StyleSheet } from "react-native"

export const CommonSyles = StyleSheet.create({
    mainContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    },
    baseShadow: {
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 4,
    },
    transparentContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderRadius: 20,
        alignItems: 'center',
        padding: 20
    },
    mt_1 : {
        marginTop: 10
    },
    mt_2 : {
        marginTop: 20
    },
    baseText: {
        fontFamily: 'Montserrat'
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

export const AppGradientsColors = {
    active: ['#DE2B6B', '#7D24C2']
}