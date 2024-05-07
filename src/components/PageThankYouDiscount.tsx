import { useEffect, useState } from 'react';

import Layout from '@components/Layout';

import s from './PageThankYouDiscount.module.scss';

import { ReactComponent as Barcode } from '../assets/img/barcode.svg';

type PageThankYouDiscountProps = {
  validUntil: Date;
};

const addZero = (n: number) => (n < 10 ? `0${n}` : n.toString());

const getDistance = (date: Date) => {
  // Find the distance between now and the count down date
  const distance = +date - Date.now();

  if (distance < 0) {
    throw new Error('Discount code no longer valid');
  }

  // Time calculations for days, hours, minutes and seconds
  // const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  return `${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`;
};

const PageThankYouDiscount = ({ validUntil }: PageThankYouDiscountProps) => {
  const [countdown, setCountdown] = useState(getDistance(validUntil));

  useEffect(() => {
    const update = () => {
      setCountdown(getDistance(validUntil));
    };

    const intervalId = setInterval(update, 1000);

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [validUntil]);

  return (
    <Layout hideHeader>
      <section className={s.wrap}>
        <div className={s.sectionFrame}>
          <div className={s.contentWrap}>
            <span className={s.bigTitle}>A Treat for the boss</span>
            <div className={s.barCode}>
              <Barcode />
            </div>
            <span className={s.countDownTitle}>
              Time left to redeem voucher
            </span>
            <span className={s.countDown}>{countdown}</span>
            <p>
              Come inside to claim your free gift by showing this barcode
              in-store.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PageThankYouDiscount;
