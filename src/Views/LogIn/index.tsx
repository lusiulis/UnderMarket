import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native"
import LinearGradient from "react-native-linear-gradient";
import { AppColors, CommonSyles } from "../../Assets/Styles"
import Button from "../../Components/common/Button";
import Input from "../../Components/common/Input";
const LogIn = () => {
    const { navigate } = useNavigation();
    const [form, setForm] = useState({userName: null, password: null});

    const onSubmit = () => {
        if (form.userName && form.password) {
        }
      };
    
      const onChange = (name:any, value:any) => {
        setForm({...form, [name]: value});
      };

    return (
        <LinearGradient colors={['#1D5771', '#2A8187', '#46D9B5']} style={styles.mainContainer}>
            <ScrollView>
                <View style={styles.wrapper}>
                    <Text style={styles.title}>Bienvenido a UNDERMARKET</Text>
                    <Image
                        source={require('../../Assets/Icons/logo.png')}
                        style={styles.logoImage}
                    />
                    <View style={styles.form}>
                        <Input
                            placeholder="Usuario"
                            icon="person"
                            onChangeText={(value:any) => {
                                onChange('userName', value);
                              }}
                        />
                        <Input
                            placeholder="Contraseña"
                            icon="lock"
                            onChangeText={(value:any) => {
                                onChange('password', value);
                              }}
                        />

                        <Button style={CommonSyles.mt_2}
                            primary
                            title="Iniciar Sesión"
                            onPress={() =>onSubmit()}
                        />
                        <View style={[styles.createSection, CommonSyles.mt_1]}>
                            <Text style={styles.infoText}>No tienes una cuenta?</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    console.log('registroooo')
                                }}>
                                <Text style={styles.linkBtn}>Registrar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 20,
    },
    mainContainer: {
        flex: 1,
        alignItems: 'center',
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        top: 40,
        width: '90%',

    },
    logoImage: {
        height: 150,
        width: 150,
        alignSelf: 'center',
        marginTop: 50,
    },
    form: {
        marginTop: 40,
        width: '100%',
        textAlign: 'center',
    },
    title: {
        fontSize: 21,
        textAlign: 'center',
        paddingTop: 20,
        fontWeight: '500',
    },
    subTitle: {
        fontSize: 17,
        textAlign: 'center',
        paddingVertical: 20,
        fontWeight: '500',
    },
    createSection: {
        flexDirection: 'row',
    },
    linkBtn: {
        paddingLeft: 17,
        color: AppColors.darkOcean,
        fontSize: 16,
    },

    infoText: {
        fontSize: 17,
    },
})

export default LogIn;