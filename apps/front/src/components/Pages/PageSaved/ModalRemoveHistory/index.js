import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { imagesLinks } from '../../../../utils';
import theme from '../../../../styles/theme';
import { removeHistory } from '../../../../actions/company';
import Spinner from '../../../Spinner';

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
  margin: 20px 0 0 auto;
  background-color: ${theme.colors.blueText};
`;

const ModalRemoveHistory = ({ completionId, handleClose }) => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  return (
    <Modal show size={'fit-content'}>
      <Header>
        <h6>{t('common:saved.remove.title')}</h6>
        <img src={imagesLinks.icons.close} alt={'close'} onClick={handleClose} />
      </Header>
      <div>
        <p>{t('common:saved.remove.confirmation')}</p>
        <Button
          onClick={() => {
            setLoading(true);
            dispatch(removeHistory(completionId))
              .then(handleClose)
              .catch(() => {
                setLoading(false);
                toast.error('Erreur innatendue');
              });
          }}
        >
          {t('common:saved.remove.remove')}
          {loading && <Spinner />}
        </Button>
      </div>
    </Modal>
  );
};

export default ModalRemoveHistory;
