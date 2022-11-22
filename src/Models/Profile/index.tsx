import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {IContentCard} from '../Content/Content';
import {
  IAddWishListPayload,
  IInvitation,
  IProfile,
  IProfileLight,
  IWishList,
  IWishListCard,
  IWishListInvitation,
  IWishListLight,
} from './profile';
import {formatProfile} from './utils';

const ProfieCollection = firestore().collection('user');
const WishListCollection = firestore().collection('wishlist');

const defaultWishListPreviewImage =
  'https://cdn-icons-png.flaticon.com/512/4379/4379561.png';

export const getProfileInfo = async (id: string): Promise<IProfile> => {
  return formatProfile(await ProfieCollection.doc(id).get());
};

export const getProfileLight = async (id: string): Promise<IProfileLight> => {
  const dbResponse = await ProfieCollection.doc(id).get();
  return {
    id: dbResponse.id,
    profileImage: dbResponse.get('profileImage'),
    username: dbResponse.get('username'),
  };
};

export const addProfileWishList = async (payload: IAddWishListPayload) => {
  const newDoc = await WishListCollection.add({
    ...payload,
    contents: [],
    integrators: [],
    previewImage: defaultWishListPreviewImage,
  });
  const profileResponse = await ProfieCollection.doc(payload.authorId).get();
  const profileInvitations: IInvitation[] = profileResponse.get('invitations');
  profileInvitations.push({
    state: true,
    wishListId: newDoc.id,
  });
  return await ProfieCollection.doc(payload.authorId).update({
    invitations: profileInvitations,
  });
};

export const getProfileWishLists = async (
  userId: string,
): Promise<IWishListLight[]> => {
  const dbResponse = await ProfieCollection.doc(userId).get();
  const userInvitations: IInvitation[] = dbResponse.get('invitations');
  const userActiveInvitations = userInvitations.filter(
    invitation => invitation.state,
  );
  return await Promise.all(
    userActiveInvitations.map(async (invitation): Promise<IWishListLight> => {
      const wishListResponse = await WishListCollection.doc(
        invitation.wishListId,
      ).get();
      const authorId: string = wishListResponse.get('authorId');
      const authorResponse = await ProfieCollection.doc(authorId).get();
      return {
        id: wishListResponse.id,
        author: {
          id: authorResponse.id,
          username: authorResponse.get('username'),
          profileImage: authorResponse.get('profileImage'),
        },
        name: wishListResponse.get('name'),
        previewImage: wishListResponse.get('previewImage'),
      };
    }),
  );
};

export const getProfileWishListsCards = async (
  userId: string,
): Promise<IWishListCard[]> => {
  const dbResponse = await ProfieCollection.doc(userId).get();
  const userInvitations: IInvitation[] = dbResponse.get('invitations');
  const userActiveInvitations = userInvitations.filter(
    invitation => invitation.state,
  );
  return await Promise.all(
    userActiveInvitations.map(async (invitation): Promise<IWishListCard> => {
      const wishListResponse = await WishListCollection.doc(
        invitation.wishListId,
      ).get();
      return {
        id: wishListResponse.id,
        name: wishListResponse.get('name'),
        previewImage: wishListResponse.get('previewImage'),
      };
    }),
  );
};

export const getWishListDetails = async (
  wishListId: string,
): Promise<IWishList> => {
  const dbResponse = await WishListCollection.doc(wishListId).get();
  const authorId: string = dbResponse.get('authorId');
  const authorResponse = await ProfieCollection.doc(authorId).get();
  return {
    id: dbResponse.id,
    author: {
      id: authorResponse.id,
      username: authorResponse.get('username'),
      profileImage: authorResponse.get('profileImage'),
    },
    name: dbResponse.get('name'),
    previewImage: dbResponse.get('previewImage'),
    description: dbResponse.get('description'),
    contents: dbResponse.get('contents'),
  };
};

