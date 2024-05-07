import type { NextPage } from 'next';
import { v4 as uuidv4 } from 'uuid';

import Page from '@components/Page';
import PageOutfit from '@components/PageOutfit';
import { useRouter } from 'next/router';

const Outfit: NextPage = () => {
  const router = useRouter();

  const uid = router.query?.uid || '';
  const sid = router.query?.sid || '';
  const UID = !Array.isArray(uid) && uid ? uid : uuidv4();
  const SID = !Array.isArray(sid) && sid ? sid : uuidv4();

  return (
    <Page>
      <PageOutfit SID={SID} UID={UID} />
    </Page>
  );
};

export default Outfit;
