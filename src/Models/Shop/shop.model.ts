import {IAddShop, IShop, IShopLight, ISocialNetwork} from './shop';
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
  return response.docs.map(doc => ({id: doc.id, name: doc.get('name'),description: doc.get('description'), phoneNumber: doc.get('phoneNumber')}));
};

export const createShop = async (payload: IAddShop, networks?:Array<ISocialNetwork>) =>{
  if(payload.address === ''){
    delete payload.address;
  }
  if(payload.photo === ''){
    delete payload.photo;
  }
  if(networks?.length === 0){
    delete payload.networks;
  }
  return await shopColletion.add({...payload, networks});
}