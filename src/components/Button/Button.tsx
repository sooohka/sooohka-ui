import { ComponentType, DOMAttributes, forwardRef, SVGAttributes } from 'react';
import { tv, VariantProps } from 'tailwind-variants';

import { useComponentState } from '@/hooks';

const buttonVariants = tv({
  slots: {
    button: `inline-flex items-center rounded-lg text-center text-sm font-medium outline-none transition-colors duration-150
    focus:ring focus:ring-primary-200
    disabled:cursor-not-allowed disabled:opacity-40`,
    icon: '',
  },
  variants: {
    variant: {
      solid: { button: 'border shadow-sm' },
      outline: { button: 'border shadow-sm' },
      ghost: { button: 'border-none shadow-none' },
      link: { button: 'border-none underline-offset-4 shadow-none hover:underline disabled:no-underline' },
    },
    size: {
      sm: { button: 'gap-1 px-3 py-1.5 text-xs', icon: 'h-3 w-3' },
      md: { button: 'gap-1.5 px-4 py-2 text-sm ', icon: 'h-4 w-4' },
      lg: { button: 'gap-2 px-4 py-2.5 text-lg ', icon: 'h-5 w-5' },
      icon: { button: 'h-9 w-9 p-2' },
    },
    colorScheme: {
      primary: 'red',
      secondary: { button: '' },
    },
  },
  compoundVariants: [
    {
      colorScheme: 'primary',
      variant: 'solid',
      class: {
        button: `bg-primary-500 text-white
        hover:bg-primary-600
      active:bg-primary-700
      disabled:hover:bg-primary-500`,
      },
    },
    {
      colorScheme: 'primary',
      variant: 'outline',
      class: {
        button: `border-primary-300 text-primary-500
        hover:border-primary-500
        active:border-primary-700 active:shadow-primary-50
        disabled:hover:border-primary-300`,
      },
    },
    {
      colorScheme: 'primary',
      variant: 'ghost',
      class: {
        button: `text-primary-500
        hover:bg-primary-50
        active:bg-primary-100
        disabled:hover:bg-inherit`,
      },
    },
    {
      colorScheme: 'primary',
      variant: 'link',
      class: {
        button: 'text-primary-500',
      },
    },
  ],
});

const { button, icon } = buttonVariants();

export interface ButtonProps extends DOMAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  isDisabled?: boolean;
  className?: string | undefined;
  LeftIcon?: ComponentType<SVGAttributes<HTMLOrSVGElement>>;
  RightIcon?: ComponentType<SVGAttributes<HTMLOrSVGElement>>;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    className,
    variant = 'solid',
    colorScheme = 'primary',
    isDisabled,
    size = 'md',
    children,
    LeftIcon,
    RightIcon,
    ...rest
  } = props;
  const stateProps = useComponentState({ isDisabled });
  return (
    <>
      <button className={button({ variant, size, colorScheme, className })} ref={ref} {...stateProps} {...rest}>
        {LeftIcon && <LeftIcon className={icon({ variant, colorScheme, size })}></LeftIcon>}
        {children}
        {RightIcon && <RightIcon className={icon({ variant, colorScheme, size })}></RightIcon>}
      </button>
    </>
  );
});
Button.displayName = 'Button';

export default Button;
