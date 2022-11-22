import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {IAddFollowerPayload, IFollower} from './Followers';

const FollowersCollection = firestore().collection('follower');

const formatFollowers = (
  response: FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>,
): IFollower[] => {
  return response.docs.map(
    (doc): IFollower => ({
      shopId: doc.get('shopId'),
      userId: doc.get('userId'),
    }),
  );
};

export const getShopFollowers = async (
  shopId: string,
): Promise<IFollower[]> => {
  const dbResponse = await FollowersCollection.where(
    'shopId',
    '==',
    shopId,
  ).get();
  return formatFollowers(dbResponse);
};

export const getUserFollowing = async (
  userId: string,
): Promise<IFollower[]> => {
  const dbResponse = await FollowersCollection.where(
    'userId',
    '==',
    userId,
  ).get();
  return formatFollowers(dbResponse);
};

export const addFollow = async (
  payload: IAddFollowerPayload,
): Promise<string> => {
  const dbResponse = await FollowersCollection.add(payload);
  return dbResponse.id;
};
