import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';

import theme from '../../styles/theme';

const Container = styled.div`
  width: 100%;
  border-radius: 26px;
`;

const StyledTabs = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Tab = styled.p`
  height: 40px;
  padding: 0 20px;
  font-size: 14px;
  color: ${theme.colors.black};
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;

  ${(props) =>
    props.isSelected &&
    `
    background-color: ${theme.colors.blue};
    color: white;
  `};

  ${(props) =>
    props.comingSoon &&
    `
    color: ${theme.colors.gray};
    cursor: default;
  `};

  &:hover {
    color: ${(props) => !props.comingSoon && !props.isSelected && theme.colors.blue};
  }

  transition: 0.1s;
`;

const ComingSoon = styled.span`
  background-color: white;
  font-size: 8px;
  padding: 0 5px;
  border-radius: 20px;
  border: 1px solid ${theme.colors.stroke};
  margin-left: 5px;
`;

const Tabs = ({ list, selected, select }) => {
  const { t } = useTranslation();

  return (
    <Container>
      <StyledTabs>
        {list?.map((el) => (
          <Tab
            key={el.value}
            comingSoon={el.comingSoon}
            isSelected={selected === el.key}
            onClick={() => !el.comingSoon && select(el.key)}
          >
            {el.value}
            {el.comingSoon && <ComingSoon>{t('common:library.soon')}</ComingSoon>}
          </Tab>
        ))}
      </StyledTabs>
    </Container>
  );
};

export default Tabs;
