'use client';
import { DOMAttributes, forwardRef, ReactNode, SelectHTMLAttributes } from 'react';
import { tv, VariantProps } from 'tailwind-variants';

import { useComponentState } from '@/utils';

const selectVariants = tv({
  slots: {
    container: `group flex items-center rounded-md border border-gray-500 shadow-sm 
      focus-within:border-primary-500 focus-within:ring focus-within:ring-primary-200 focus-within:ring-opacity-50
      aria-disabled:cursor-not-allowed aria-disabled:opacity-40
      aria-readonly:pointer-events-none aria-readonly:select-none
      aria-invalid:border-red-500 aria-invalid:ring-red-200 aria-invalid:ring-opacity-50
    `,
    field: `flex w-full  outline-none
      group-aria-disabled:cursor-not-allowed
    `,
    addon: '',
  },
  variants: {
    size: {
      sm: {
        container: 'gap-1 px-2 py-1.5 text-xs',
      },
      md: {
        container: 'gap-1.5 px-3 py-2 text-sm',
      },
      lg: {
        container: 'gap-2 px-4 py-2.5 text-lg',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const { container, field, addon } = selectVariants();
export interface SelectProps
  extends Omit<DOMAttributes<HTMLDivElement>, 'onChange' | 'onKeyUp' | 'onKeyDown' | 'onBlur'>,
    VariantProps<typeof selectVariants> {
  className?: string | undefined;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isReadonly?: boolean;
  isRequired?: boolean;

  children: ReactNode;

  LeftAddon?: ReactNode;

  name?: SelectHTMLAttributes<HTMLSelectElement>['name'];
  value?: SelectHTMLAttributes<HTMLSelectElement>['value'];
  onKeyDown?: SelectHTMLAttributes<HTMLSelectElement>['onKeyDown'];
  onKeyUp?: SelectHTMLAttributes<HTMLSelectElement>['onKeyUp'];
  onChange?: SelectHTMLAttributes<HTMLSelectElement>['onChange'];
  onBlur?: SelectHTMLAttributes<HTMLSelectElement>['onBlur'];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
  const {
    className,
    children,
    LeftAddon,
    size,
    name,
    value,
    onKeyDown,
    onKeyUp,
    onChange,
    onBlur,
    isDisabled,
    isInvalid,
    isReadonly,
    isRequired,
    ...rest
  } = props;
  const stateProps = useComponentState({ isDisabled, isInvalid, isReadonly, isRequired });
  return (
    <div className={container({ size, className })} {...stateProps} {...rest}>
      <span className={addon({ size })}>{LeftAddon}</span>
      <select
        ref={ref}
        className={field({ size })}
        name={name}
        value={value}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onChange={onChange}
        onBlur={onBlur}
        tabIndex={isReadonly ? -1 : undefined}
        {...stateProps}
      >
        {children}
      </select>
    </div>
  );
});

export default Select;