export const addToWishList = async (
  id: string,
  content: IContentCard,
): Promise<boolean> => {
  const dbResponse = await WishListCollection.doc(id).get();
  const wishListsContents: IContentCard[] = dbResponse.get('contents');
  const filter = wishListsContents.filter((wishContent) => content.id === wishContent.id)
  if (filter.length > 0) return false;
  wishListsContents.push(content);
  await WishListCollection.doc(id).update(
    wishListsContents && wishListsContents.length === 1 && content.files[0]
      ? {contents: wishListsContents, previewImage: content.files[0]}
      : {contents: wishListsContents},
  );
  return true;
};

export const getProfileWishListsInvitations = async (
  userId: string,
): Promise<IWishListInvitation[]> => {
  const dbResponse = await ProfieCollection.doc(userId).get();
  const userInvitations: IInvitation[] = dbResponse.get('invitations');
  const userInactiveInvitations = userInvitations.filter(
    invitation => !invitation.state,
  );
  return Promise.all(
    userInactiveInvitations.map(
      async (invitaiton): Promise<IWishListInvitation> => {
        const wishListResponse = await WishListCollection.doc(
          invitaiton.wishListId,
        ).get();
        const authorId: string = wishListResponse.get('authorId');
        const authorResponse = await ProfieCollection.doc(authorId).get();
        return {
          id: wishListResponse.id,
          author: {
            id: authorResponse.id,
            username: authorResponse.get('username'),
            profileImage: authorResponse.get('profileImage'),
          },
          name: wishListResponse.get('name'),
          description: wishListResponse.get('description'),
        };
      },
    ),
  );
};

export const acceptWishListInvitation = async (
  userId: string,
  wishListId: string,
) => {
  const dbResponse = await ProfieCollection.doc(userId).get();
  const userInvitations: IInvitation[] = dbResponse.get('invitations');
  const newUserInvitations = userInvitations.map(
    (invitation): IInvitation =>
      invitation.wishListId === wishListId
        ? {...invitation, state: true}
        : invitation,
  );
  const wishListResponse = await WishListCollection.doc(wishListId).get();
  const integrators: string[] = wishListResponse.get('integrators');
  await WishListCollection.doc(wishListId).update({integrators});
  return await ProfieCollection.doc(userId).update({
    invitations: newUserInvitations,
  });
};

export const dennyWishListInvitation = async (
  userId: string,
  wishListId: string,
) => {
  const dbResponse = await ProfieCollection.doc(userId).get();
  const userInvitations: IInvitation[] = dbResponse.get('invitations');
  const newUserInvitations = userInvitations.filter(
    invitation => invitation.wishListId !== wishListId,
  );
  return await ProfieCollection.doc(userId).update({
    invitations: newUserInvitations,
  });
};

export const getWishListIntegrators = async (
  wishListId: string,
): Promise<IProfileLight[]> => {
  const dbResponse = await WishListCollection.doc(wishListId).get();
  const integratorsIds: string[] = dbResponse.get('integrators');
  return Promise.all(
    integratorsIds.map(
      async (integratorId): Promise<IProfileLight> =>
        await getProfileLight(integratorId),
    ),
  );
};

export const searchProfileLight = async (
  wishListId: string,
): Promise<IProfileLight[]> => {
  const dbResponse = await ProfieCollection.get();
  const data: IProfileLight[] = [];
  dbResponse.docs.forEach(doc => {
    const invitations: IInvitation[] = doc.get('invitations');
    if (invitations) {
      const wishListInvitations = invitations.filter(
        invitation => invitation.wishListId === wishListId,
      );
      if (wishListInvitations.length !== 0) return;
    }
    data.push({
      id: doc.id,
      profileImage: doc.get('profileImage'),
      username: doc.get('username'),
    });
  });
  return data;
};

export const inviteUser = async (userId: string, wishListId: string) => {
  const dbResponse = await ProfieCollection.doc(userId).get();
  let userInvitations: IInvitation[] = dbResponse.get('invitations');
  if(userInvitations) {
    userInvitations.push({
      state: false,
      wishListId: wishListId,
    });
  } else {
    userInvitations = [{state: false, wishListId: wishListId}]
  }
  
  return await ProfieCollection.doc(userId).update({
    invitations: userInvitations,
  });
};
