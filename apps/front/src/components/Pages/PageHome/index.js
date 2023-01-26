import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import { toolsType } from 'lib-enums';

import LayoutWithSidebar from '../../../layouts/LayoutWithSidebar';
import { imagesLinks, PATHS } from '../../../utils';
import Tabs from '../../Tabs';
import theme from '../../../styles/theme';
import ModalTool from '../../ModalTool';

const ToolsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 40px;
  max-height: calc(100vh - 300px);
  overflow-y: auto;
  gap: 20px;
`;

const ToolSelected = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${theme.colors.blueLight};
  border-radius: 16px;
  display: none;
`;

const Tool = styled.div`
  position: relative;
  border: 1px solid ${theme.colors.stroke};
  height: 240px;
  width: 290px;
  border-radius: 16px;
  padding: 24px;
  overflow-y: visible;
  cursor: pointer;

  p {
    color: ${theme.colors.gray};
    line-height: 1.25rem;
  }

  h6 {
    font-weight: 600;
    margin: 10px 0;
  }

  &:hover {
    border: 2px solid ${theme.colors.blue};
  }

  &:hover ${ToolSelected} {
    display: block;
  }
`;

const ToolImgContainer = styled.div`
  border: 1px solid ${theme.colors.stroke};
  border-radius: 8px;
  height: 48px;
  width: 48px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 27px;
    height: 27px;
  }
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${theme.colors.stroke};
  border-radius: 5px;
  padding: 6px 20px;
  height: 58px;
  margin-bottom: 30px;

  input {
    border: none;

    &:focus {
      border: none;
    }
    &:active {
      border: none;
    }
  }

  &:hover {
    border-color: ${theme.colors.blue};
  }

  img {
    height: 18px;
    width: 18px;
  }
`;

const PageHome = () => {
  const { t } = useTranslation();

  const list = {
    all: {
      key: 'all',
      value: t('common:library.list.all'),
      filter: [],
    },
    business_growth: {
      key: 'business_growth',
      value: t('common:library.list.business_growth'),
      filter: ['growth_ideas'],
    },
    business_needs: {
      key: 'business_needs',
      value: t('common:library.list.business_needs'),
      filter: [
        'added_value_extractor',
        'argument_generator',
        'company_bio',
        'ice_breaker_generator',
        'response_generator',
        'subsidiary_extractor',
        'tonality_changer',
      ],
    },
    com_and_marketing: {
      key: 'com_and_marketing',
      value: t('common:library.list.com_and_marketing'),
      filter: ['cold_email_generator', 'linkedin_post_generator'],
    },
    strategy: {
      key: 'strategy',
      value: t('common:library.list.strategy'),
      filter: ['company_vision', 'reformulation'],
    },
  };

  const [filter, setFilter] = useState(list.all.key);
  const [search, setSearch] = useState('');

  const [tool, setTool] = useState(null);

  return (
    <LayoutWithSidebar title={t('common:library.title')} path={PATHS.HOME}>
      <Search>
        <img src={imagesLinks.icons.bubbles} alt={'create'} />
        <input
          placeholder={t('common:placeholder_search')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Search>
      <Tabs list={Object.values(list)} selected={filter} select={setFilter} />
      <ToolsContainer>
        {Object.values(toolsType)
          ?.filter((t) => !list[filter].filter?.length || list[filter].filter?.includes(t))
          ?.map((tool) => (
            <Tool key={tool} onClick={() => setTool(tool)}>
              <ToolSelected />
              <ToolImgContainer>
                <img src={`/tools/${tool}.svg`} alt={tool} />
              </ToolImgContainer>
              <h6>{t(`common:tools.${tool}.title`)}</h6>
              <p>{t(`common:tools.${tool}.description`)}</p>
            </Tool>
          ))}
      </ToolsContainer>

      {tool && <ModalTool tool={tool} handleClose={() => setTool(null)} />}
    </LayoutWithSidebar>
  );
};

export default PageHome;
