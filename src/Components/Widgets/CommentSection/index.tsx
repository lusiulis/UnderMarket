import {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {StyleSheet, View, ToastAndroid} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {AppGradientsColors, CommonStyles} from '../../../Assets/Styles';
import {AuthContext} from '../../../Contexts/appContentProvider';
import {addComment, getContentComments} from '../../../Models/Comment';
import {IComment} from '../../../Models/Comment/Comment';
import GradientButton from '../../Common/Button/GradientButton';
import Input from '../../Common/Input';
import AppText from '../../Common/Text';
import GradientText from '../../Common/Text/GradientText';
import ProfileIcon from '../../Snippets/ProfileIcon';
import Moment from 'moment';

type ICommentSectionProps = {
  contentId: string;
};

const CommentSection = ({contentId}: ICommentSectionProps) => {
  const {authState} = useContext(AuthContext);
  const [commentInput, setCommentInput] = useState('');
  const [comments, setComments] = useState<IComment[]>([]);
  const [showLabel, setShowLabel] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);
  const isMounted = useRef(false);

  const fetchComments = useCallback(async () => {
    if (isMounted) {
      const response = await getContentComments(contentId);
      setComments(response);
    }
  }, []);

  useEffect(() => {
    isMounted.current = true;
    fetchComments();
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleInputChange = (value: string) => {
    setCommentInput(value);
    if (!showSubmit) setShowSubmit(true);
  };

  const handleSubmit = async () => {
    if (authState.profile) {
       await addComment({
        contentId: contentId,
        fromId: authState.profile.id,
        description: commentInput,
        timestamp: new Date(),
      });
      const response = await getContentComments(contentId);
      setCommentInput('');
      ToastAndroid.show('Comentario Registrado', ToastAndroid.SHORT)
      setComments(response);
    }
  };

  return (
    <View style={[CommonStyles.transparentContainer, styles.main]}>
      <AppText font="bold" fontSize={15} style={{marginRight: 'auto'}}>
        Comentarios
      </AppText>
      <View
        style={[CommonStyles.transparentContainer, styles.addCommentContainer]}>
        {showLabel && (
          <GradientText font="bold" fontSize={15} style={styles.gradientLabel}>
            Agregar Comentario:
          </GradientText>
        )}
        <Input
          icon="short-text"
          setFocused={() => setShowLabel(!showLabel)}
          style={styles.input}
          value={commentInput}
          onChange={handleInputChange}
          placeHolder="Agreagar comentario..."
        />
        <ProfileIcon
          focused
          source={authState.profile?.profileImage}
          style={styles.profileIcon}
        />
      </View>
      {showSubmit && (
        <GradientButton
          style={styles.submit}
          onPress={handleSubmit}
          disabled={!commentInput || commentInput === ''}>
          <AppText font="bold" fontSize={12}>
            Comentar
          </AppText>
        </GradientButton>
      )}
      <View style={[styles.contentComments, CommonStyles.transparentContainer]}>
        {comments.length === 0 ? (
          <AppText fontSize={12}>No hay comentarios...</AppText>
        ) : (
          comments.map((comment, index) => (
            <View style={styles.commentItem} key={index}>
              <View style={styles.itemProfileContainer}>
                <ProfileIcon source={comment.from.profileImage} size={20} />
                <AppText
                  style={{marginLeft: 10}}
                  font="bold"
                  color="black"
                  fontSize={12}>
                  {comment.from.username}
                </AppText>
              </View>
              <LinearGradient
                colors={AppGradientsColors.active}
                style={{
                  width: '100%',
                  padding: 1,
                  borderRadius: 100,
                  marginVertical: 5,
                }}
              />
              <AppText color="black" fontSize={12}>
                {comment.description}
              </AppText>
              <AppText style={{marginLeft: 'auto'}} color="grey">
                {Moment(comment.timestamp).format('d MMM')}
              </AppText>
            </View>
          ))
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    padding: 10,
    width: '90%',
    alignSelf: 'center',
    marginBottom: 20,
  },
  addCommentContainer: {
    marginVertical: 20,
    width: '90%',
    display: 'flex',
    padding: 1,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  profileIcon: {
    position: 'absolute',
    right: '-5%',
    top: -10,
  },
  gradientLabel: {
    marginTop: 10,
  },
  input: {
    width: 280,
    paddingHorizontal: 10,
  },
  submit: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  contentComments: {
    width: '90%',
    padding: 10,
  },
  commentItem: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
  itemProfileContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'grey',
  },
});

export default CommentSection;
