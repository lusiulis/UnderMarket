import {ReactElement, useState} from 'react';
import {StyleSheet, View, Modal, ViewStyle} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AppModal from '../../AppModal';
import AppText from '../../Text';

type IAppSelectItem = {key: string; value: string};

type IAppSelectProps = {
  items: IAppSelectItem[];
  onChange: (key: string) => {};
  selectedValue: IAppSelectItem;
  style?: ViewStyle;
};

const AppSelect = ({items, selectedValue, onChange}: IAppSelectProps) => {
  const [showItems, setShowItems] = useState(false);

  const handleShowItems = () => {
    setShowItems(!showItems);
  };

  const handleItemPress = (item: IAppSelectItem) => {};

  return (
    <TouchableOpacity
      style={[styles.selectContainer, styles]}
      onPress={handleShowItems}>
      <AppText>{selectedValue.value}</AppText>
      {showItems && (
        <AppModal>
          <View style={styles.itemsContainer}>
            {items.map((item, index) => (
              <TouchableOpacity
                onPress={() => handleItemPress(item)}
                key={index}>
                <AppText>{item.value}</AppText>
              </TouchableOpacity>
            ))}
          </View>
        </AppModal>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  selectContainer: {},
  itemsContainer: {
    backgroundColor: 'white',
  },
});

export default AppSelect;
