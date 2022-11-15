import {Camera, PhotoFile} from 'react-native-vision-camera';
import {View, StyleSheet, GestureResponderEvent} from 'react-native';
import AppCamera from '../../Components/Camera';
import {IAppScreenProps} from '../../Components/Navigation/navigation';
import {useEffect, useState} from 'react';
import { AppGradientsColors, CommonStyles } from '../../Assets/Styles';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppText from '../../Components/Common/Text';

const cameraPermissions = async () => {
  const cameraPermission = await Camera.getCameraPermissionStatus();
  const microphonePermission = await Camera.getMicrophonePermissionStatus();

  const newCameraPermission = await Camera.requestCameraPermission();
  const newMicrophonePermission = await Camera.requestMicrophonePermission();
};

const Post = ({navigation}: IAppScreenProps) => {
  cameraPermissions();
  const [showCamera, setShowCamera] = useState(true);

  const handleModalShowChange = (photo?: PhotoFile) => {
    setShowCamera(!showCamera);
    console.log(photo);
  };

  const handleShowCameraModal = () => {
    setShowCamera(!showCamera)
  }

  return (
    <LinearGradient colors={['#1D5771', '#2A8187', '#46D9B5']} style={[CommonStyles.mainContainer, styles.mainContainer]}>
      {showCamera ? (
        <AppCamera handleShow={handleModalShowChange} />
      ) : (
        <>
          <View style={styles.cameraWidgetContainer}>
            <LinearGradient colors={AppGradientsColors.active} style={styles.cameraWidgetBlob1} />
            <LinearGradient colors={AppGradientsColors.active} style={styles.cameraWidgetBlob2} />
            <LinearGradient colors={AppGradientsColors.active} style={styles.cameraWidgetBlob3} />
            <Icon name='camera' size={50} style={styles.camera} color='black' onPress={handleShowCameraModal} />
          </View>

          <View style={styles.formContainer}>
            <AppText></AppText>
          </View>
        </>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: '10%'
  },
  formContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.3);',
    width: '90%',
  },
  cameraWidgetContainer: {
    display: 'flex',
    width: '80%',
    height: '20%',
    backgroundColor: 'rgba(0, 0, 0, 0.3);',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: 40,
  },
  cameraWidgetBlob1: {
    height: '90%',
    width: '40%',
    borderRadius: 10,
    transform: [{ rotate: '15deg' }]
  },
  cameraWidgetBlob2: {
    height: '90%',
    width: '40%',
    borderRadius: 10,
    transform: [{ rotate: '15deg' }, { translateX: -20}]
  },
  cameraWidgetBlob3: {
    height: '90%',
    width: '40%',
    borderRadius: 10,
    transform: [{ rotate: '15deg' }, { translateX: -50}]
  },
  camera: {
    position: 'absolute',
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.3);',
    borderRadius: 100,
    left: '40%'
  }
})

export default Post;
