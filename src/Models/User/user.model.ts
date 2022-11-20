import firestore from '@react-native-firebase/firestore'

const ShopColletion = firestore().collection('shop')
const UserCollection = firestore().collection('user')

export const getUserShops = async (id: string) => {
}
  

export const updateProfileImageUser = async (id:string, file: string) =>{
    await UserCollection.doc(id).update({profileImage: file});
}
