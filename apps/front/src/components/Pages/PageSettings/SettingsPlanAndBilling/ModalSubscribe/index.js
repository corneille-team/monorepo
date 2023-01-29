import React from 'react';
import styled from 'styled-components';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'next-i18next';

import { imagesLinks } from '../../../../../utils';
import theme from '../../../../../styles/theme';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 340px;
  margin-bottom: 20px;

  h6 {
    font-size: 18px;
    font-weight: 600;
    margin: 0;
  }

  img {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
`;

const Button = styled.button`
  background-color: ${theme.colors.blueDeep};
  margin-top: 30px;
`;

const ModalSubscribe = ({ offer, handleClose }) => {
  const { t } = useTranslation();

  return (
    <Modal show size={'fit-content'}>
      <Header>
        <h6>{t('common:upgrade_plan')}</h6>
        <img src={imagesLinks.icons.close} alt={'close'} onClick={handleClose} />
      </Header>

      <div></div>

      <Button>{t('common:confirm')}</Button>
    </Modal>
  );
};

export default ModalSubscribe;
