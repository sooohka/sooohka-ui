import { ReactNode } from 'react';
import { tv } from 'tailwind-variants';

import { useComponentState } from '@/utils';

import { ColorScheme, Size } from '..';
interface Props {}

const button = tv({
  base: 'flex flex-shrink-0 items-center justify-center gap-1 rounded-lg text-xl font-normal leading-none disabled:cursor-not-allowed',
  variants: {
    variant: {
      solid: '',
      outline: 'border-1 border-solid ',
      icon: '',
    },
    size: {
      md: 'px-5 py-3',
    },
    colorScheme: {
      primary: 'bg-primary-500 text-white  hover:bg-primary-600 active:bg-primary-700 disabled:bg-primary-200',
    },
  },
  compoundVariants: [
    {
      colorScheme: 'primary',
      variant: 'outline',
      class: 'border-primary-500 bg-inherit text-primary-500 hover:bg-primary-100 active:bg-primary-200 disabled:bg-inherit disabled:opacity-40',
    },
    {
      size: 'md',
      variant: 'icon',
      class: 'h-12 w-12 p-3',
    },
  ],
  defaultVariants: {
    colorSchema: 'primary',
    size: 'md',
    variant: 'solid',
  },
});

interface Props {
  isDisabled?: boolean;
  size?: Size;
  variant?: 'solid' | 'outline' | 'icon';
  colorScheme?: ColorScheme;
  children?: ReactNode;
}

const Button = (props: Props) => {
  const { colorScheme, size, variant, isDisabled, children } = props;
  const stateProps = useComponentState({ isDisabled });
  return (
    <button {...stateProps} className={button({ colorScheme, size, variant })}>
      {children}
    </button>
  );
};

export default Button;
