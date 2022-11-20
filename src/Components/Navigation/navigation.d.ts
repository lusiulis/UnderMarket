import type {NativeStackScreenProps} from '@react-navigation/stack';

type WithoutNavParamList = {
  Shop: {id: string};
}

type StackParamList = {
  LogIn: undefined;
  SignIn: undefined;
  AppNavigation: AppStackParamList;
} & WithoutNavParamList;

type AppStackParamList = {
  Home: undefined;
  Search: undefined;
  Profile: {id: string};
  Notifications: undefined;
  post: undefined;
};

export type IScreenProps = NativeStackScreenProps<StackParamList>;
export type IAppScreenProps = NativeStackScreenProps<AppStackParamList>;
