import { FC } from 'react';
import s from './Checkbox.module.scss';

type CheckboxProps = {
  onChange?: () => void;
  checked?: boolean;
  disabled?: boolean;
};

const Checkbox: FC<CheckboxProps> = ({ onChange, checked, disabled }) => {
  return (
    <label className={s.wrap} onClick={onChange}>
      <input type="checkbox" disabled={disabled} checked={checked} />
      <span className={s.checkMark}></span>
    </label>
  );
};

export default Checkbox;
