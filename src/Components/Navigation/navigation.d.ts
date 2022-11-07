import type { NativeStackScreenProps } from '@react-navigation/stack'

type AuthStackParamList = {
    LogIn: undefined;
    SignIn: undefined;
    AppNavigation: undefined;
}

export type IAuthScreenProps = NativeStackScreenProps<AuthStackParamList>