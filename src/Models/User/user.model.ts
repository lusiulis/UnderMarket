import firestore from '@react-native-firebase/firestore'
import { IUser } from './user'

const ShopColletion = firestore().collection('shop')
const UserCollection = firestore().collection('user')

export const getUserShops = async (id: string) => {
}


export const updateProfileImageUser = async (id: string, file: string) => {
    await UserCollection.doc(id).update({ profileImage: file });
}

export const updateUser = async (id: string, username: string, email: string) => {
    await UserCollection.doc(id).update({ username, email });
    
}