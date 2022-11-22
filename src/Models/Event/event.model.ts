import firestore from '@react-native-firebase/firestore';
import { getShopById } from '../Shop/shop.model';
import { IAddEvent, IEvent } from './event';

const eventCollection = firestore().collection('event');
const shopColletion = firestore().collection('shop');


export const createEvent = async (payload: IAddEvent) => {
    return await eventCollection.add({ ...payload });
}

export const getAllEvents = async () => {
    const events = await eventCollection.get();
    const ev = new Array<IEvent>();
    const today = new Date();
    await Promise.all(events.docs.map(async event => {
        const shop = await shopColletion.doc(event.get('shopId')?.toString()).get();
        const dateResponse: string = event.get('dateEnd')
        const date = new Date(dateResponse);
        if (today <= date) {
            ev.push({
                id: event.id, shopId: event.get('shopId')?.toString(), title: event.get('title'), description: event.get('description'), dateEnd: event.get('dateEnd'), dateStart: event.get('dateStart'),
                profileImage: shop.get('profileImage')?.toString(), name: shop.get('name')?.toString()
            }
            )
        }
    })
    )
    return ev;
}