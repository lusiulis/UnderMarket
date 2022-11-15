import type {NativeStackScreenProps} from '@react-navigation/stack';

type StackParamList = {
  LogIn: undefined;
  SignIn: undefined;
  AppNavigation: AppStackParamList;
};

type AppStackParamList = {
  Home: undefined;
  Search: undefined;
  Profile: undefined;
  Notifications: undefined;
  Login: undefined;
};

export type IScreenProps = NativeStackScreenProps<StackParamList>;
export type IAppScreenProps = NativeStackScreenProps<AppStackParamList>;
