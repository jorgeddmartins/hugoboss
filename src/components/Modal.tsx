import cx from 'classnames';
import s from './Modal.module.scss';
import { ReactComponent as Close } from '../assets/img/close.svg';

export enum ModalTypes {
  HELP = 'help',
  COOKIES = 'cookies',
  OUTFIT = 'outfit'
}

type ModalProps = {
  children: React.ReactNode;
  onClose?: () => void;
  type: ModalTypes;
  className?: string;
  hasCloseButton?: boolean;
};

const Modal = ({
  children,
  className,
  type,
  onClose,
  hasCloseButton
}: ModalProps) => {
  const modalStyles = cx(
    {
      [s.wrap]: true,
      [s.help]: type === ModalTypes.HELP,
      [s.cookies]: type === ModalTypes.COOKIES,
      [s.outfit]: type === ModalTypes.OUTFIT
    },
    className
  );

  return (
    <div className={modalStyles}>
      <div className={s.contentWrap}>
        {hasCloseButton && <Close className={s.closeBtn} onClick={onClose} />}
        {children}
      </div>
    </div>
  );
};

export default Modal;
