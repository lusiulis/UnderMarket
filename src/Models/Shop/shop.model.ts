import {IAddShop, IShop, IShopLight, IShopPreview} from './shop';
import uuid from 'react-native-uuid';
import firestore from '@react-native-firebase/firestore';

const shopColletion = firestore().collection('shop');

const formatShopPreview = (doc: any): IShopPreview => ({
  id: doc.id,
  name: doc.get('name'),
  profileImage: doc.get('profileImage'),
});

export const addShop = async (payload: IAddShop) =>
  await shopColletion.add({
    id: uuid.v4(),
    ...payload,
  });

export const getUserShops = async (id: string): Promise<IShopLight[]> => {
  const response = await shopColletion.where('userId', '==', id).get();
  return response.docs.map(doc => ({id: doc.id, name: doc.get('name')}));
};

export const getShopPreview = async (id: string): Promise<IShopPreview> => {
  const dbResponse = await shopColletion.doc(id).get();
  return formatShopPreview(dbResponse);
};
