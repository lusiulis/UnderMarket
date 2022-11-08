import {View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {CommonSyles} from '../../Assets/Styles';
import SearchBar from '../../Components/SearchBar';
import { PowerOff } from '../../Components/SearchBar/test';

const Home = () => {
  return (
    <LinearGradient
      colors={['#1D5771', '#2A8187', '#46D9B5']}
      style={styles.mainContainer}>
        <SearchBar />
        <View style={{height: '30%', width: '30%', backgroundColor: 'black'}}>
          <PowerOff />
        </View>
      </LinearGradient>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
  },
  container: {
    justifyContent: 'center',
    top: 10,
    width: 350,
    height: 100,
    ...CommonSyles.transparentContainer,
  },
  absoluteContainer: {
    justifyContent: 'center',
    width: 350,
    height: 100,
    ...CommonSyles.transparentContainer,
  },
});

export default Home;
