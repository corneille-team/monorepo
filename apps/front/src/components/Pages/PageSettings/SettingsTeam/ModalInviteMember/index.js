import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'next-i18next';

import Style from '../../style';
import { imagesLinks, REGEX_EMAIL } from '../../../../../utils';
import * as theme from '../../../../../styles/theme';

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

const RemainingSeats = styled.span`
  text-transform: lowercase;
  display: flex;
  flex-direction: row-reverse;
  color: ${theme.colors.gray};
`;

const ModalInviteMember = ({ company, handleClose }) => {
  const { t } = useTranslation();

  const [email, setEmail] = useState('');

  const remainingSeats = () => company?.members_ids?.length < company?.subscription.seats;

  return (
    <Modal show size={'fit-content'}>
      <Header>
        <h6>{t('common:settings.team.add_collaborator')}</h6>
        <img src={imagesLinks.icons.close} alt={'close'} onClick={handleClose} />
      </Header>

      <div>
        <label>{t('common:settings.team.email')}</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
        <RemainingSeats>
          {company?.subscription?.seats - company?.members_ids?.length}{' '}
          {t(
            `common:settings.team.${
              remainingSeats() > 1 ? 'remaining_invites' : 'remaining_invite'
            }`,
          )}
        </RemainingSeats>
      </div>
      <Style.Button condition={email && REGEX_EMAIL.test(email)}>
        {t('common:settings.team.confirm')}
      </Style.Button>
    </Modal>
  );
};

export default ModalInviteMember;
