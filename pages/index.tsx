import type { NextPage } from 'next';

import Page from '@components/Page';
import PageSplash from '@components/PageSplash';

const HomePage: NextPage = () => {
  return (
    <Page>
      <PageSplash />
    </Page>
  );
};

export default HomePage;
