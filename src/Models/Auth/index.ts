import { ILoginProps, ISingInProps } from "./Auth"
import firestore from '@react-native-firebase/firestore'
import { IUser } from "../User/user"

const UsersCollection = firestore().collection('user')
const ShopColletion = firestore().collection('shop')

export const login = async ({ username, password }: ILoginProps) => {
    return await UsersCollection.where('username', '==', username).where('password', '==', password).get().then((response) => {
        return {
            valid: response.docs.length === 1,
            data: response.docs[0]
        }
    })
}

export const updatePassword = async (oldPassword: string, password: string, id: string) => {
    const user = await UsersCollection.doc(id).get();
    if (user.get('password') !== oldPassword) {
        return 'La contraseña actual es incorrecta';
    } else {
        console.log('response: ', await UsersCollection.doc(id).update({ password: password }))
        return 'Contraseña actualizada con éxito';
    }
}

export const signIn = async ({ email, username, password, name }: ISingInProps) => {
    const dbResponse = await UsersCollection.add({
        email,
        username,
        password,
        name
    });
    return dbResponse.id
}