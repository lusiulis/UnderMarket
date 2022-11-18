import storage from '@react-native-firebase/storage'
import { ICameraFile } from '../Components/Camera/Camera';

export const UploadImage = async ({filename, uri}: ICameraFile): Promise<string> => {
    const imageRef = storage().ref('UnderMarket/'.concat(filename));
    await imageRef.putFile(uri);
    return await imageRef.getDownloadURL();
}