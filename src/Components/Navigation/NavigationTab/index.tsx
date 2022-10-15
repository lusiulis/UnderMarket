import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native"
import { AppColors, CommonSyles } from "../../../Assets/Styles"
import { ReactElement } from "react"

type INavigationTabProps = {
    focused: boolean
    value: "Home" | "Search" | "Notifications" | "Profile" | "Post"
}

const NavigationTab = ({focused, value}: INavigationTabProps) => {
    const styles = StyleSheet.create({
        container: {
            alignItems: "center",
            justifyContent: "center"
        },
        postContainer: {
            top: -30,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 35,
            height: 55,
            width: 55,
            backgroundColor: "white"
        },
        image: {
            width: 35,
            height: 35,
            tintColor: focused ? AppColors.baseRed : "black"
        },
        postImage: {
            width: 45,
            height: 45,
            tintColor: focused ? AppColors.baseRed : "black"
        }
    });
    const iconSource = value === "Home" ? require("../../../Assets/Icons/home.png") : value === "Search" ? require("../../../Assets/Icons/search.png") : value === "Notifications" ? require("../../../Assets/Icons/bell.png") : value === "Profile" ? require("../../../Assets/Icons/bell.png") : value === "Post" ? require("../../../Assets/Icons/add.png") : require("../../../Assets/Icons/bell.png")
    return (
        <View style={value === "Post" ? styles.postContainer : styles.container}>
            <Image 
                style= {value === "Post" ? styles.postImage : styles.image}
                source={iconSource}
            />
        </View>
    )
}

export default NavigationTab
  