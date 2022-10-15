import { View, Text, StyleSheet } from "react-native"
import { AppColors } from "../../Assets/Styles"

const Notifications = () => {
  return (
    <View style={styles.container}>
        <Text>Notifications View</Text>
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

export default Notifications