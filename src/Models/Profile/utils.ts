import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { IProfile } from "./profile";

export const formatProfile = (
  response: FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData>,
): IProfile => {
  return {
    id: response.id,
    following: [],
    username: response.get('username'),
    profileImage: response.get('profileImage'),
    email: response.get('email'),
    description: response.get('description'),
    name: response.get('name'),
    invitations: response.get('invitations')
  };
};
