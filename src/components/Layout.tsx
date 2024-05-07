import { ReactNode, useContext } from 'react';
import { useState } from 'react';
import Header from '@components/Header';
import Modal, { ModalTypes } from '@components/Modal';
import Cookies from '@components/Cookies';
import Terms from '@components/Terms';
import Landscape from '@components/Landscape';
import Desktop from '@components/Desktop';
import { PageContext } from './Page';
import ErrorPage from '@pages/_error';

type LayoutProps = {
  backButton?: () => void;
  children: ReactNode;
  hideHeader?: boolean;
  hidelogo?: boolean;
};

const Layout = ({
  children,
  backButton,
  hideHeader,
  hidelogo
}: LayoutProps) => {
  const { cookies } = useContext(PageContext);

  return (
    <Desktop>
      <Landscape>
        {!hideHeader && <Header backButton={backButton} hidelogo={hidelogo} />}
        {children}

        {!cookies.functional && (
          <Modal type={ModalTypes.COOKIES}>
            <Cookies />
          </Modal>
        )}
        {cookies.functional && !cookies.terms && (
          <Modal type={ModalTypes.COOKIES}>
            <Terms />
          </Modal>
        )}
      </Landscape>
    </Desktop>
  );
};

export default Layout;
