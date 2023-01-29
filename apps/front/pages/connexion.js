import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { usersRolesType } from 'lib-enums';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { toast } from 'react-toastify';

import { imagesLinks, PATHS, REGEX_EMAIL } from '../src/utils';
import theme from '../src/styles/theme';
import callApi from '../src/middlewares/callApi';
import Spinner from '../src/components/Spinner';
import { deviceMedia, deviceSizes } from '../src/styles/helper';
import LayoutPermissions from '../src/layouts/LayoutPermissions';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 450px;
  max-width: 450px;
  padding: 40px;
  margin: auto;
  height: 100vh;

  h6 {
    font-weight: 700;
    font-size: 18px;
    margin-bottom: 10px;
  }

  input {
    margin-bottom: 20px;
  }

  form {
    margin-top: 30px;
  }

  ${deviceMedia[deviceSizes.tablet]`
    width: 100%;
  `}
`;

const Logo = styled.img`
  margin-bottom: 30px;
  width: 140px;
  height: 45px;
`;

const Redirect = styled.p`
  a {
    &:hover {
      color: ${theme.colors.gray};
      text-decoration: underline;
    }
  }
`;

const ButtonSubmit = styled.button`
  background-color: ${(props) => (props.disabled ? theme.colors.grayText : theme.colors.blueDeep)};
  margin: 10px 0 15px 0;
  width: 100%;
`;

const ColorLink = styled.span`
  color: ${theme.colors.blue};
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`;

const Register = () => {
  const router = useRouter();

  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const register = (e) => {
    e.preventDefault();

    setIsLoading(true);

    callApi({
      method: 'POST',
      url: '/auth',
      data: {
        email,
        password,
        user_type: usersRolesType.user,
      },
    })
      .then((response) => {
        router.push({
          pathname: PATHS.LOGIN,
          query: {
            token: response.token,
            source: router.query.source,
          },
        });
      })
      .catch(() => {
        setIsLoading(false);
        toast.error('Erreur innatendue');
        setPassword('');
      });
  };

  return (
    <LayoutPermissions shouldBeDisconnected>
      <Container>
        <Logo src={imagesLinks.logos.full} alt={'Dreamtone'} />
        <h6>{t('common:connexion.welcome_back')}</h6>
        <p>{t('common:connexion.subtitle')}</p>
        <form onSubmit={register}>
          <label>{t('common:connexion.email')}</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />

          <label>{t('common:connexion.password')}</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type={'password'} />

          <ButtonSubmit type="submit" disabled={!email || !REGEX_EMAIL.test(email) || !password}>
            {t('common:connexion.sign_in')}
            {isLoading && <Spinner />}
          </ButtonSubmit>
        </form>

        <Redirect>
          {t('common:connexion.not_registered')}{' '}
          <Link href={PATHS.REGISTER}>
            <ColorLink>{t('common:connexion.sign_up')}</ColorLink>
          </Link>
        </Redirect>
      </Container>
    </LayoutPermissions>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default Register;
