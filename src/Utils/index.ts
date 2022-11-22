import storage from '@react-native-firebase/storage'
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { ICameraFile } from '../Components/Camera/Camera';
import { IProfile } from '../Models/Profile/profile';
import { IShop } from '../Models/Shop/shop';

export const UploadImage = async ({filename, uri}: ICameraFile): Promise<string> => {
    const imageRef = storage().ref('UnderMarket/'.concat(filename));
    await imageRef.putFile(uri);
    return await imageRef.getDownloadURL();
}


const isCloseToBottom = ({
    nativeEvent,
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const {layoutMeasurement, contentOffset, contentSize} = nativeEvent;
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

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
    }),
    IProfile: (): IProfile => ({
        following: [],
        wishLists: [],
        password: '',
        username: '',
        id: '',
        profileImage: ''
    })
}