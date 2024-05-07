import Image, { StaticImageData } from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';
import s from './CarouselOutfit.module.scss';

export type CarouselOutfitProps = {
  outfits: {
    id: string;
    images: {
      active: StaticImageData;
      regular: StaticImageData;
    };
  }[];
  onUpdate: (id: string) => void;
  blocked?: boolean;
};

const CarouselOutfit = ({
  outfits,
  onUpdate,
  blocked
}: CarouselOutfitProps) => {
  return (
    <Swiper
      slidesPerView={'auto'}
      spaceBetween={0}
      centeredSlides={true}
      loop={false}
      modules={[Pagination]}
      className={s.container}
      onSlideChange={swiper => {
        if (onUpdate) {
          onUpdate(outfits[swiper.activeIndex].id);
        }
      }}
      enabled={!blocked}
    >
      {outfits.map(outfit => (
        <SwiperSlide key={outfit.id}>
          <div className={s.outfit}>
            <Image alt="" src={outfit.images.regular} fill />
            <Image alt="" src={outfit.images.active} fill />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CarouselOutfit;
