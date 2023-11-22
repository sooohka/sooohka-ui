'use client';
import { cx, sva } from '@styled-system/css';
import { RecipeVariantProps } from '@styled-system/types';
import { forwardRef, HTMLAttributes } from 'react';

const inputVariants = sva({
  slots: ['root'],
  base: {
    root: {
      appearance: 'none',
      backgroundColor: 'bg.default',
      borderColor: 'border.emphasized',
      borderRadius: 'l2',
      borderWidth: '1px',
      outline: 0,
      position: 'relative',
      transitionDuration: 'normal',
      transitionProperty: 'box-shadow, border-color',
      transitionTimingFunction: 'default',
      width: 'full',
      _disabled: {
        opacity: 0.4,
        cursor: 'not-allowed',
      },
      _focus: {
        borderColor: 'border.accent',
        boxShadow: 'accent',
      },
    },
  },
  defaultVariants: {
    size: 'md',
    colorScheme: 'primary',
  },
  variants: {
    colorScheme: {
      primary: {
        root: {
          borderColor: 'accent.default',
        },
      },
    },
    size: {
      '2xs': { root: { px: '1.5', h: '7', minW: '7', fontSize: 'xs' } },
      xs: { root: { px: '2', h: '8', minW: '8', fontSize: 'xs' } },
      sm: { root: { px: '2.5', h: '9', minW: '9', fontSize: 'sm' } },
      md: { root: { px: '3', h: '10', minW: '10', fontSize: 'md' } },
      lg: { root: { px: '3.5', h: '11', minW: '11', fontSize: 'md' } },
      xl: { root: { px: '4', h: '12', minW: '12', fontSize: 'lg' } },
      '2xl': { root: { px: '2', h: '16', minW: '16', textStyle: '3xl' } },
    },
  },
});

export type InputProps = HTMLAttributes<HTMLInputElement> &
  RecipeVariantProps<typeof inputVariants> & {
    className?: string | undefined;
  };

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, size, colorScheme, ...rest } = props;
  const { root } = inputVariants({ size, colorScheme });
  return <input ref={ref} className={cx(root, className)} {...rest}></input>;
});
Input.displayName = 'Input';

export default Input;
