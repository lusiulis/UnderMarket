import { useContext, useState } from "react"
import { View, Text, StyleSheet, Image } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import Home from "../Home"
import Search from "../Search"
import { useNavigation } from '@react-navigation/native';
import { CommonStyles } from "../../Assets/Styles"
import AppText from "../../Components/Common/Text"
import GradientButton from "../../Components/Common/Button/GradientButton"
import { AuthContext } from "../../Contexts/app.context.provider"

//const Tab = createMaterialTopTabNavigator();

const ProfileShop = () => {
  const { authState } = useContext(AuthContext);
  const navigation = useNavigation();
  const defaultImage = 'https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255710-stock-illustration-avatar-vector-male-profile-gray.jpg';

  return (
    <LinearGradient colors={['#1D5771', '#2A8187', '#46D9B5']} style={styles.container}>
      <View style={styles.form}>
        <Image
          style={styles.image}
          source={{
            uri: authState.profile?.profileImage ? authState.profile.profileImage : defaultImage,
          }}
        />
        <View style={CommonStyles.pAll}>
          <Text style={styles.text}>2</Text>
          <AppText font='bold' fontSize={14}>Seguidores</AppText>
        </View>

        <View style={CommonStyles.pAll}>
          <Text style={styles.text}>2</Text>
          <AppText font='bold' fontSize={14}>Publicaciones</AppText>
        </View>

      </View>
      <View style={[CommonStyles.pt_1, CommonStyles.pl_1]}>
        <AppText font='bolder' fontSize={18}>Boutique A&R</AppText>
        <Text style={styles.description}>Es una tienda de ropa para damas con los mejores productos</Text>
      </View>
      <View style={styles.form}>
        <GradientButton onPress={() => null} style={styles.button}>
          <AppText fontSize={16} font="bold" >
            Seguir
          </AppText>
        </GradientButton>
      </View>

      <AppText fontSize={16} font="bold" >
            la cartaaaaa de contenidoooooooos faltaaaaaaaa
          </AppText>

    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 10
  },
  text: {
    textAlign: "center",
    fontSize: 22,
    color: "white",
    fontFamily: "Montserrat-Bold"
  },
  form: {
    display: "flex",
    flexDirection: "row",
    padding: 20,
    justifyContent: 'space-between'

  },
  container: {
    flex: 1,
  },
  image: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    width: 60,
    height: 60,
    backgroundColor: "white"
  },
  description: {
    paddingTop: 10,
    fontSize: 16,
    width: "100%",
    color: "#D8D8D8"
  }
})

export default ProfileShop

