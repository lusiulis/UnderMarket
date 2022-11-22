import {useCallback, useEffect, useRef, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {CommonStyles} from '../../Assets/Styles';
import SearchBar from '../../Components/SearchBar';
import ContentList from '../../Components/Widgets/Content/ContentList';
import {getContentByTitle, getContents, getContentSuscription} from '../../Models/Content';
import {IContent, IContentCard} from '../../Models/Content/Content';

const Home = () => {
  const [contentList, setContentList] = useState<IContentCard[]>([]);

  useEffect(() => {
    getContentSuscription(handleOnSnapshotUpdate, '');
  }, []);

  const handleOnSnapshotUpdate = (contents: IContentCard[]) => {
    setContentList(contents);
  };

  const searchContent=(criteria:string)=>{
    getContentSuscription(handleOnSnapshotUpdate, criteria);
  }

  return (
    <LinearGradient
      colors={['#1D5771', '#2A8187', '#46D9B5']}
      style={styles.mainContainer}>
      <SearchBar search={searchContent}/>
      <ScrollView contentContainerStyle={{alignItems: 'center'}}>
      <ContentList contents={contentList} />
      </ScrollView>
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
