import { useContext, useState } from 'react';
import Button, { ButtonTypes } from '@components/Button';
import Checkbox from '@components/Checkbox';
import Privacy from '@components/Privacy';
import { PageContext } from '@components/Page';

import s from './Terms.module.scss';

const Terms = () => {
  const { cookies } = useContext(PageContext);
  const [readFullTerms, setReadFullTerms] = useState<boolean>(false);

  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <section className={s.wrap}>
      <h2 className={s.title}>Terms and Conditions</h2>

      {!readFullTerms ? (
        <div>
          <p className={s.paragraph}>
            Read the Terms and Conditions of the site{' '}
            <span
              onClick={() => {
                setReadFullTerms(true);
              }}
            >
              here
            </span>
          </p>
          <div className={s.content}>
            <Checkbox checked={isActive} onChange={() => setIsActive(true)} />
            <p className={s.contentParagraph}>
              I have read the above rules carefully, I fully understand this
              content, and voluntarily agree to it’s terms
            </p>
          </div>
          <p className={s.settingsParagraph}>
            By agreeing to this experience you accept our{' '}
            <div
              className={s.privacyLink}
              onClick={() => {
                setReadFullTerms(true);
              }}
            >
              Terms and Conditions
            </div>
            .
          </p>
          <Button
            type={isActive ? ButtonTypes.BROWN : ButtonTypes.DISABLED}
            onClick={() => {
              cookies.setAccepted('terms', true);
            }}
          >
            Yes, I accept
          </Button>
        </div>
      ) : (
        <Privacy
          onClose={() => {
            setReadFullTerms(false);
          }}
        />
      )}
    </section>
  );
};

export default Terms;
