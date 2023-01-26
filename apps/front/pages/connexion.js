import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { usersRolesType } from 'lib-enums';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { imagesLinks, PATHS, REGEX_EMAIL } from '../src/utils';
import theme from '../src/styles/theme';
import callApi from '../src/middlewares/callApi';
import Spinner from '../src/components/Spinner';
import { deviceMedia, deviceSizes } from '../src/styles/helper';

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
  ${deviceMedia[deviceSizes.tablet]`
    width: 100%;
  `}
`;

const Logo = styled.img`
  margin-bottom: 30px;
  width: 140px;
  height: 45px;
`;

const Input = styled.input`
  margin-bottom: 20px;
`;

const LitteTitle = styled.p`
  margin-bottom: 30px;
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
  background-color: ${theme.colors.darkblue};
  border-radius: 6px;
  height: 45px;
  margin-top: 10px;
  cursor: pointer;
  margin-bottom: 15px;
  width: calc(100% - 0px);
`;

const ColorLink = styled.span`
  color: rgb(65, 118, 214);
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  :hover {
    text-decoration: underline;
  }
`;

const Register = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(false);

  const register = (e) => {
    e.preventDefault();

    setError(false);
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
        setError(true);
        setPassword('');
      });
  };

  useEffect(() => {
    setError(null);
  }, [email, password]);

  return (
    <Container>
      <Logo src={imagesLinks.logos.full} alt={'Dreamtone'} />
      <h6>Heureux de revoir</h6>
      <LitteTitle>Aucune carte bancaire demandée</LitteTitle>
      <form onSubmit={register}>
        <label>Adresse e-mail</label>
        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>mot de passe</label>
        <Input value={password} onChange={(e) => setPassword(e.target.value)} type={'password'} />
        {error && <p style={{ color: theme.colors.red }}>*Erreur lors de l&apos;inscription</p>}

        <ButtonSubmit type="submit" disabled={!email || !REGEX_EMAIL.test(email) || !password}>
          {isLoading && <Spinner />}
          Connexion
        </ButtonSubmit>
      </form>
      <Redirect>
        Pas encore inscrit ? <ColorLink>Inscrivez-vous</ColorLink>
      </Redirect>
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
