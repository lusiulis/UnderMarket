import {useState} from 'react';
import {Modal, View} from 'react-native';
import {IContentCard} from '../../../../Models/Content/Content';
import AppModal from '../../../Common/AppModal';
import GradientButton from '../../../Common/Button/GradientButton';
import AppText from '../../../Common/Text';

type IContentDetail = {
  content?: IContentCard;
  hide: () => void;
  show: boolean;
};

const ContentDetail = ({content, hide, show}: IContentDetail) => {
  return (
    <AppModal show={show}>
      <>
        <AppText color="black">
          {content?.title ? content.title : 'error'}
        </AppText>
        <GradientButton onPress={hide}>
          <AppText>Cerrar</AppText>
        </GradientButton>
      </>
    </AppModal>
  );
};

export default ContentDetail;
