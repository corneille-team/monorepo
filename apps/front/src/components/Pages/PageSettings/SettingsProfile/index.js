import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import Style from '../style';
import theme from '../../../../styles/theme';
import { updatePasswordUser, updateUser } from '../../../../actions/user';
import Spinner from '../../../Spinner';

const Email = styled.div`
  background-color: ${theme.colors.grayLight};
  width: 100%;
  border-radius: 6px;
  padding: 10px 20px;

  span {
    font-size: 14px;
    font-weight: 400;
  }
`;

const SettingsProfile = ({ user }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(user?.first_name);
  const [lastName, setLastName] = useState(user?.last_name);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmationPassword, setConfirmationPassword] = useState('');

  const [isIdentityLoading, setIsIdentityLoading] = useState(false);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);

  return (
    <div>
      <Style.Section>
        <p>{t('common:settings.profile.personal_infos')}</p>
        <Style.Row>
          <div>
            <label>{t('common:settings.profile.first_name')}</label>
            <input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </div>
          <div>
            <label>{t('common:settings.profile.last_name')}</label>
            <input value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>
        </Style.Row>

        <Style.Button
          condition={firstName !== user?.first_name || lastName !== user?.last_name}
          onClick={() => {
            setIsIdentityLoading(true);
            dispatch(
              updateUser({
                first_name: firstName,
                last_name: lastName,
              }),
            )
              .then(() => setIsIdentityLoading(false))
              .catch(() => toast.error('Erreur innatendue'));
          }}
        >
          {t('common:modify')}
          {isIdentityLoading && <Spinner />}
        </Style.Button>
      </Style.Section>

      <Style.Section>
        <p>{t('common:settings.profile.identifier')}</p>
        <div>
          <label>{t('common:settings.profile.email')}</label>
          <Email>
            <span>{user?.email}</span>
          </Email>
        </div>
      </Style.Section>

      <Style.Section>
        <p>{t('common:settings.profile.password')}</p>
        <Style.Row>
          <div>
            <label>{t('common:settings.profile.old_password')}</label>
            <input
              type={'password'}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
        </Style.Row>
        <Style.Row style={{ marginTop: '10px' }}>
          <div>
            <label>{t('common:settings.profile.new_password')}</label>
            <input
              type={'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={{ borderColor: newPassword !== confirmationPassword && theme.colors.red }}
            />
          </div>
          <div>
            <label>{t('common:settings.profile.confirmation_password')}</label>
            <input
              type={'password'}
              value={confirmationPassword}
              onChange={(e) => setConfirmationPassword(e.target.value)}
              style={{ borderColor: newPassword !== confirmationPassword && theme.colors.red }}
            />
          </div>
        </Style.Row>
        {newPassword !== confirmationPassword && (
          <span style={{ color: theme.colors.red }}>
            * {t('common:settings.profile.password_should_be_equal')}
          </span>
        )}
        <Style.Button
          condition={oldPassword && newPassword && newPassword === confirmationPassword}
          onClick={() => {
            setIsPasswordLoading(true);
            dispatch(
              updatePasswordUser({
                old_password: oldPassword,
                new_password: newPassword,
              }),
            )
              .then(() => {
                setIsPasswordLoading(false);
                setOldPassword('');
                setNewPassword('');
                setConfirmationPassword('');
              })
              .catch(() => toast.error('Erreur innatendue'));
          }}
        >
          {t('common:modify')}
          {isPasswordLoading && <Spinner />}
        </Style.Button>
      </Style.Section>
    </div>
  );
};

export default SettingsProfile;
