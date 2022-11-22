import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import {IPaginationPayload} from '..';
import {getShopPreview} from '../Shop/shop.model';
import {
  IAddContentPayload,
  IContent,
  IContentCard,
  IGetContentsByShopPayload,
  IPaginatedContentCards,
} from './Content';
import {formatContentCardDocs, formatContentDocs} from './utils';

const ContentCollection = firestore().collection('content');

export const addContent = async (
  payload: IAddContentPayload,
): Promise<string> => {
  const dbResponse = await ContentCollection.add(payload);
  return dbResponse.id;
};

export const getContents = async ({
  limit,
  offset,
}: IPaginationPayload): Promise<IPaginatedContentCards> => {
  const dbResponse = offset
    ? await ContentCollection.startAt(offset).limit(limit).get()
    : await ContentCollection.limit(limit).get();
  const formatedContents = await Promise.all(
    formatContentCardDocs(dbResponse.docs).map(async content => {
      content.shop = await getShopPreview(content.shop.id);
      return content;
    }),
  );
  return {
    contents: formatedContents,
    lastElement: dbResponse.docs[dbResponse.docs.length - 1]
  };
};

export const getContentsByShopId = async (shopId: string): Promise<IContentCard[]> => {
  const dbResponse = await ContentCollection
    .where('shopId', '==', shopId)
    .get();
  return formatContentCardDocs(dbResponse.docs);
};

export const getContentSuscription = (onComplete: (result: IContentCard[]) => void, criteria: string) => {
  ContentCollection.onSnapshot(async (data) => onComplete(await handleSuscriptionResponse(criteria,data)))
}

const handleSuscriptionResponse = async (criteria: string ,data: FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>): Promise<IContentCard[]> => {
  const formatedContents = await Promise.all(
    formatContentCardDocs(data.docs).map(async content => {
      content.shop = await getShopPreview(content.shop.id);
      return content;
    }),
  );
  if(criteria !== ''){
    return formatedContents.filter(x=> x.title.includes(criteria) || x.description.includes(criteria) || x.price.toString().includes(criteria))
  }
  return formatedContents
}
