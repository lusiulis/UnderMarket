import {Camera, useCameraDevices, PhotoFile} from 'react-native-vision-camera';
import {StyleSheet, View, Modal} from 'react-native';
import {useEffect, useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import GradientButton from '../Common/Button/GradientButton';
import {launchImageLibrary} from 'react-native-image-picker';

type IAppCameraProps = {
  handleShow: (photo?: PhotoFile) => void;
}

const AppCamera = ({handleShow}: IAppCameraProps) => {
  const flashStates = ['off', 'on', 'auto']

  const devices = useCameraDevices();
  const cameraRef = useRef<Camera>(null);
  
  const [device, setDevice] = useState(devices.back)
  const [active, setActiive] = useState(true)
  const [withFlash, setWithFlash] = useState<any>(flashStates[0])

  useEffect(() => {
    setDevice(devices.back)
  }, [devices])

  const handleQuit = () => {
    setActiive(!false);
    handleShow();
  }

  const handleCameraChange = () => {
    setDevice(device === devices.back ? devices.front : devices.back)
  }

  const handleFlashChange = () => {
    const actualIndex = flashStates.indexOf(withFlash)
    if(actualIndex < flashStates.length - 1) setWithFlash(flashStates[actualIndex + 1])
    else setWithFlash(flashStates[0])
  }

  const handleGalery = async () => {
    const result = await launchImageLibrary({mediaType: 'mixed'})
    console.log(result)
  } 

  const handlePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePhoto({
        flash: withFlash
      });
      console.log('foto: ', photo);
    }
  };

  return (
    <Modal style={styles.container}>
      {device && (
        <Camera
          ref={cameraRef}
          device={device}
          isActive={active}
          style={StyleSheet.absoluteFill}
          photo={true}></Camera>
      )}
      <View style={styles.optionsContainer}>
        <Icon style={styles.option} name='close' color='white' size={20} onPress={handleQuit} />
        <Icon style={styles.option} name='flip-camera-ios' color='white' size={20} onPress={handleCameraChange} />
        <Icon style={styles.option} name={withFlash === 'on' ? 'flash-on' :  withFlash === 'off' ? 'flash-off' : 'flash-auto'} color='white' size={20} onPress={handleFlashChange} />
      </View>
      <Icon style={styles.imagesOption} name='image-search' size={20} color='white' onPress={handleGalery} />
      <GradientButton onPress={handlePicture} style={styles.capture}>
        <View style={{height: '100%', width: '100%', backgroundColor: 'white', borderRadius: 100}} />
      </GradientButton>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 99999999,
  },
  optionsContainer: {
    position: 'absolute',
    left: 20,
    top: 20
  },
  option: {
    padding: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 100,
    marginBottom: 20
  },
  imagesOption: {
    padding: 5,
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 100,
    marginTop: 50,
    left: 20,
    bottom: 20,
  },
  capture: {
    position: 'absolute',
    borderRadius: 100,
    height: 50,
    width: 50,
    bottom: 20,
    alignSelf: 'center',
    padding: 7
  }
});

export default AppCamera;
