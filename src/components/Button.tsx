import { FC } from 'react';
import cx from 'classnames';
import s from './Button.module.scss';

export enum ButtonTypes {
  WHITE = 'white',
  BROWN = 'brown',
  GREY_BORDER = 'greyBorder',
  WHITE_BORDER = 'whiteBorder',
  DISABLED = 'disabled'
}

interface BaseProps {
  children: React.ReactNode;
  onClick?: () => void;
  type: ButtonTypes;
  className?: string;
}

export type ButtonProps = BaseProps;

const Button: FC<ButtonProps> = ({ children, onClick, className, type }) => {
  const buttonStyles = cx(
    {
      [s.button]: true,
      [s.white]: type === ButtonTypes.WHITE,
      [s.brown]: type === ButtonTypes.BROWN,
      [s.greyBorder]: type === ButtonTypes.GREY_BORDER,
      [s.whiteBorder]: type === ButtonTypes.WHITE_BORDER,
      [s.disabled]: type === ButtonTypes.DISABLED
    },
    className
  );

  return (
    <button className={buttonStyles} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
