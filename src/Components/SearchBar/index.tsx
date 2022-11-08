import {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import { CommonSyles } from '../../Assets/Styles';
import GradientWrapper from '../Common/GradientWrapper';
import Input from '../Common/Input';

import Icon from 'react-native-vector-icons/Ionicons'

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    width: '100%',
    padding: '4%',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  widgetHeader: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: '2.5%',
    justifyContent: 'space-between',
  },
  searchContainer: {
    backgroundColor: 'white',
    borderRadius: 100,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10
  },
  categoryContainer: {
    display: 'flex',
  }
});

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchBarChange = (value: string) => {
    setSearchTerm(value)
  }
  
  const OptionsIcon = (style?: Object) => <Icon name='options-sharp' size={25} style={style} />

  const MessagesIcon = (style?: Object) => <Icon name='paper-plane' size={25} style={style} />

  return (
    <View style={styles.container}>
      <View style={styles.widgetHeader}>
        <View style={styles.searchContainer}>
          <Input style={CommonSyles} value={searchTerm} placeHolder="Buscar..." onChange={handleSearchBarChange} color='black' />
          <GradientWrapper children={OptionsIcon()} childrenTransparent={OptionsIcon({opacity: 0})} />
        </View>
        <GradientWrapper children={MessagesIcon()} childrenTransparent={MessagesIcon({opacity: 0})} />
      </View>
      <View style={styles.categoryContainer}>

      </View>
    </View>
  );
};

export default SearchBar;
