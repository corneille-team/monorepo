import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import LayoutPermissions from '../src/layouts/LayoutPermissions';
import PageSaved from '../src/components/Pages/PageSaved';

const Saved = () => {
  return (
    <LayoutPermissions>
      <PageSaved />
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

export default Saved;
