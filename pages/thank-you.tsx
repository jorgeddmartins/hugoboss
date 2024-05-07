import type { NextPage } from 'next';
import { useState } from 'react';
import { addHours, isAfter } from 'date-fns';

import Page from '@components/Page';
import PageThankYou from '@components/PageThankYou';
import PageThankYouDiscount from '@components/PageThankYouDiscount';

const ThankYou: NextPage = () => {
  const [showDiscount, setShowDiscount] = useState(false);

  const hasDiscount =
    typeof localStorage !== 'undefined' &&
    !!localStorage.getItem('add_to_gallery');

  if (hasDiscount && showDiscount) {
    const validFrom = new Date(+localStorage.getItem('add_to_gallery'));
    const validUntil = addHours(validFrom, 24);
    const validDiscount = isAfter(validUntil, new Date());

    if (validDiscount) {
      return (
        <Page>
          <PageThankYouDiscount validUntil={validUntil} />
        </Page>
      );
    } else {
      throw new Error('Discount no longer valid');
    }
  }

  return (
    <Page>
      <PageThankYou showDiscount={() => setShowDiscount(true)} />
    </Page>
  );
};

export default ThankYou;
