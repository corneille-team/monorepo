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
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 450px;
  max-width: 450px;
  padding: 40px;
  margin: auto;

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
  background-color: ${theme.colors.darkblue};
  border-radius: 6px;
  height: 45px;
  margin-top: 10px;
  cursor: pointer;
  margin-bottom: 15px;
  width: calc(100% - 0px);
`;

const LinkConnection = styled.p`
  font-size: 14px;
  font-weight: 300;
  text-align: center;
  flex-direction: column;
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

const LitteTitle = styled.p`
  margin-bottom: 30px;
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
    font-size: 16px;
    font-weight: 600;
    text-align: center;
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

  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');

  const [error, setError] = useState(false);

  const callRegister = (e) => {
    e.preventDefault();

    setIsLoading(true);

    let first_name = name.split(' ')[0];
    let last_name = name.slice(first_name.length, name.length);

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
      <Left>
        <Logo src={imagesLinks.logos.full} alt="logo dreamtone" />
        <h6>L&apos;alternative moins chers</h6>
        <LitteTitle>Aucune carte bancaire demandée</LitteTitle>
        <form onSubmit={callRegister}>
          <label>Nom complet</label>
          <input
            type="nom complet"
            name="nom complet"
            onChange={(event) => setName(event.target.value)}
            value={name}
          />
          <label>Adresse e-mail</label>
          <input
            type="email"
            onChange={(event) => setEmail(event.target.value)}
            name="Email"
            value={email}
          />
          <label>Mot de passe</label>
          <input
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            name="Password"
            value={password}
          />
          <label>Confirmer votre Mot de passe</label>
          <input
            type="password"
            onChange={(event) => setRepeatedPassword(event.target.value)}
            name="Password"
            value={repeatedPassword}
          />
          <ButtonSubmit type="submit">S&apos;inscrire gratuitement </ButtonSubmit>
          <Link href={PATHS.CONNEXION}>
            <LinkConnection>
              Vous avez déjà un compte ? <ColorLink>Se connecter</ColorLink>
            </LinkConnection>
          </Link>
        </form>
      </Left>
      <Right>
        <h6>Ils sont déjà nombreux à nous faire confiance : freelances, agences et entreprises</h6>
        <LogoDisplay>
          <LogoCompany src={imagesLinks.companies.logo.alma} alt="logo alma" />
          <LogoCompany src={imagesLinks.companies.logo.blablacar} alt="logo blablacar" />
          <LogoCompany src={imagesLinks.companies.logo.jobteaser} alt="logo jobteaser" />
          <LogoCompany src={imagesLinks.companies.logo.payfit} alt="logo payfit" />
          <LogoCompany src={imagesLinks.companies.logo.swile} alt="logo swile" />
        </LogoDisplay>
      </Right>
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
