import { IAddShop } from './shop'
import uuid from 'react-native-uuid'
import firestore from '@react-native-firebase/firestore'

const shopColletion = firestore().collection('Users')

export const addShop = async (payload: IAddShop) => await shopColletion.add({
    id: uuid.v4(),
    ...payload
})

export const getShop = async (id: string) => {
    if(!uuid.validate(id)) return;
    return shopColletion.where().
}
