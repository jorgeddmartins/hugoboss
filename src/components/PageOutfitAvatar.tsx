import type { Avatar } from './PageOutfit';

import Layout from '@components/Layout';
import s from './PageOutfitAvatar.module.scss';

type PageOutfitAvatarProps = {
  goBack: () => void;
  selectAvatar: (avatar: Avatar) => Promise<void>;
};

const PageOutfitAvatar = ({ selectAvatar, goBack }: PageOutfitAvatarProps) => {
  return (
    <Layout backButton={goBack}>
      <section className={s.wrap}>
        <span className={s.title}>Select your Avatar</span>
        <div className={s.contentWrap}>
          <div
            className={s.maBlock}
            onClick={() => {
              selectAvatar('m');
            }}
          >
            <span className={s.blockName}>Male</span>
          </div>
          <div
            className={s.feBlock}
            onClick={() => {
              selectAvatar('f');
            }}
          >
            <span className={s.blockName}>Female</span>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PageOutfitAvatar;
