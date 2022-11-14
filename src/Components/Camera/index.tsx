import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {StyleSheet, View} from 'react-native';
import GradientButton from '../Common/Button/GradientButton';
import { useRef } from 'react';

const AppCamera = () => {
  const devices = useCameraDevices('telephoto-camera');
  const cameraRef = useRef<Camera>(null)
  const device = devices.back;

  const handlePicture = async () => {
    if(cameraRef.current) {
        const photo = cameraRef.current.takePhoto({
            flash: 'on'
        })
        console.log('foto: ', photo)
    }else{
        console.log('efe')
    }
  }

  return <View style={styles.container}>
    {device && <Camera ref={cameraRef} device={device} isActive={true} style={StyleSheet.absoluteFill} photo={true}>
        
    </Camera>}
    <GradientButton onPress={handlePicture}>Asd</GradientButton>
  </View>
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 99999999
    }
})

export default AppCamera;
