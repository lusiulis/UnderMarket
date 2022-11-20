import {Picker} from '@react-native-picker/picker';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {AppGradientsColors, CommonStyles} from '../../../../Assets/Styles';
import {
  getAllDivitions,
  getCategoryByDivitionId,
} from '../../../../Models/Category';
import {ICategory, IDivition} from '../../../../Models/Category/Category';
import GradientButton from '../../../Common/Button/GradientButton';
import AppText from '../../../Common/Text';

type ICategorySelectorProps = {
  selectedCategories: ICategory[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<ICategory[]>>;
};

const CategorySelector = ({
  selectedCategories,
  setSelectedCategories,
}: ICategorySelectorProps) => {
  const [divitions, setDivitions] = useState<IDivition[]>([]);
  const isMounted = useRef(false);
  const fetchDivitions = useCallback(async () => {
    if (isMounted) {
      const divitions = await getAllDivitions();
      setDivitions(divitions);
    }
  }, []);
  useEffect(() => {
    isMounted.current = true;
    fetchDivitions();
    return () => {
      isMounted.current = false;
    };
  }, []);

  const [selectedDivition, setSelectedDivition] = useState<IDivition>();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [categoriesToSelect, setCategoriesToSelect] = useState<ICategory[]>([]);
  const aja = useMemo(() => selectedCategories, [selectedCategories]);

  const fetchCategories = useCallback(async () => {
    if (selectedDivition) {
      const categories = await getCategoryByDivitionId(selectedDivition.id);
      setCategories(categories);
    }
  }, [selectedDivition]);

  useEffect(() => {
    fetchCategories();
  }, [selectedDivition]);

  useEffect(() => {
    const toSelect = categories.filter(value => {
      let temp = true;
      aja.forEach((aji) => {
        if(aji.id === value.id) temp = false
      })
      return temp;
    });
    setCategoriesToSelect(toSelect);
  }, [categories, aja]);

  const handleDivitionChange = (divition: IDivition) => {
    setSelectedDivition(divition);
  };

  const handleSelectCategory = (category: ICategory) => {
    setSelectedCategories(selectedCategories.concat(category));
  };

  const handleUnSelectCategory = (category: ICategory) => {
    setSelectedCategories(
      selectedCategories.filter(
        selectedCategory => selectedCategory.id !== category.id,
      ),
    );
  };

  return (
    <View style={[CommonStyles.transparentContainer, styles.container]}>
      <AppText font="bold" fontSize={17}>
        Categorización
      </AppText>
      <View style={styles.divitionContainer}>
        <AppText fontSize={15}>División: </AppText>
        <Picker
          selectedValue={selectedDivition}
          onValueChange={itemValue => handleDivitionChange(itemValue)}
          placeholder="No hay Divisiones..."
          style={{color: 'white', width: '70%'}}>
          {divitions.map((divition, index) => (
            <Picker.Item key={index} label={divition.name} value={divition} />
          ))}
        </Picker>
      </View>
      <AppText
        font="bold"
        fontSize={categories.length > 0 ? 15 : 12}
        style={{textAlign: 'center'}}>
        {categories.length > 0
          ? 'Seleccione las Categorias:'
          : 'No hay más categorías para está selección'}
      </AppText>
      {categoriesToSelect.length > 0 && (
        <View style={{flex: 1}}>
          <View style={styles.categoriesContainer}>
            {categoriesToSelect.map((category, index) => (
              <View style={styles.categoryItem} key={index}>
                <TouchableOpacity
                  onPress={() => handleSelectCategory(category)}>
                  <AppText font="bold" color="black" fontSize={12}>
                    {category.name}
                  </AppText>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      )}
      <AppText font="bold" fontSize={15} style={{marginTop: 10}}>
        Categorias Seleccionadas:
      </AppText>
      {aja.length > 0 ? (
        <View style={{flex: 1}}>
          <View style={styles.selectedCategoriesContainer}>
            {aja.map((category, index) => (
              <GradientButton
                key={index}
                colors={AppGradientsColors.active}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={styles.categoryItem}
                onPress={() => handleUnSelectCategory(category)}>
                <AppText font="bold">{category.name}</AppText>
              </GradientButton>
            ))}
          </View>
        </View>
      ) : (
        <AppText fontSize={12}>No hay categorias Seleccionadas</AppText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
    paddingVertical: 20
  },
  divitionContainer: {
    marginVertical: '10%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    ...CommonStyles.transparentInput,
  },
  categoriesContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginVertical: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 10,
    width: '90%',
    borderRadius: 20,
  },
  categoryItem: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 5,
  },
  selectedCategoriesContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginVertical: 10,
  },
});

export default CategorySelector;
