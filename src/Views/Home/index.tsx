import {View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {CommonStyles} from '../../Assets/Styles';
import SearchBar from '../../Components/SearchBar';

const Home = () => {
  return (
    <LinearGradient
      colors={['#1D5771', '#2A8187', '#46D9B5']}
      style={styles.mainContainer}>
        <SearchBar />
        
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
    ...CommonStyles.transparentContainer,
  },
  absoluteContainer: {
    justifyContent: 'center',
    width: 350,
    height: 100,
    ...CommonStyles.transparentContainer,
  },
});

export default Home;
