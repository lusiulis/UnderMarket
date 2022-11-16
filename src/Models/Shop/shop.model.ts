import {IAddShop, IShop, IShopLight} from './shop';
import uuid from 'react-native-uuid';
import firestore from '@react-native-firebase/firestore';

const shopColletion = firestore().collection('shop');

export const addShop = async (payload: IAddShop) =>
  await shopColletion.add({
    id: uuid.v4(),
    ...payload,
  });

export const getUserShops = async (id: string): Promise<IShopLight[]> => {
  const response = await shopColletion.where('userId', '==', id).get();
  return response.docs.map(doc => ({id: doc.id, name: doc.get('name')}));
};
