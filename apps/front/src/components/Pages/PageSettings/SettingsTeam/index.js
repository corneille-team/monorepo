import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import { settingsCategories } from 'lib-enums';
import Link from 'next/link';

import Style from '../style';
import theme from '../../../../styles/theme';
import { getCompanyMembers } from '../../../../actions/user';
import ModalInviteMember from './ModalInviteMember';
import { imagesLinks, PATHS } from '../../../../utils';

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

const TeamNotAvailable = styled.div`
  margin-top: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 10px;

  h4 {
    margin: 0;
  }

  p {
    margin: 0;
  }

  img {
    width: 80px;
    height: 80px;
  }
`;

const ButtonUpgrade = styled.button`
  position: relative;
  width: 210px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  background: linear-gradient(90deg, #4375d6 2.37%, #c15bad 49.37%, #e58b76 96.67%);
  border-radius: 6px;
  font-size: 13px;
  height: 45px;
  margin-top: 20px;

  img {
    position: absolute;
    right: 20px;
    height: 20px;
    width: 20px;
  }
`;

const SettingsTeam = ({ user, company }) => {
  const { t } = useTranslation();

  const [showInviteModal, setShowInviteModal] = useState(null);

  const [members, setMembers] = useState(null);

  useEffect(() => {
    getCompanyMembers().then(setMembers);
  }, []);

  const remainingSeats = () => company?.members_ids?.length < company?.subscription.seats;

  return (
    <Style.CenteredContainer>
      {!company?.subscription?.plan && (
        <TeamNotAvailable>
          <img src={imagesLinks.icons.sad} alt={'sad'} />
          <h4>{t('common:settings.team.team_not_available')}</h4>
          <p>{t('common:settings.team.please_upgrade')}</p>
          <Link href={`${PATHS.SETTINGS}?category=${settingsCategories.plan_and_billing}`}>
            <ButtonUpgrade>
              {t('common:sidebar.upgrade')}{' '}
              <img src={imagesLinks.icons.lightning} alt={'upgrade'} />
            </ButtonUpgrade>
          </Link>
        </TeamNotAvailable>
      )}
      {company?.subscription?.plan && (
        <>
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
                      {member?.first_name} {member?.last_name?.toUpperCase()}{' '}
                      {member._id === String(user._id) && `(${t(`common:you`)})`}
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
        </>
      )}

      {showInviteModal && (
        <ModalInviteMember company={company} handleClose={() => setShowInviteModal(false)} />
      )}
    </Style.CenteredContainer>
  );
};

export default SettingsTeam;
