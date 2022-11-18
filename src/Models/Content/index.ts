import firestore from '@react-native-firebase/firestore'
import { addFile } from '../File';
import { IAddContentPayload, IContent, IGetContentsPayload } from './Content'

const ContentCollection = firestore().collection('content')

export const addContent = async ({filesUrl, ...content}: IAddContentPayload): Promise<string> => {
    const dbResponse = await ContentCollection.add(content);
    filesUrl.forEach(async url => await addFile({contentId: dbResponse.id, imageUrl: url}))
    return dbResponse.id
}

export const getContents = async({}: IGetContentsPayload): Promise<IContent[]> => {
    
    return []
}