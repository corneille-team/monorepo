import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';

import Style from '../style';
import theme from '../../../../styles/theme';
import { getCompanyMembers } from '../../../../actions/user';
import ModalInviteMember from './ModalInviteMember';

const Table = styled.div`
  border: 1px solid ${theme.colors.stroke};
  border-radius: 10px;
`;

const Header = styled.div`
  display: flex;

  span {
    text-transform: uppercase;
    font-weight: 400;
  }
`;

const Left = styled.div`
  width: 40%;
  padding: 10px;
`;

const Right = styled.div`
  padding: 10px;
  width: 60%;
`;

const Line = styled.div`
  display: flex;
  border-top: 1px solid ${theme.colors.stroke};

  p {
    margin: 0;
    font-size: 14px;
    font-weight: 300;
  }
`;

const SettingsTeam = ({ company }) => {
  const { t } = useTranslation();

  const [members, setMembers] = useState(null);

  const [showInviteModal, setShowInviteModal] = useState(null);

  useEffect(() => {
    getCompanyMembers().then(setMembers);
  }, []);

  const remainingSeats = () => company?.members_ids?.length < company?.subscription.seats;

  return (
    <Style.CenteredContainer>
      <Style.Section>
        <Style.Row style={{ justifyContent: 'space-between' }}>
          <p style={{ margin: 0 }}>{t('common:settings.team.remaining_user_slots')}</p>
          <h4 style={{ margin: 0, fontWeight: 600 }}>
            {company?.members_ids?.length}/{company?.subscription.seats}
          </h4>
        </Style.Row>
      </Style.Section>
      <Style.Section>
        <p>{t('common:settings.team.your_team')}</p>
        <Table>
          <Header>
            <Left>
              <span>{t('common:settings.team.collaborator')}</span>
            </Left>
            <Right>
              <span>{t('common:settings.team.email')}</span>
            </Right>
          </Header>
          {members?.map((member) => (
            <Line key={member.email}>
              <Left>
                <p>
                  {member?.first_name} {member?.last_name?.toUpperCase()}
                </p>
              </Left>
              <Right>
                <p>{member?.email}</p>
              </Right>
            </Line>
          ))}
        </Table>

        <Style.Button condition={remainingSeats()} onClick={() => setShowInviteModal(true)}>
          {t('common:settings.team.add')}
        </Style.Button>
      </Style.Section>

      {showInviteModal && (
        <ModalInviteMember company={company} handleClose={() => setShowInviteModal(false)} />
      )}
    </Style.CenteredContainer>
  );
};

export default SettingsTeam;
