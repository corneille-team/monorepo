import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
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
  width: 270px;
  border-radius: 16px;
  padding: 24px;
  overflow-y: auto;
  margin-right: 20px;
  margin-bottom: 20px;
  cursor: pointer;

  p {
    color: ${theme.colors.gray};
    line-height: 1.5;
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
      value: t('common:library.list.all'),
    },
    website: {
      value: t('common:library.list.website'),
    },
    ecommerce: {
      value: t('common:library.list.ecommerce'),
      comingSoon: true,
    },
    articles_and_blogs: {
      value: t('common:library.list.articles_and_blogs'),
      comingSoon: true,
    },
    others: {
      value: t('common:library.list.others'),
      comingSoon: true,
    },
  };

  const [filter, setFilter] = useState(list.all.value);
  const [search, setSearch] = useState('');

  const [tool, setTool] = useState(null);

  return (
    <LayoutWithSidebar path={PATHS.HOME}>
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
        {Object.values(toolsType)?.map((tool) => (
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
