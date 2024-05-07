import { useCallback, useState, useEffect } from 'react';
import s from './Landscape.module.scss';
import useMobileDetect from '@hooks/useMobileDetect';

type LandscapeProps = {
  children: React.ReactNode;
};

const Landscape = ({ children }: LandscapeProps) => {
  const isMobileDevice = useMobileDetect();
  const [isMobileLandscape, setIsMobileLandscape] = useState(false);

  useEffect(() => {
    const detect = () => {
      setIsMobileLandscape(
        isMobileDevice &&
          typeof window !== 'undefined' &&
          window.matchMedia('screen and (orientation:landscape)').matches
      );
    };

    window.addEventListener('resize', detect);

    return () => {
      window.removeEventListener('resize', detect);
    };
  });

  if (isMobileLandscape) {
    return (
      <div className={s.wrap}>
        <div className={s.content}>
          <span className={s.title}>ROTATE YOUR PHONE</span>
          <span className={s.subTitle}>
            Flip your device portrait to continue
          </span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default Landscape;
