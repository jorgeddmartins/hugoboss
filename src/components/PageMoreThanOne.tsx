import Layout from '@components/Layout';
import Button, { ButtonTypes } from '@components/Button';
import s from './PageMoreThanOne.module.scss';
import { ReactComponent as Arrows } from '../assets/img/arrows.svg';

type PageMoreThanOneProps = {
  goOutfit: () => void;
};

const PageMoreThanOne = ({ goOutfit }: PageMoreThanOneProps) => {
  return (
    <Layout hideHeader>
      <section className={s.wrap}>
        <Arrows />
        <div className={s.sectionFrame}>
          <div className={s.content}>
            <span className={s.bigTitle}>Look up to the window</span>
            <span className={s.smallTitle}>
              and see the transformation of your avatar
            </span>
          </div>
          <Button type={ButtonTypes.WHITE} onClick={goOutfit}>
            Ok
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default PageMoreThanOne;
