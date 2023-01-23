import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import PageHome from '../src/components/Pages/PageHome';
import LayoutPermissions from '../src/layouts/LayoutPermissions';

const Home = () => {
  return (
    <LayoutPermissions>
      <PageHome />
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

export default Home;
