import { View, Text, StyleSheet } from "react-native"
import { AppColors } from "../../Assets/Styles"

const Search = () => {
  return (
    <View style={styles.container}>
        <Text>Search View</Text>
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

export default Search