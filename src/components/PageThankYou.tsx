import Layout from '@components/Layout';
import Button, { ButtonTypes } from '@components/Button';

import s from './PageThankYou.module.scss';

type pageThankYouProps = {
  showDiscount: () => void;
};

const PageThankYou = ({ showDiscount }: pageThankYouProps) => {
  return (
    <Layout hidelogo>
      <section className={s.wrap}>
        <div className={s.sectionFrame}>
          <div className={s.content}>
            <span className={s.bigTitle}>
              Thank you for creating your Boss look
            </span>
            <span className={s.smallTitle}>
              Try on your Boss Look in store!
            </span>
            <Button onClick={showDiscount} type={ButtonTypes.BROWN}>
              Collect my gift!
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PageThankYou;
