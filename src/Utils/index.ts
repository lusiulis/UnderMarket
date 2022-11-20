import storage from '@react-native-firebase/storage'
import { ICameraFile } from '../Components/Camera/Camera';
import { IShop } from '../Models/Shop/shop';

export const UploadImage = async ({filename, uri}: ICameraFile): Promise<string> => {
    const imageRef = storage().ref('UnderMarket/'.concat(filename));
    await imageRef.putFile(uri);
    return await imageRef.getDownloadURL();
}

export const Initializer = {
    IShop: (): IShop => ({
        description: '',
        followers: 0,
        id: '',
        name: '',
        networks: [],
        phoneNumber: '',
        posts: [],
        profileImage: '',
        userId: ''
    })
}