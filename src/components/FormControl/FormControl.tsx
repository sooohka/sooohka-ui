'use client';

import { DOMAttributes, forwardRef } from 'react';
import { tv, VariantProps } from 'tailwind-variants';

import { useComponentState } from '@/utils';
import { UseComponentStateProps } from '@/utils/useComponentState';

const formControlVariants = tv({
  slots: {
    container: `group flex 
    aria-disabled:cursor-not-allowed aria-disabled:opacity-40 
    aria-readonly:pointer-events-none
    `,
    label: `
    group-aria-required:after:ml-0.5 group-aria-required:after:text-red-500 group-aria-required:after:content-['*']
    `,
  },
  variants: {
    orientation: {
      horizontal: {
        container: `flex-row items-center gap-4`,
      },
      vertical: {
        container: `flex-col gap-2`,
      },
    },
  },
  defaultVariants: {
    orientation: 'vertical',
  },
});
const { container, label } = formControlVariants();
export interface TextfieldProps
  extends Omit<DOMAttributes<HTMLLabelElement>, 'onChange' | 'onKeyUp' | 'onKeyDown' | 'onBlur' | 'children'>,
    VariantProps<typeof formControlVariants> {
  label?: string;
  className?: string;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isReadonly?: boolean;
  isRequired?: boolean;

  children: (data: UseComponentStateProps) => JSX.Element;
}

const FormControl = forwardRef<HTMLLabelElement, TextfieldProps>((props, ref) => {
  const {
    className,
    orientation,
    children,
    label: labelText,
    isDisabled,
    isInvalid,
    isReadonly,
    isRequired,
    ...rest
  } = props;
  const stateProps = useComponentState({ isDisabled, isInvalid, isReadonly, isRequired });

  return (
    <label ref={ref} className={container({ orientation, className })} {...stateProps} {...rest}>
      <span className={label({ orientation, className })}>{labelText}</span>
      {children({})}
    </label>
  );
});

export default FormControl;
