import firestore from '@react-native-firebase/firestore';
import { IAddRating } from './rating';

const ratingCollection = firestore().collection('rating');

export const getRatingByContent = async (id: string) => {
    const rating = await ratingCollection.where('contentId', '==', id).get();
    if (rating.docs.length > 0) {
        console.log('entrraaaaaaa', rating.docs.length)
        rating.docs.map(x => {
            return Number(x.get('rating'))
        })
    }
    return 1;
}

export const getRatingByContentProm = async (id: string) =>{
    let total = 1;
    const rating = await ratingCollection.where('contentId', '==', id).get();
    rating.docs.map(x=>{
        total += Number(x.get('rating')) / Number(rating.docs.length);
    })
    console.log(total)
    return total;
}

export const createRating = async (payload: IAddRating) => {
    console.log(payload)
    const rating = await ratingCollection.where('contentId', '==', payload.contentId).where('userId', '==', payload.userId).get()
    console.log(rating)
    if (rating.docs.length === 0) {
        console.log('nuevo')
        return await ratingCollection.add({ ...payload });
    } else {
        rating.docs.map(x => {
            console.log('editar')
            return ratingCollection.doc(x.id).update({ rating: payload.rating })
        })
    }
}
