import {View, Text, StyleSheet, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import GradientText from '../../Components/common/GradientText';

const LogIn = () => {
  return (
    <LinearGradient
      colors={['#1D5771', '#2A8187', '#46D9B5']}
      style={styles.mainContainer}>
      <View style={styles.formContainer}>
        <GradientText
          colors={['#8754AF', '#90362A']}
          label="Under Market"
          style={styles.appTitle}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    display: 'flex',
    alignItems: 'center',
    height: '70%',
    width: '70%',
    backgroundColor: 'rgba(18, 39, 49, 0.6);',
    borderRadius: 30,
    paddingTop: 30,
  },
  appTitle: {
    fontSize: 30,
  },
});

export default LogIn;
