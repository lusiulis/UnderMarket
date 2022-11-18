import {Camera, useCameraDevices, PhotoFile} from 'react-native-vision-camera';
import {StyleSheet, View, Modal} from 'react-native';
import {useEffect, useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import GradientButton from '../Common/Button/GradientButton';
import {launchImageLibrary} from 'react-native-image-picker';
import {IAppCameraProps, ICameraFile} from './Camera';

type IFlashState = 'off' | 'on' | 'auto';

const AppCamera = ({handleShow}: IAppCameraProps) => {
  const flashStates: IFlashState[] = ['off', 'on', 'auto'];

  const devices = useCameraDevices();
  const cameraRefa = useRef<Camera>(null);

  const [device, setDevice] = useState(devices.back);
  const [active, setActiive] = useState(true);
  const [withFlash, setWithFlash] = useState<IFlashState>(flashStates[0]);

  useEffect(() => {
    setDevice(devices.back);
  }, [devices]);

  const handleQuit = () => {
    setActiive(!false);
    handleShow();
  };

  const handleCameraChange = () => {
    setDevice(device === devices.back ? devices.front : devices.back);
  };

  const handleFlashChange = () => {
    const actualIndex = flashStates.indexOf(withFlash);
    if (actualIndex < flashStates.length - 1)
      setWithFlash(flashStates[actualIndex + 1]);
    else setWithFlash(flashStates[0]);
  };

  const handleGalery = async () => {
    const action = await launchImageLibrary({mediaType: 'mixed'});
    if (action.errorMessage) return;
    if (action.didCancel) return;
    const result = action.assets;
    let selectedImagesURIs: ICameraFile[] = [];
    if (result) {
      result.forEach(file => {
        if (file.uri && file.fileName) selectedImagesURIs.push({uri: file.uri, filename: file.fileName});
      });
      handleShow(selectedImagesURIs);
    }
  };

  const handlePicture = () => {
    //TODO NOT WORKING
    cameraRefa.current?.takePhoto({
      flash: 'off',
    }).then((data) => {
      console.log('foto: ', data);
    }).catch(e => console.log('error: ', e));
    
  };

  return (
    <Modal style={styles.container}>
      {device && (
        <Camera
          ref={cameraRefa}
          device={device}
          isActive={active}
          style={StyleSheet.absoluteFill}
          photo={true}
          video={true}></Camera>
      )}
      <View style={styles.optionsContainer}>
        <Icon
          style={styles.option}
          name="close"
          color="white"
          size={20}
          onPress={handleQuit}
        />
        <Icon
          style={styles.option}
          name="flip-camera-ios"
          color="white"
          size={20}
          onPress={handleCameraChange}
        />
        <Icon
          style={styles.option}
          name={
            withFlash === 'on'
              ? 'flash-on'
              : withFlash === 'off'
              ? 'flash-off'
              : 'flash-auto'
          }
          color="white"
          size={20}
          onPress={handleFlashChange}
        />
      </View>
      <Icon
        style={styles.imagesOption}
        name="image-search"
        size={20}
        color="white"
        onPress={handleGalery}
      />
      <GradientButton onPress={handlePicture} style={styles.capture}>
        <View
          style={{
            height: '100%',
            width: '100%',
            backgroundColor: 'white',
            borderRadius: 100,
          }}
        />
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
    top: 20,
  },
  option: {
    padding: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 100,
    marginBottom: 20,
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
    padding: 7,
  },
});

export default AppCamera;
