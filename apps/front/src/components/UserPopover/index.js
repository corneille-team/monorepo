import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { disconnectUser } from '../../actions/user';
import { imagesLinks, PATHS } from '../../utils';
import { useClickOutside } from '../../hooks/useClickOutside';
import theme from '../../styles/theme';

const Container = styled.div`
  position: relative;
`;

const StyledPopover = styled.div`
  position: absolute;
  z-index: 1000;
  background-color: white;
  border-radius: 6px;
  border: 1px solid ${theme.colors.stroke};
  top: 70px;
  right: 0;
  width: 250px;
  display: flex;
  flex-direction: column;
  padding: 8px;

  span {
    cursor: pointer;
  }
`;

const ElementsContainer = styled.div`
  border-bottom: 1px solid ${theme.colors.stroke};
  border-top: 1px solid ${theme.colors.stroke};
  padding: 10px 0;
`;

const Element = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;

  p {
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
  }

  img {
    width: 16px;
    height: 16px;
    margin-right: 10px;
  }

  &:hover {
    background-color: ${theme.colors.grayLight};
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 8px 14px 8px;

  p {
    margin: 0;
    font-weight: 600;
    font-size: 14px;
    line-height: 1;
  }

  span {
    font-weight: 300;
    font-size: 10px;
  }

  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin-right: 10px;
  }
`;

const Popover = ({ openAccount }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  const router = useRouter();

  return (
    <StyledPopover>
      <Header>
        <img src={user.picture_url || imagesLinks.gifs.avatar} alt={'avatar'} />
        <p>
          {user?.first_name} {user?.last_name}
          <br /> <span>{user?.email}</span>
        </p>
      </Header>
      <ElementsContainer>
        <Element onClick={openAccount}>
          <img src={imagesLinks.icons.profile} alt={'profile'} />
          <p>{t('common:user_popover.profile')}</p>
        </Element>
        <Element>
          <img src={imagesLinks.icons.plan} alt={'plan and billing'} />
          <p>{t('common:user_popover.plan_and_billing')}</p>
        </Element>
        <Element>
          <img src={imagesLinks.icons.team} alt={'team'} />
          <p>{t('common:user_popover.team')}</p>
        </Element>
      </ElementsContainer>
      <Element
        onClick={() => dispatch(disconnectUser()).then(() => router.push(PATHS.CONNEXION))}
        style={{ marginTop: '10px' }}
      >
        <img src={imagesLinks.icons.logout} alt={'logout'} />
        <p>{t('common:user_popover.logout')}</p>
      </Element>
    </StyledPopover>
  );
};

const UserPopover = ({ openAccount, children }) => {
  const ref = useRef();

  const [show, setShow] = useState(false);

  useClickOutside(ref, () => setShow(false));

  return (
    <Container onClick={() => setShow(!show)} ref={ref}>
      {show && <Popover openAccount={openAccount} />}
      {children}
    </Container>
  );
};

export default UserPopover;
