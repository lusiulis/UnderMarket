import firestore from '@react-native-firebase/firestore'

const usersCollections = firestore().collection('Users')

export const addUser = async () => {
    usersCollections.add({
        name: 'test',
        age: 43
    })
}
