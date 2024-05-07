import s from './Cookies.module.scss';
import Button from '@components/Button';
import { ButtonTypes } from '@components/Button';
import { useContext, useState } from 'react';
import { PageContext } from '@components/Page';

const Cookies = () => {
  const { cookies } = useContext(PageContext);

  return (
    <section className={s.wrap}>
      <h2 className={s.title}>Your Cookies</h2>
      <p className={s.paragraph}>
        Third party cookies that are necessary for our website to function
        effectively, and for analytics, to help understand how you interact with
        our site. Do you accept these cookies?
      </p>
      <span className={s.acceptText}>Do you accept these cookies?</span>
      <div className={s.btnContent}>
        <Button
          type={ButtonTypes.BROWN}
          onClick={() => {
            cookies.setAccepted('cookies', true);
          }}
        >
          Yes, I accept
        </Button>
      </div>
    </section>
  );
};

export default Cookies;
