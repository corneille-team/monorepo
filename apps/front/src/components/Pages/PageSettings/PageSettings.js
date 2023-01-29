import React, { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { settingsCategories } from 'lib-enums';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import LayoutWithSidebar from '../../../layouts/LayoutWithSidebar';
import { PATHS } from '../../../utils';
import Tabs from '../../Tabs';
import Index from './SettingsProfile';
import SettingsTeam from './SettingsTeam';
import SettingsPlanAndBilling from './SettingsPlanAndBilling';

const Content = styled.div`
  margin-top: 40px;
`;

const PageSettings = () => {
  const { t } = useTranslation();

  const router = useRouter();

  const user = useSelector((store) => store.user);
  const company = useSelector((store) => store.company);

  const list = {
    profile: {
      key: settingsCategories.profile,
      value: t('common:user_popover.profile'),
    },
    plan_and_billing: {
      key: settingsCategories.plan_and_billing,
      value: t('common:user_popover.plan_and_billing'),
    },
    team: {
      key: settingsCategories.team,
      value: t('common:user_popover.team'),
    },
  };

  const [category, setCategory] = useState(null);

  useEffect(() => {
    setCategory(router.query.category);
  }, [router.query]);

  useEffect(() => {
    if (category) {
      router.replace(`${router.pathname}?category=${category}`);
    } else {
      router.replace(`${router.pathname}?category=${settingsCategories.profile}`);
    }
  }, [category]);

  return (
    <LayoutWithSidebar title={t(`common:settings.title`)} path={PATHS.SETTINGS}>
      <Tabs list={Object.values(list)} selected={category} select={setCategory} />
      <Content>
        {category === settingsCategories.profile && <Index user={user} />}
        {category === settingsCategories.plan_and_billing && (
          <SettingsPlanAndBilling user={user} company={company} />
        )}
        {category === settingsCategories.team && <SettingsTeam user={user} company={company} />}
      </Content>
    </LayoutWithSidebar>
  );
};

export default PageSettings;
