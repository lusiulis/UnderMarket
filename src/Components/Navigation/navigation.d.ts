import type { NativeStackScreenProps } from '@react-navigation/stack'

type AuthStackParamList = {
    LogIn: undefined;
    SignIn: undefined;
    AppNavigation: {id?: string};
}

type AppStackParamList = {
    Home: undefined,
    Search: undefined,
    Profile: undefined,
    Notifications: undefined
    AppNavigation: {id?: string}
}

export type IAuthScreenProps = NativeStackScreenProps<AuthStackParamList>
export type IAppScreenProps = NativeStackScreenProps<AppStackParamList>