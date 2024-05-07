import { useState } from 'react';
import { useRouter } from 'next/router';
import s from './Header.module.scss';
import { ReactComponent as Logo } from '../assets/img/logo.svg';
import { ReactComponent as Help } from '../assets/img/help.svg';
import { ReactComponent as Back } from '../assets/img/back.svg';
import Modal, { ModalTypes } from '@components/Modal';
import ModalHelp from '@components/ModalHelp';

type HeaderProps = {
  backButton: () => void;
  hidelogo: boolean;
};

const Header = ({ backButton, hidelogo }: HeaderProps) => {
  const [isOpen, setIsopen] = useState(false);
  const openModal = () => {
    setIsopen(!isOpen);
  };
  const { pathname } = useRouter();
  const router = useRouter();

  return (
    <>
      <header className={s.header}>
        <nav className={s.nav}>
          {backButton && <Back className={s.backIcon} onClick={backButton} />}
          {!backButton && !hidelogo && <Logo />}
          <Help className={s.helpIcon} onClick={openModal} />
        </nav>
      </header>
      {isOpen && (
        <Modal type={ModalTypes.HELP} hasCloseButton={true} onClose={openModal}>
          <ModalHelp />
        </Modal>
      )}
    </>
  );
};

export default Header;
