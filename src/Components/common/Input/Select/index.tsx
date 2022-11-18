import {useState} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AppModal from '../../AppModal';
import AppText from '../../Text';

type IAppSelectProps = {
  items: any[];
  title: string;
  onChange: (key: string) => void;
  style?: ViewStyle;
  selectedIndex?: number;
  labelProperty?: string;
};

const AppSelect = ({
  items,
  onChange,
  style,
  selectedIndex,
  title,
  labelProperty,
}: IAppSelectProps) => {
  const [selectedItem, setSelectedItem] = useState(items[0]);
  const [showItems, setShowItems] = useState(false);

  const handleShowItems = () => {
    setShowItems(!showItems);
  };

  const handleItemPress = (item: any, index: number) => {
    setSelectedItem(item);
    onChange(String(items.indexOf(item)));
  };

  return (
    <View style={[styles.selectContainer, style]}>
      <TouchableOpacity
        onPress={() => console.log('works')}>
        <AppText>
          {selectedItem[labelProperty ? labelProperty : 'name']}
        </AppText>
      </TouchableOpacity>
      {showItems && (
        <AppModal style={styles.background}>
          <View style={styles.selectForm}>
            <AppText color="black" font='bold' fontSize={10}>{title}</AppText>
            <View style={styles.itemsContainer}>
              {items.map((item, index) => (
                <TouchableOpacity
                  onPress={() => handleItemPress(item, index)}
                  key={index}
                  style={styles.item}>
                  <AppText fontSize={10} font="bold" color="black">
                    {item[labelProperty ? labelProperty : 'name']}
                  </AppText>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </AppModal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  selectContainer: {
    padding: 10,
    backgroundColor: 'rgba( 0, 0 , 0, .4)',
    borderRadius: 20
  },
  itemsContainer: {
  },
  item: {},
  background: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectForm: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 0,
    width: '100%'
  }
});

export default AppSelect;
