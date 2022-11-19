import {IAddShop, IShop, IShopLight, IShopPreview, ISocialNetwork} from './shop';
import uuid from 'react-native-uuid';
import firestore from '@react-native-firebase/firestore';
import { IContent } from '../Content/Content';

const shopColletion = firestore().collection('shop');
const followerCollection = firestore().collection('follower');
const postCollection = firestore().collection('content');

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
  return response.docs.map(doc => ({ id: doc.id, name: doc.get('name'), description: doc.get('description'), phoneNumber: doc.get('phoneNumber') }));
};

export const getShopByUser = async (id: string): Promise<IShopLight> => {
  const shop = await shopColletion.doc(id).get();

  const followers = await followerCollection.where('shopId', '==', id).get();
  const posts = await postCollection.where('shopId', '==', id).get();
  const net:Array<ISocialNetwork> = shop.get('networks');

  return (({ networks: net ,id: shop.id, photo: shop.get('photo')?.toString() ,name: shop.get('name'), description: shop.get('description'), phoneNumber: shop.get('phoneNumber'), followers: followers.docs.length, posts: [] }))
}

export const createShop = async (payload: IAddShop, networks?: Array<ISocialNetwork>) => {
  if (payload.address === '') {
    delete payload.address;
  }
  if (payload.photo === '') {
    delete payload.photo;
  }
  if (networks?.length === 0) {
    delete payload.networks;
  }
  return await shopColletion.add({ ...payload, networks });
}

export const getShopPreview = async (id: string): Promise<IShopPreview> => {
  const dbResponse = await shopColletion.doc(id).get();
  return formatShopPreview(dbResponse);
};
