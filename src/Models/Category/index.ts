import firestore from '@react-native-firebase/firestore'
import { ICategory, IDivition } from './Category';

const CategoryCollection = firestore().collection('category')
const DivitionCollection = firestore().collection('divition')

export const getAllDivitions = async (): Promise<IDivition[]> => {
    const response = await DivitionCollection.get();
    return response.docs.map((item) => ({id: item.id, name: item.get('name')}))
}

export const getCategoryByDivitionId = async (divtion: string): Promise<ICategory[]> => {
    const response = await CategoryCollection.where('divitionId', '==', divtion).get();
    return response.docs.map((item) => ({id: item.id, name: item.get('name'), divitionId: item.get('divitionId')}))
}