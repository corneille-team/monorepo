import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import LayoutPermissions from '../src/layouts/LayoutPermissions';
import PageSettings from '../src/components/Pages/PageSettings/PageSettings';

const Settings = () => {
  return (
    <LayoutPermissions>
      <PageSettings />
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

export default Settings;
