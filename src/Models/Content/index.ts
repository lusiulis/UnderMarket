import firestore from '@react-native-firebase/firestore';
import {IPaginationPayload} from '..';
import {getShopPreview} from '../Shop/shop.model';
import {
  IAddContentPayload,
  IContent,
  IContentCard,
  IGetContentsByShopPayload,
} from './Content';
import {formatContentCardDocs, formatContentDocs} from './utils';

const ContentCollection = firestore().collection('content');
const ShopCollection = firestore().collection('shop');

export const addContent = async (
  payload: IAddContentPayload,
): Promise<string> => {
  const dbResponse = await ContentCollection.add(payload);
  return dbResponse.id;
};

export const getContents = async ({
  limit,
  offset,
}: IPaginationPayload): Promise<IContentCard[]> => {
  const dbResponse = offset
    ? await ContentCollection.startAfter(offset).limit(limit).get()
    : await ContentCollection.limit(limit).get();
  const formatedContents = await Promise.all(
    formatContentCardDocs(dbResponse.docs).map(async content => {
      content.shop = await getShopPreview(content.shop.id);
      return content;
    }),
  );
  return formatedContents;
};

export const getContentsByShopId = async ({
  shopId,
  pagination,
}: IGetContentsByShopPayload): Promise<IContent[]> => {
  const dbResponse = await ContentCollection.startAfter(pagination.offset)
  .limit(pagination.limit)
    .where('shopId', '==', shopId)
    .get();
  return formatContentDocs(dbResponse.docs);
};
