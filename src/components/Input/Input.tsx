'use client';
import { cx, sva } from '@styled-system/css';
import { RecipeVariantProps } from '@styled-system/types';
import { forwardRef, HTMLAttributes } from 'react';

import { useComponentState } from '@/hooks';

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
      _readOnly: {
        pointerEvents: 'none',
      },
      _invalid: {
        borderColor: 'invalid',
        _focus: {
          borderColor: 'invalid',
          boxShadow: 'none',
        },
      },
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
      sm: { root: { px: '2.5', h: '9', minW: '9', fontSize: 'sm' } },
      md: { root: { px: '3', h: '10', minW: '10', fontSize: 'md' } },
      lg: { root: { px: '3.5', h: '11', minW: '11', fontSize: 'md' } },
    },
  },
});

export type InputProps = HTMLAttributes<HTMLInputElement> &
  RecipeVariantProps<typeof inputVariants> & {
    className?: string | undefined;
    isDisabled?: boolean;
    isInvalid?: boolean;
    isReadonly?: boolean;
  };

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, size, colorScheme, isDisabled, isInvalid, isReadonly, ...rest } = props;
  const formControlProps = useComponentState({ isDisabled, isInvalid, isReadonly });

  const { root } = inputVariants({ size, colorScheme });
  return <input ref={ref} className={cx(root, className)} {...formControlProps} {...rest}></input>;
});
Input.displayName = 'Input';

export default Input;
