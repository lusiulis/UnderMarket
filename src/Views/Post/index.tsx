import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {View, StyleSheet} from 'react-native';
import AppCamera from '../../Components/Camera';

const cameraPermissions = async () => {
  const cameraPermission = await Camera.getCameraPermissionStatus();
  const microphonePermission = await Camera.getMicrophonePermissionStatus();

  const newCameraPermission = await Camera.requestCameraPermission();
  const newMicrophonePermission = await Camera.requestMicrophonePermission();
}

const Post = () => {
  cameraPermissions()

  
  return <AppCamera />
      
  
};

export default Post;
