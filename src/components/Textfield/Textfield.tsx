'use client';

import { DOMAttributes, forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import { tv, VariantProps } from 'tailwind-variants';

import { useComponentState } from '@/utils';

const textfieldVariants = tv({
  slots: {
    container: `group flex 
    aria-disabled:cursor-not-allowed
    aria-disabled:opacity-40 aria-readonly:pointer-events-none
    `,
    fieldContainer: `flex w-full cursor-text  items-center rounded-md border border-gray-500 shadow-sm 
      focus-within:border-primary-500 focus-within:ring focus-within:ring-primary-200 focus-within:ring-opacity-50 
      group-aria-disabled:cursor-not-allowed
      group-aria-readonly:cursor-default group-aria-invalid:border-red-500 group-aria-invalid:ring-red-200
      group-aria-invalid:ring-opacity-50
      `,
    field: `flex-grow appearance-none outline-none
      group-aria-disabled:cursor-not-allowed
    `,

    label: `
    group-aria-required:after:ml-0.5 group-aria-required:after:text-red-500 group-aria-required:after:content-['*']
    `,
    addon: 'inline-flex h-full max-h-full w-fit items-center justify-center',
  },
  variants: {
    size: {
      sm: {
        fieldContainer: 'gap-1 px-2 py-1.5 text-xs',
      },
      md: {
        fieldContainer: 'gap-1.5 px-3 py-2 text-sm',
      },
      lg: {
        fieldContainer: 'gap-2 px-4 py-2.5 text-lg',
      },
    },
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
    size: 'md',
    orientation: 'vertical',
  },
});

const { container, field, fieldContainer, label, addon } = textfieldVariants();

export interface TextfieldProps
  extends Omit<DOMAttributes<HTMLLabelElement>, 'onChange' | 'onKeyUp' | 'onKeyDown' | 'onBlur'>,
    VariantProps<typeof textfieldVariants> {
  className?: string | undefined;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isReadonly?: boolean;
  isRequired?: boolean;

  LeftAddon?: ReactNode;
  RightAddon?: ReactNode;

  name?: InputHTMLAttributes<HTMLInputElement>['name'];
  value?: InputHTMLAttributes<HTMLInputElement>['value'];
  maxLength?: InputHTMLAttributes<HTMLInputElement>['maxLength'];
  type?: InputHTMLAttributes<HTMLInputElement>['type'];
  onKeyDown?: InputHTMLAttributes<HTMLInputElement>['onKeyDown'];
  onKeyUp?: InputHTMLAttributes<HTMLInputElement>['onKeyUp'];
  onChange?: InputHTMLAttributes<HTMLInputElement>['onChange'];
  onBlur?: InputHTMLAttributes<HTMLInputElement>['onBlur'];
}

const Textfield = forwardRef<HTMLInputElement, TextfieldProps>((props, ref) => {
  const {
    children,
    size,
    orientation,
    isDisabled,
    isInvalid,
    isReadonly,
    isRequired,
    LeftAddon,
    RightAddon,
    className,
    value,
    maxLength,
    type,
    onKeyDown,
    onKeyUp,
    onChange,
    onBlur,
    name,
    ...rest
  } = props;
  const stateProps = useComponentState({ isDisabled, isInvalid, isReadonly, isRequired });
  return (
    <label className={container({ size, orientation, className })} {...stateProps} {...rest}>
      <span className={label({ size, orientation })}>{children}</span>
      <span className={fieldContainer({ size, orientation })}>
        {LeftAddon && <span className={addon({ size, orientation })}>{LeftAddon}</span>}
        <input
          className={field({ size, orientation })}
          name={name}
          value={value}
          maxLength={maxLength}
          type={type}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          onChange={onChange}
          onBlur={onBlur}
          ref={ref}
          {...stateProps}
        ></input>
        {RightAddon && <span className={addon({ size, orientation })}>{RightAddon}</span>}
      </span>
    </label>
  );
});

export default Textfield;
