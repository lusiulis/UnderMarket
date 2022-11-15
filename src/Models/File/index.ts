import firestore from '@react-native-firebase/firestore'
import { IAddFile } from './File'

const FileCollection = firestore().collection('file')

export const addFile = async (file: IAddFile) => await FileCollection.add(file);