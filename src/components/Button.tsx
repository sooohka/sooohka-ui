import * as React from 'react';
import { tv, VariantProps } from 'tailwind-variants';

import { useComponentState } from '@/utils';

const buttonVariants = tv({
  base: 'inline-flex select-none items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50',
  variants: {
    variant: {
      solid: 'shadow-sm',
      outline: 'border-1  bg-transparent shadow-sm',
      ghost: 'disabled:hover:bg-inherit',
      link: 'text-primary underline-offset-4 hover:underline disabled:no-underline',
    },
    size: {
      sm: 'h-8 rounded-md px-3 text-xs',
      md: 'h-9 px-4 py-2',
      lg: 'h-10 rounded-md px-8',
      icon: 'h-9 w-9 p-2',
    },
    colorScheme: {
      primary: '',
      secondary: '',
    },
  },
  compoundVariants: [
    {
      colorScheme: 'primary',
      variant: 'solid',
      class: 'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 disabled:hover:bg-primary-500',
    },
    {
      colorScheme: 'primary',
      variant: 'outline',
      class: 'border-primary-300 text-primary-500 hover:border-primary-500 active:border-primary-700 active:shadow-primary-50 disabled:hover:border-primary-300',
    },
    {
      colorScheme: 'primary',
      variant: 'ghost',
      class: 'text-primary-500 hover:bg-primary-50 active:bg-primary-100',
    },
    {
      colorScheme: 'primary',
      variant: 'link',
      class: 'text-primary-500',
    },
  ],
  defaultVariants: {
    variant: 'solid',
    size: 'md',
    colorScheme: 'primary',
  },
});

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  isDisabled?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { className, variant, colorScheme, isDisabled, size, ...rest } = props;
  const stateProps = useComponentState({ isDisabled });
  return <button className={buttonVariants({ variant, size, colorScheme, className })} ref={ref} {...stateProps} {...rest} />;
});
Button.displayName = 'Button';

export default Button;
