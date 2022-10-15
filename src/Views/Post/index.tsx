import { View, Text, StyleSheet } from "react-native"
import { AppColors } from "../../Assets/Styles"

const Post = () => {
  return (
    <View style={styles.mainContainer}>
        <Text>Post View aaa</Text>
        <View style={styles.container}>
          
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.turquoise
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "white",
    width: 350,
    height: 100,
    borderRadius: 10,
  },
  absoluteContainer: {
    
  }
})

export default Post