import { View, StyleSheet } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { CommonSyles } from "../../Assets/Styles"

const Home = () => {
  return (
    <LinearGradient colors={['#1D5771', '#2A8187', '#46D9B5']} style={styles.mainContainer}>
        <View style={styles.container}>
          
        </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    top: 10,
    width: 350,
    height: 100,
    ...CommonSyles.transparentContainer
  },
  absoluteContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 350,
    height: 100,
    ...CommonSyles.transparentContainer
  }
})

export default Home