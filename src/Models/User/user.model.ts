import firestore from '@react-native-firebase/firestore'

const ShopColletion = firestore().collection('shop')
const UserCollection = firestore().collection('user')

export const getUserShops = async (id: string) => {
    
}
