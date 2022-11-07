import { ILoginProps, ISingInProps } from "./Auth"
import firestore from '@react-native-firebase/firestore'

const UsersCollection = firestore().collection('user')
const ShopColletion = firestore().collection('shop')

export const login = async ({username, password}: ILoginProps) => {
    return UsersCollection.where('username', '==', username).where('password', '==', password).count().get()
}

export const signIn = async ({email, username, password, phoneNumber}: ISingInProps) => {
    const shopResponse = phoneNumber ? await ShopColletion.add({phoneNumber}) : false;
    return !shopResponse ? await UsersCollection.add({
        email,
        username,
        password,
    }) : await UsersCollection.add({
        email,
        username,
        password,
        shopId: shopResponse.id
    })
}