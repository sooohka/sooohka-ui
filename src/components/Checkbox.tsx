import { ChangeEvent, forwardRef, ReactNode } from 'react';
import { tv } from 'tailwind-variants';

import { useComponentState } from '@/utils';

import { ColorScheme, Size } from '..';

const checkbox = tv({
  slots: {
    container: 'relative disabled:cursor-not-allowed',
    control: `absolute inline-flex h-0 w-0 flex-shrink-0 select-none items-center justify-center align-top opacity-0
    after:border-red-500
    after:w-5 after:h-5 after:absolute after:left-0
    after:rotate-45 after:border-b-8 after:border-r-8 
    
  after:opacity-100
    
    `,
    label: '',
  },
  variants: {},
});

const { container, control, label } = checkbox();
interface Props {
  isDisabled?: boolean;
  isReadonly?: boolean;
  isInvalid?: boolean;
  isRequired?: boolean;
  isChecked?: boolean;
  isIndeterminate?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  colorScheme?: ColorScheme;
  children?: ReactNode;
  size?: Size;
}
const Checkbox = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { isChecked, isIndeterminate, isDisabled, isRequired, isInvalid, isReadonly, onChange } = props;
  const stateProps = useComponentState({ isDisabled, isInvalid, isReadonly, isRequired });
  return (
    <label className={container()}>
      <input ref={ref} className={control()} type="checkbox" {...stateProps} checked={isChecked} onChange={onChange}></input>
      <span className={label()}>hi</span>
    </label>
  );
});

export default Checkbox;
