import QRCode from 'react-qr-code';

import s from './Desktop.module.scss';

type DesktopProps = {
  children: React.ReactNode;
};

const Desktop = ({ children }: DesktopProps) => {
  return (
    <>
      <div className={s.fallback}>
        <div className={s.content}>
          <div className={s.qrContent}>
            <div className={s.qrBorder}>
              <QRCode
                value={window.location.href}
                size={200}
                bgColor="#fff"
                fgColor="#000"
              />
            </div>
          </div>
          <span className={s.title}>Experience on Mobile</span>
          <span className={s.subTitle}>
            Scan the QR code to participate in the experience
          </span>
        </div>
      </div>
      <div className={s.mobile}>{children}</div>
    </>
  );
};

export default Desktop;
