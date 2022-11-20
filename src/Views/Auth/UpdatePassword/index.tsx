import { StyleSheet, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { AppGradientsColors } from "../../../Assets/Styles";
import GradientButton from "../../../Components/Common/Button/GradientButton";
import Input from '../../../Components/Common/Input';
import AppText from "../../../Components/Common/Text";
import Icons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { updatePassword } from "../../../Models/Auth";
import { AuthContext } from "../../../Contexts/appContentProvider";
import { IShopLight } from "../../../Models/Shop/shop";
import AppModal from "../../../Components/Common/AppModal";

type IModal = {
    shop?: IShopLight;
    hide: () => void;
    show: boolean;
  };

const UpdatePassword = ({show, hide}: IModal) => {
    const [form, setForm] = useState({ password: '', confirmPassword: '', oldPassword: '' })
    const navigation = useNavigation();
    const { authState, logOut } = useContext(AuthContext);

    const handleInputChange = (value: string, input: string) => {
        if (input === 'oldPassword') setForm({ ...form, oldPassword: value });
        else if (input === 'confirmPassword') setForm({ ...form, confirmPassword: value });
        else if (input === 'password') setForm({ ...form, password: value });
    };

    const savePassword = async () => {
        if (form.confirmPassword !== form.password) {
            console.log('Las contraseña no coinciden')
        } else {
            const resp = await updatePassword(form.oldPassword, form.password, String(authState.profile?.id));
            console.log(resp)
        }
    };

    return (
        <AppModal show={show}>
        <LinearGradient colors={AppGradientsColors.active} style={styles.container}>
            <Icons
                name="arrow-back-ios"
                size={25}
                color="white"
                style={styles.goBack}
                onPress={hide}
            />
            <AppText font='bold' style={styles.text} fontSize={24}>
                Cambiar Contraseña
            </AppText>
            <View style={styles.shadowContainer}>
                <Input
                    secure
                    icon="lock"
                    backgroundColor={'#FFFFFF1F'}
                    value={form.oldPassword}
                    placeHolder="Contraseña Actual"
                    onChange={value => handleInputChange(value, 'oldPassword')}
                />
                <Input
                    secure
                    icon="lock"
                    backgroundColor={'#FFFFFF1F'}
                    value={form.password}
                    placeHolder="Nueva Contraseña"
                    onChange={value => handleInputChange(value, 'password')}
                />
                <Input
                    secure
                    icon="lock"
                    value={form.confirmPassword}
                    backgroundColor={'#FFFFFF1F'}
                    placeHolder="Confirmar Contraseña"
                    onChange={value => handleInputChange(value, 'confirmPassword')}
                />

            </View>
            <View style={styles.row}>
                <GradientButton
                    colors={AppGradientsColors.cancel}
                    onPress={hide}
                    style={styles.button}>
                    <AppText font='bold' style={{ textAlign: 'center' }} fontSize={20}>Cancelar</AppText>
                </GradientButton>
                <GradientButton
                    colors={AppGradientsColors.base}
                    onPress={savePassword}
                    style={styles.button}>
                    <AppText font='bold' style={{ textAlign: 'center' }} fontSize={20}>Guardar</AppText>
                </GradientButton>
            </View>
        </LinearGradient>
        </AppModal>
    )
}

const styles = StyleSheet.create({
    row: {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'space-around'
    },
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    shadowContainer: {
        marginTop: 10,
        height: '50%',
        width: '80%',
        padding: '10%',
        justifyContent: 'space-around',
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderRadius: 20
    },
    button: {
        padding: 10,
        borderRadius: 10,
        marginRight: 15
    },
    goBack: {
        position: 'absolute',
        top: '4%',
        left: 20
    },
    text: {
        textAlign: 'center'
    }
});

export default UpdatePassword;