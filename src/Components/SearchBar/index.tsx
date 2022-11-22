import {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {CommonStyles} from '../../Assets/Styles';
import GradientWrapper from '../Common/GradientWrapper';
import Input from '../Common/Input';

import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
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
    paddingHorizontal: 10,
    width: '85%'
  },
  categoryContainer: {
    display: 'flex',
  },
});

type IModal = {
  search: (value:string) => void;
};
0
const SearchBar = ({search}: IModal) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchBarChange = (value: string) => {
    setSearchTerm(value);
  };
  const searchContent = () =>{
    console.log(searchTerm)
    search(searchTerm)
  }

  return (
    <View style={styles.container}>
      <View style={styles.widgetHeader}>
        <View style={styles.searchContainer}>
          <Input
            value={searchTerm}
            placeHolder="Buscar..."
            onChange={handleSearchBarChange}
            color="black"
          />
          <View style={{display: 'flex', flex: .2}}>
            <GradientWrapper>
              <Icon name="options-sharp" size={25} color="white" />
            </GradientWrapper>
          </View>
        </View>
          <Icon name="paper-plane" size={25} color="white" onPress={searchContent}/>
      </View>
      <View style={styles.categoryContainer}></View>
    </View>
  );
};

export default SearchBar;
