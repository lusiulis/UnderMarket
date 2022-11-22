import {IContent, IContentCard} from './Content';

export const formatContentCardDocs = (contentDocs: any[]): IContentCard[] => contentDocs.map((doc) => ({
    id: doc.id,
    categorys: doc.get('categorys'),
    contentType: doc.get('contentType'),
    description: doc.get('description'),
    title: doc.get('title'),
    files: doc.get('files'),
    price: doc.get('price'),
    shop: {
        id: doc.get('shopId'),
        profileImage: '',
        name: ''
    },
}))