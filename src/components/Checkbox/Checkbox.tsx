'use client';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { DOMAttributes, forwardRef, InputHTMLAttributes } from 'react';
import { tv, VariantProps } from 'tailwind-variants';

import { useComponentState } from '@/utils';

const checkboxVariants = tv({
  slots: {
    container: `group/checkbox inline-flex items-center 
      aria-disabled:cursor-not-allowed aria-disabled:opacity-40
      aria-readonly:pointer-events-none`,
    label: `font-medium
    group-aria-invalid/checkbox:text-red-500`,
    controlContainer: 'relative flex cursor-pointer items-center rounded-full',
    control: `before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none border transition-all duration-150 
      group-aria-invalid/checkbox:border-red-500 group-aria-invalid/checkbox:text-red-500`,
    indicator: `pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100`,
    indicatorIcon: '',
  },
  variants: {
    colorScheme: {
      primary: {
        label: 'text-primary-500',
        control: `border-primary-500 text-primary-500 
        checked:border-primary-500 checked:bg-primary-500 checked:before:bg-primary-500
        `,
      },
      secondary: {},
    },
    size: {
      sm: { container: 'gap-1', control: 'h-3 w-3 rounded-[0.2rem] ', label: 'text-xs', indicatorIcon: 'h-3 w-3' },
      md: { container: 'gap-1.5', control: 'h-4 w-4 rounded-[0.3rem]', label: 'text-sm', indicatorIcon: 'h-3.5 w-3.5' },
      lg: { container: 'gap-2', control: 'h-5 w-5 rounded-md', label: 'text-lg', indicatorIcon: 'h-4 w-4' },
    },
  },
  defaultVariants: {
    colorScheme: 'primary',
    size: 'lg',
  },
});
const { container, label, controlContainer, indicator, indicatorIcon, control } = checkboxVariants();

export interface CheckboxProps
  extends Omit<DOMAttributes<HTMLLabelElement>, 'onChange' | 'onKeyUp' | 'onKeyDown' | 'onBlur'>,
    VariantProps<typeof checkboxVariants> {
  className?: string | undefined;
  children: React.ReactNode;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isReadonly?: boolean;

  name?: InputHTMLAttributes<HTMLInputElement>['name'];
  value?: InputHTMLAttributes<HTMLInputElement>['value'];
  checked?: InputHTMLAttributes<HTMLInputElement>['checked'];
  onKeyDown?: InputHTMLAttributes<HTMLInputElement>['onKeyDown'];
  onKeyUp?: InputHTMLAttributes<HTMLInputElement>['onKeyUp'];
  onChange?: InputHTMLAttributes<HTMLInputElement>['onChange'];
  onBlur?: InputHTMLAttributes<HTMLInputElement>['onBlur'];
}
const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const {
    size,
    colorScheme,
    className,
    children,
    isDisabled,
    isInvalid,
    isReadonly,

    checked,
    name,
    value,
    onKeyDown,
    onKeyUp,
    onChange,
    onBlur,

    ...rest
  } = props;
  const stateProps = useComponentState({ isDisabled, isInvalid, isReadonly });
  return (
    <label {...stateProps} className={container({ size, colorScheme, className })} {...rest}>
      <div className={controlContainer({ size, colorScheme })}>
        <input
          ref={ref}
          type="checkbox"
          name={name}
          value={value}
          checked={checked}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          onChange={onChange}
          onBlur={onBlur}
          tabIndex={isReadonly ? -1 : undefined}
          className={control({ size, colorScheme })}
          {...stateProps}
        />
        <div className={indicator({ size, colorScheme })}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={indicatorIcon({ size, colorScheme })}
            viewBox="0 0 20 20"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
      </div>
      <span className={label({ size, colorScheme })}>{children}</span>
    </label>
  );
});
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export default Checkbox;
