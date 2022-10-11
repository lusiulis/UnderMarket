import { View, Text, StyleSheet } from "react-native"
import { AppColors } from "../../Assets/Styles"

const Profile = () => {
  return (
    <View style={styles.container}>
        <Text>Profile View</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.turquoise
  }
})

export default Profile