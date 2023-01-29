import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { settingsCategories } from 'lib-enums';
import { useTranslation } from 'next-i18next';

import { imagesLinks, PATHS } from '../../utils';
import theme from '../../styles/theme';
import UserPopover from '../../components/UserPopover';
import ModalCreateProject from '../../components/ModalCreateProject';

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 250px;
  padding: 20px 20px 30px 20px;
  background-color: ${theme.colors.blueDeep};
  color: white;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  height: 35px;
  margin-bottom: 30px;
`;

const Logo = styled.img`
  width: 140px;
  height: 40px;
  cursor: pointer;
`;

const Direction = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 10px;
  cursor: pointer;
  border-radius: 6px;
  background-color: ${(props) => props.selected && theme.colors.blueLight};
  box-shadow: ${(props) => props.selected && '0 0 5px 0 rgba(0, 0, 0, 0.1)'};
  margin-bottom: 5px;

  &:hover {
    background-color: ${theme.colors.blueLight};
  }

  div {
    width: ${(props) => (props.extern ? 16 : 20)}px;
    margin-right: 10px;
  }

  img {
    height: ${(props) => (props.extern ? 16 : 20)}px;
  }

  p {
    font-size: ${(props) => (props.extern ? 12 : 14)}px;
    line-height: 1.4;
    color: white;
  }

  transition: 0.5s;
`;

const UpgradeLastWords = styled.div`
  padding: 20px;
  border-radius: 6px;
  border: 1px solid #293149;

  span {
    color: white;
    font-size: 12px;
    font-weight: 400;
  }

  p {
    color: white;
    margin-top: 10px;
    font-size: 16px;
  }
`;

const ButtonUpgrade = styled.button`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  background: linear-gradient(90deg, #4375d6 2.37%, #c15bad 49.37%, #e58b76 96.67%);
  border-radius: 6px;
  font-size: 13px;
  height: 45px;

  img {
    position: absolute;
    right: 20px;
    height: 20px;
    width: 20px;
  }
`;

const TopbarContainer = styled.div`
  height: 70px;
  width: calc(100vw - 250px);
  padding: 0 25px;
  border-bottom: 1px solid ${theme.colors.stroke};

  h3 {
    font-weight: 500;
    margin: 0;
  }
`;

const Topbar = styled.div`
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ContentContainer = styled.div`
  width: calc(100vw - 250px);
  background-color: white;
  overflow: hidden;
`;

const Content = styled.div`
  height: calc(100vh - 70px);
  max-width: 1400px;
  padding: 30px 30px 50px 30px;
  overflow-y: auto;

  ${(props) => props.fluid && 'padding: 30px 0 50px 0'};
`;

const User = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  p {
    line-height: 1.4;
  }
`;

const UserPicture = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 100%;
`;

const Title = styled.h5`
  margin: 0;
  font-weight: 600;
`;

const LayoutWithSidebar = ({ title, path, contentFluid, children }) => {
  const { t } = useTranslation();

  const user = useSelector((store) => store.user);
  const company = useSelector((store) => store.company);

  const [showCreateProject, setShowCreateProject] = useState(false);

  return (
    <Container>
      <Sidebar>
        <div>
          <Link href={PATHS.HOME}>
            <LogoContainer>
              <Logo src={imagesLinks.logos.full_white} alt={'dreamtone'} />
            </LogoContainer>
          </Link>

          <div style={{ marginTop: '100px' }}>
            <Link href={PATHS.HOME}>
              <Direction selected={path === PATHS.HOME}>
                <div>
                  <img src={imagesLinks.icons.features} alt={'features'} />
                </div>
                <p>{t('common:sidebar.library')}</p>
              </Direction>
            </Link>
            <Link href={PATHS.SAVED}>
              <Direction selected={path === PATHS.SAVED}>
                <div>
                  <img src={imagesLinks.icons.saved} alt={'saved'} />
                </div>
                <p>{t('common:sidebar.saved')}</p>
              </Direction>
            </Link>
          </div>
        </div>

        <div>
          <UpgradeLastWords>
            {!company?.subscription?.plan && <span>{t('common:plans.trial')}</span>}
            {company?.subscription?.plan && <span>{t('common:plans.premium')}</span>}
            <p>
              {t('common:sidebar.words')} - {company?.subscription?.words}
            </p>
          </UpgradeLastWords>

          <Link href={''} target={'_blank'}>
            <Direction extern style={{ margin: '20px 0' }}>
              <div>
                <img src={imagesLinks.icons.message} alt={'request feature'} />
              </div>
              <p>{t('common:sidebar.features')}</p>
            </Direction>
          </Link>

          <Link href={`${PATHS.SETTINGS}?category=${settingsCategories.plan_and_billing}`}>
            <ButtonUpgrade>
              {t('common:sidebar.upgrade')}{' '}
              <img src={imagesLinks.icons.lightning} alt={'upgrade'} />
            </ButtonUpgrade>
          </Link>
        </div>
      </Sidebar>
      <ContentContainer>
        <TopbarContainer>
          <Topbar>
            <Title>{title}</Title>
            <UserPopover>
              <User>
                <div style={{ display: 'flex' }}>
                  <UserPicture
                    src={user?.picture_url || imagesLinks.gifs.avatar}
                    alt={user?.first_name}
                  />
                </div>
              </User>
            </UserPopover>
          </Topbar>
        </TopbarContainer>
        <Content fluid={contentFluid}>{children}</Content>
      </ContentContainer>
      {showCreateProject && <ModalCreateProject handleClose={() => setShowCreateProject(false)} />}
    </Container>
  );
};

export default LayoutWithSidebar;
