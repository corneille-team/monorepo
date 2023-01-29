import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Link from 'next/link';
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
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

const Left = styled.div`
  text-align: center;
  width: 450px;
  max-width: 450px;
  padding: 40px;
  margin: auto;

  form {
    margin-top: 30px;
    text-align: left;
  }

  input {
    margin-bottom: 20px;
  }

  h6 {
    font-weight: 700;
    font-size: 18px;
    margin-bottom: 10px;
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

const ButtonSubmit = styled.button`
  background-color: ${(props) => (props.disabled ? theme.colors.grayText : theme.colors.blueDeep)};
  border-radius: 6px;
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

const Right = styled.div`
  background: -webkit-linear-gradient(
    top,
    rgb(29, 2, 23) 0%,
    rgb(13, 23, 43) 50%,
    rgb(4, 36, 67) 100%
  );
  width: calc(100vw - 450px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  h6 {
    font-weight: 600;
    color: white;
    margin-bottom: 40px;
  }

  ${deviceMedia[deviceSizes.tablet]`
    display: none;
  `}
`;

const LogoDisplay = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px 50px;
  max-width: 80%;
`;

const LogoCompany = styled.img`
  width: 100px;
  height: 33px;
`;

const Register = () => {
  const router = useRouter();

  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');

  const callRegister = (e) => {
    e.preventDefault();

    setIsLoading(true);

    const first_name = name.split(' ')[0];
    const last_name = name.slice(first_name.length, name.length);

    callApi({
      method: 'POST',
      url: '/auth/register',
      data: {
        first_name,
        last_name,
        email,
        password,
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
        setRepeatedPassword('');
      });
  };

  return (
    <LayoutPermissions shouldBeDisconnected>
      <Container>
        <Left>
          <Logo src={imagesLinks.logos.full} alt="logo dreamtone" />
          <h6>{t('common:register.alternative')}</h6>
          <p>{t('common:register.subtitle')}</p>
          <form onSubmit={callRegister}>
            <label>{t('common:register.name')}</label>
            <input
              type="nom complet"
              name="nom complet"
              onChange={(event) => setName(event.target.value)}
              value={name}
            />
            <label>{t('common:register.email')}</label>
            <input
              type="email"
              onChange={(event) => setEmail(event.target.value)}
              name="Email"
              value={email}
            />
            <label>{t('common:register.password')}</label>
            <input
              type="password"
              onChange={(event) => setPassword(event.target.value)}
              name="Password"
              value={password}
            />
            <label>{t('common:register.confirm')}</label>
            <input
              type="password"
              onChange={(event) => setRepeatedPassword(event.target.value)}
              name="Password"
              value={repeatedPassword}
            />
            <ButtonSubmit
              type="submit"
              disabled={
                !email ||
                !REGEX_EMAIL.test(email) ||
                !name ||
                !password ||
                password !== repeatedPassword
              }
            >
              {t('common:register.sign_up')}
              {isLoading && <Spinner />}
            </ButtonSubmit>
            <p style={{ textAlign: 'center' }}>
              {t('common:register.already_sign_up')}{' '}
              <Link href={PATHS.CONNEXION}>
                <ColorLink> {t('common:register.sign_in')}</ColorLink>
              </Link>
            </p>
          </form>
        </Left>
        <Right>
          <h6>{t('common:register.they_trust_us')}</h6>
          <LogoDisplay>
            <LogoCompany src={imagesLinks.companies.logo.alma} alt="logo alma" />
            <LogoCompany src={imagesLinks.companies.logo.blablacar} alt="logo blablacar" />
            <LogoCompany src={imagesLinks.companies.logo.jobteaser} alt="logo jobteaser" />
            <LogoCompany src={imagesLinks.companies.logo.payfit} alt="logo payfit" />
            <LogoCompany src={imagesLinks.companies.logo.swile} alt="logo swile" />
          </LogoDisplay>
        </Right>
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
