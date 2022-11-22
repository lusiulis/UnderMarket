import firestore, {
    FirebaseFirestoreTypes,
  } from '@react-native-firebase/firestore';
import { IInvitation, IProfile, IProfileLight, IWishListLight } from './profile';
import { formatProfile } from './utils';

const ProfieCollection = firestore().collection('user');
const WishListCollection = firestore().collection('wishlist');

export const getProfileInfo = async (id: string): Promise<IProfile> => {
    return formatProfile(await ProfieCollection.doc(id).get())
}

export const getProfileLight = async (id: string): Promise<IProfileLight> => {
    const dbResponse = await ProfieCollection.doc(id).get()
    return {
        id: dbResponse.id,
        profileImage: dbResponse.get('profileImage'),
        username: dbResponse.get('username')
    }
}

export const getProfileWishLists = async (userId: string): Promise<IWishListLight[]> => {
    const dbResponse = await ProfieCollection.doc(userId).get();
    const userInvitations: IInvitation[] = dbResponse.get('invitations');
    console.log('invitations: ', userInvitations)
    return await Promise.all(userInvitations.map(async (invitation): Promise<IWishListLight> => {
        const wishListResponse = await WishListCollection.doc(invitation.wishListId).get();
        console.log('responde: ',wishListResponse)
        return {
            id: wishListResponse.id,
            authorId: wishListResponse.get('authorId'),
            name: wishListResponse.get('name'),
            previewImage: wishListResponse.get('previewImage')
        }
    }))
}