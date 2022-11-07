import type { NativeStackScreenProps } from '@react-navigation/stack'

type AuthStackParamList = {
    LogIn: undefined;
    SignIn: undefined;
    AppNavigation: {id: string};
}

export type IAuthScreenProps = NativeStackScreenProps<AuthStackParamList>