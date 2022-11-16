import {IAddUser} from './user';
import uuid from 'react-native-uuid'
import firestore from '@react-native-firebase/firestore'


const validateFields = () => {};
const UsersCollection = firestore().collection('user')

export const validateUsername = (username: string) => {};

export const addUser = async (payload: IAddUser) => {};

export const getUserById = async (id: string) => {
    return await UsersCollection.doc(id).get().then(x=>{
        return x.data()
    })

}
