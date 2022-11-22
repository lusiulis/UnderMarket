import {IAddShop, IShop, IShopLight, IShopPreview, ISocialNetwork} from './shop';
import firestore from '@react-native-firebase/firestore';
import { getContentsByShopId } from '../Content';

const shopColletion = firestore().collection('shop');
const followerCollection = firestore().collection('follower');

const formatShopPreview = (doc: any): IShopPreview => ({
  id: doc.id,
  name: doc.get('name'),
  profileImage: doc.get('profileImage'),
});

export const getUserShops = async (id: string): Promise<IShopLight[]> => {
  const response = await shopColletion.where('userId', '==', id).get();
  return response.docs.map(doc => ({ id: doc.id, name: doc.get('name'), phoneNumber: doc.get('phoneNumber'), profileImage: doc.get('profileImage') }));
};

export const getShopById = async (id: string): Promise<IShop> => {
  const shop = await shopColletion.doc(id).get();
  const followers = await followerCollection.where('shopId', '==', id).get();
  const networks: [] = shop.get('networks')
  const net: ISocialNetwork[] = []
  const posts = await getContentsByShopId(id);
  return { networks: net ,id: shop.id, profileImage: shop.get('profileImage'),name: shop.get('name'), description: shop.get('description'), phoneNumber: shop.get('phoneNumber'), followers: followers.docs.length, posts, userId: shop.get('userId')}
}

export const createShop = async (payload: IAddShop, networks?: Array<ISocialNetwork>) => {
  return await shopColletion.add({ ...payload, networks });
}

export const getShopPreview = async (id: string): Promise<IShopPreview> => {
  const dbResponse = await shopColletion.doc(id).get();
  return formatShopPreview(dbResponse);
};
