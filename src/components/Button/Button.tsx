'use client';
import { cva, cx } from '@styled-system/css';
import { RecipeVariantProps } from '@styled-system/types';
import { forwardRef, HTMLAttributes } from 'react';

import { useComponentState } from '@/hooks';

export const button = cva({
  base: {
    alignItems: 'center',
    appearance: 'none',
    borderRadius: 'l2',
    cursor: 'pointer',
    display: 'inline-flex',
    fontWeight: 'semibold',
    minWidth: '0',
    justifyContent: 'center',
    outline: 'none',
    transitionDuration: 'normal',
    transitionProperty: 'background, border-color, color, box-shadow',
    transitionTimingFunction: 'default',
    userSelect: 'none',
    verticalAlign: 'middle',
    whiteSpace: 'nowrap',
  },
  variants: {
    variant: {
      solid: {
        background: 'accent.default',
        color: 'accent.fg',
        _hover: {
          background: 'accent.emphasized',
        },
        _focusVisible: {
          outlineOffset: '2px',
          outlineStyle: 'solid',
          outlineWidth: '2px',
          outlineColor: 'border.accent',
        },
        _disabled: {
          color: 'fg.disabled',
          background: 'gray.a3',
          cursor: 'not-allowed',
          _hover: {
            color: 'fg.disabled',
            background: 'gray.a3',
          },
        },
      },
      outline: {
        borderWidth: '1px',
        borderColor: 'border.default',
        _hover: {
          background: 'gray.a2',
        },
        _disabled: {
          borderColor: 'border.disabled',
          color: 'fg.disabled',
          cursor: 'not-allowed',
          _hover: {
            background: 'transparent',
            borderColor: 'border.disabled',
            color: 'fg.disabled',
          },
        },
        _focusVisible: {
          outlineOffset: '2px',
          outline: '2px solid',
          outlineColor: 'border.outline',
        },
        _selected: {
          background: 'gray.a3',
        },
      },
      ghost: {
        color: 'fg.default',
        _hover: {
          background: 'gray.a3',
        },
        _selected: {
          background: 'gray.a3',
        },
        _disabled: {
          color: 'fg.disabled',
          cursor: 'not-allowed',
          _hover: {
            background: 'transparent',
            color: 'fg.disabled',
          },
        },
        _focusVisible: {
          outline: '2px solid',
          outlineColor: 'border.outline',
        },
      },
      link: {
        verticalAlign: 'baseline',
        _hover: {
          textDecoration: 'underline',
        },
        _disabled: {
          color: 'border.disabled',
          cursor: 'not-allowed',
          _hover: {
            color: 'border.disabled',
          },
        },
        height: 'auto!',
        px: '0!',
        minW: '0!',
      },
    },
    size: {
      sm: {
        h: '9',
        minW: '9',
        textStyle: 'sm',
        px: '3.5',
        gap: '2',
        '& svg': {
          width: '4',
          height: '4',
        },
      },
      md: {
        h: '10',
        minW: '10',
        textStyle: 'sm',
        px: '4',
        gap: '2',
        '& svg': {
          width: '5',
          height: '5',
        },
      },
      lg: {
        h: '11',
        minW: '11',
        textStyle: 'md',
        px: '4.5',
        gap: '2',
        '& svg': {
          width: '5',
          height: '5',
        },
      },
    },
  },
  defaultVariants: {
    variant: 'solid',
    size: 'md',
  },
});

export type ButtonProps = HTMLAttributes<HTMLButtonElement> &
  RecipeVariantProps<typeof button> & {
    className?: string;
    isDisabled?: boolean;
  };

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { className, size, isDisabled, variant, ...rest } = props;
  const styles = button({ size, variant });
  const formControlProps = useComponentState({ isDisabled });
  return <button ref={ref} className={cx(styles, className)} {...formControlProps} {...rest}></button>;
});
Button.displayName = 'Button';

export default Button;
