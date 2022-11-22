import firestore from '@react-native-firebase/firestore'
import { IUpdateUser, IUser } from './user'

const UserCollection = firestore().collection('user')

export const updateUser = async (payload: IUpdateUser) => {
    const {id, ...data} = payload;
    return await UserCollection.doc(id).update(data);
}