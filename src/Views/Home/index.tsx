import {useCallback, useEffect, useRef, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {CommonStyles} from '../../Assets/Styles';
import SearchBar from '../../Components/SearchBar';
import ContentList from '../../Components/Widgets/Content/ContentList';
import {getContents} from '../../Models/Content';
import {IContentCard} from '../../Models/Content/Content';

const Home = () => {
  const [contentList, setContentList] = useState<IContentCard[]>([]);
  const [lastDocument, setLastDocument] = useState();
  const isMounted = useRef(false);

  const fetchData = useCallback(async () => {
    const contents = await getContents({limit: 15});
    setContentList(contents);
  }, []);

  useEffect(() => {
    isMounted.current = true;
    fetchData();
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handlePagination = async () => {};

  return (
    <LinearGradient
      colors={['#1D5771', '#2A8187', '#46D9B5']}
      style={styles.mainContainer}>
      <SearchBar />
      <ContentList contents={contentList} onPagination={handlePagination} />
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
