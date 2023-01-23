import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { imagesLinks, PATHS, REGEX_EMAIL } from '../src/utils';
import theme from '../src/styles/theme';
import callApi from '../src/middlewares/callApi';
import Spinner from '../src/components/Spinner';
import { deviceMedia, deviceSizes } from '../src/styles/helper';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: rgb(244, 244, 244);
`;

const Logo = styled.img`
  height: 40px;
  margin-bottom: 20px;
  position: absolute;
  top: -45px;
  left: 50%;
  transform: translateX(-50%);
`;

const RegisterContainer = styled.div`
  position: relative;
  background-color: white;
  justify-content: center;
  border-radius: 16px;
  padding: 50px;
  max-width: 400px;
  margin: 20px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);

  ${deviceMedia[deviceSizes.phone]`
    padding: 25px;
  `};
`;

const Input = styled.input`
  margin-bottom: 10px;
  border: 3px solid ${theme.colors.gray};
`;

const Redirect = styled.p`
  text-align: right;
  margin-bottom: 10px;

  a {
    &:hover {
      color: ${theme.colors.gray};
      text-decoration: underline;
    }
  }
`;

const Register = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');

  const [error, setError] = useState(false);

  const register = () => {
    setIsLoading(true);

    callApi({
      method: 'POST',
      url: '/auth/register',
      data: {
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
        setError(true);
        setPassword('');
        setRepeatedPassword('');
      });
  };

  useEffect(() => {
    setError(null);
  }, [email, password, repeatedPassword]);

  return (
    <Container>
      <RegisterContainer>
        <Logo src={imagesLinks.logos.full} alt={'Dreamtone'} />

        <h5 style={{ textAlign: 'center' }}>Inscription</h5>

        <Input placeholder={'Email'} value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input
          placeholder={'Mot de passe'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={'password'}
        />
        <Input
          placeholder={'Répéter le mot de passe'}
          value={repeatedPassword}
          onChange={(e) => setRepeatedPassword(e.target.value)}
          type={'password'}
        />
        <Redirect>
          Déjà inscris ? <Link href={PATHS.CONNEXION}>Connectez-vous</Link>
        </Redirect>

        {error && (
          <p style={{ textAlign: 'center', color: theme.colors.red }}>
            *Erreur lors de l&apos;inscription
          </p>
        )}

        <button
          style={{ width: '100%' }}
          onClick={register}
          disabled={
            !email || !REGEX_EMAIL.test(email) || !password || password !== repeatedPassword
          }
        >
          {isLoading && <Spinner />}
          Je m&apos;inscris
        </button>
      </RegisterContainer>
    </Container>
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
