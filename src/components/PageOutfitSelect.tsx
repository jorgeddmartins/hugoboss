import { useMemo, useState } from 'react';
import Link from 'next/link';

import Layout from '@components/Layout';
import Button, { ButtonTypes } from '@components/Button';
import Modal, { ModalTypes } from '@components/Modal';
import CarouselOutfit, {
  CarouselOutfitProps
} from '@components/CarouselOutfit';

import type { Avatar, Outfit } from './PageOutfit';

import s from './PageOutfitSelect.module.scss';

import { ReactComponent as Swipe } from '@assets/img/swipe.svg';
import outfitImages from '../assets/img/outfits';

type PageOutfitSelectProps = {
  avatar: Avatar;
  outfit: Outfit;
  blocked?: boolean;
  selectOutfit: (key: keyof Outfit, id: string) => Promise<void>;
  acceptOutfit: () => Promise<void>;
  goBack: () => void;
};

const PageOutfitSelect = ({
  avatar,
  acceptOutfit,
  goBack,
  outfit,
  blocked,
  selectOutfit
}: PageOutfitSelectProps) => {
  const [isClosed, setIsClosed] = useState(true);

  const outfits = useMemo<{
    top: CarouselOutfitProps['outfits'];
    bottom: CarouselOutfitProps['outfits'];
  }>(() => {
    return avatar === 'm' ? outfitImages.male : outfitImages.female;
  }, [avatar]);

  return (
    <Layout backButton={goBack}>
      <section className={s.wrap}>
        <span className={s.title}>Select your outfit</span>
        <span className={s.subTitle}>
          Look up at the shop window to see your avatar change outfits
        </span>
        <div className={s.contentWrap}>
          <div className={s.blkContent}>
            <span className={s.blkTitle}>Tops</span>
            <CarouselOutfit
              blocked={blocked}
              outfits={outfits.top}
              onUpdate={id => {
                selectOutfit('top', id);
              }}
            />
          </div>
          <div className={s.blkContent}>
            <span className={s.blkTitle}>Bottoms</span>
            <CarouselOutfit
              blocked={blocked}
              outfits={outfits.bottom}
              onUpdate={id => {
                selectOutfit('bottom', id);
              }}
            />
          </div>
          <div className={s.btnBox}>
            <Button type={ButtonTypes.BROWN} onClick={acceptOutfit}>
              Choose this look
            </Button>
          </div>
        </div>
      </section>
      {isClosed && (
        <Modal
          type={ModalTypes.OUTFIT}
          onClose={() => setIsClosed(false)}
          hasCloseButton={true}
        >
          <Swipe />
          <span className={s.swipeText}>Swipe to select outfit</span>
        </Modal>
      )}
    </Layout>
  );
};

export default PageOutfitSelect;
