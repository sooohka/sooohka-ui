'use client';

import { DOMAttributes, forwardRef, InputHTMLAttributes } from 'react';
import { tv, VariantProps } from 'tailwind-variants';

import { useComponentState } from '@/hooks';

const radioVariants = tv({
  slots: {
    container: `group/radio inline-flex items-center 
      aria-disabled:cursor-not-allowed aria-disabled:opacity-40
      aria-readonly:pointer-events-none`,
    label: `font-medium
    group-aria-invalid/radio:text-red-500`,
    controlContainer: 'relative flex cursor-pointer items-center rounded-full',
    control: `
      before:content[''] relative appearance-none rounded-full border border-gray-300 text-primary-600
      shadow-sm transition-all duration-150 before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-white 
    group-aria-invalid/radio:border-red-500 group-aria-invalid/radio:text-red-500`,
  },
  variants: {
    colorScheme: {
      primary: {
        label: 'text-primary-500',
        control: `border-primary-500 text-primary-500 
        checked:border-primary-500 checked:bg-primary-500
        `,
      },
      secondary: {},
    },
    size: {
      sm: { container: 'gap-1', control: 'h-3 w-3 before:h-1.5 before:w-1.5 ', label: 'text-xs' },
      md: { container: 'gap-1.5', control: 'h-4 w-4 before:h-2 before:w-2 ', label: 'text-sm' },
      lg: { container: 'gap-2', control: 'h-5 w-5 before:h-2.5 before:w-2.5 ', label: 'text-lg' },
    },
  },
  defaultVariants: {
    colorScheme: 'primary',
    size: 'lg',
  },
});
const { container, label, controlContainer, control } = radioVariants();

export interface RadioProps
  extends Omit<DOMAttributes<HTMLLabelElement>, 'onChange' | 'onKeyUp' | 'onKeyDown' | 'onBlur'>,
    VariantProps<typeof radioVariants> {
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
const Radio = forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
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
          type="radio"
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
      </div>
      <span className={label({ size, colorScheme })}>{children}</span>
    </label>
  );
});
Radio.displayName = 'Radio';

export default Radio;
