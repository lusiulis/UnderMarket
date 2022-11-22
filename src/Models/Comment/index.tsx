import firestore, {
    FirebaseFirestoreTypes,
  } from '@react-native-firebase/firestore';
import { getProfileLight } from '../Profile';
import { IAddCommentPayload, IComment } from './Comment';

const CommentCollection = firestore().collection('comment');

const formatContents = (docs: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>[]): IComment[] => {
    return docs.map((doc): IComment => {
        const date: FirebaseFirestoreTypes.Timestamp = doc.get('timestamp')
        return {
        id: doc.id,
        contentId: doc.get('contentId'),
        description: doc.get('description'),
        timestamp: date.toDate(),
        from: {
            id: doc.get('fromId'),
            profileImage: '',
            username: '' 
        }
    }
    })
}

export const getContentComments = async (contentId: string): Promise<IComment[]> => {
    const dbResponse = await CommentCollection.where('contentId', '==', contentId).orderBy('timestamp', 'desc').get()
    return await Promise.all(formatContents(dbResponse.docs).map(async (comment) => {
        comment.from = await getProfileLight(comment.from.id);
        return comment
    }))
}

export const addComment = async (payload: IAddCommentPayload): Promise<IComment> => {
    const dbResponse = await CommentCollection.add(payload);
    const response = await CommentCollection.doc(dbResponse.id).get()
    const date: FirebaseFirestoreTypes.Timestamp =response.get('timestamp')
    return {
        id: response.id,
        contentId: response.get('contentId'),
        description: response.get('description'),
        timestamp: date.toDate(),
        from: await getProfileLight(response.get('fromId'))
    }
}