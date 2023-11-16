import { css, RecipeVariantProps } from '@styled-system/css';
import { sva } from '@styled-system/css';
import { ComponentType, DOMAttributes, forwardRef, SVGAttributes } from 'react';

import { useComponentState } from '@/hooks';

export const buttonVariants = sva({
  slots: ['button', 'icon'],
  base: {
    button: {
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      rounded: 'lg',
      textAlign: 'center',
      fontSize: 'sm',
      lineHeight: '1.5',
      fontWeight: 'medium',
      borderRadius: 'md',
      ring: 'none',
      ringOffset: 'none',
      transitionProperty: 'color, background-color, border-color, text-decoration-color, fill, stroke',
      transitionDuration: '150ms',
      _focus: { shadow: 'ring' },
      _disabled: { cursor: 'not-allowed', opacity: '0.4' },
    },
    icon: {},
  },
  variants: {
    variant: {
      solid: { button: { borderWidth: '1px', shadow: 'sm' } },
      outline: { button: { borderWidth: '1px', shadow: 'none' } },
      ghost: { button: { borderStyle: 'none', shadow: 'none' } },
      link: {
        button: {
          borderStyle: 'none',
          textUnderlineOffset: '4px',
          shadow: 'none',
          _hover: { textDecorationLine: 'underline', _disabled: { textDecorationLine: 'none' } },
          _disabled: { textDecorationLine: 'none' },
        },
      },
    },
    size: {
      sm: {
        button: { gap: '1', pl: '3', pr: '3', pt: '1.5', pb: '1.5', fontSize: 'xs' },
        icon: { h: '3', w: '3' },
      },
      md: {
        button: {
          gap: '1.5',
          pl: '4',
          pr: '4',
          pt: '2',
          pb: '2',
          fontSize: 'sm',
        },
        icon: { h: '4', w: '4' },
      },
      lg: {
        button: { gap: '2', pl: '4', pr: '4', pt: '2.5', pb: '2.5', fontSize: 'lg' },
        icon: { h: '5', w: '5' },
      },
      icon: { button: { h: '9', w: '9', p: '2' } },
    },
    colorScheme: {
      primary: {
        button: {},
        icon: {},
      },
    },
  },

  compoundVariants: [
    {
      colorScheme: 'primary',
      variant: 'solid',
      css: {
        button: {
          bgColor: 'primary.500',
          color: 'white',
          _hover: { bgColor: 'primary.600', _disabled: { bgColor: 'primary.500' } },
          _active: { bgColor: 'primary.700' },
          _disabled: { bgColor: 'primary.500' },
        },
      },
    },
    {
      colorScheme: 'primary',
      variant: 'outline',
      css: {
        button: {
          borderColor: 'primary.300',
          color: 'primary.500',
          _hover: { borderColor: 'primary.500', _disabled: { borderColor: 'primary.300' } },
          _active: { borderColor: 'primary.700', shadow: 'primary.50' },
          _disabled: { borderColor: 'primary.300' },
        },
      },
    },
    {
      colorScheme: 'primary',
      variant: 'ghost',
      css: {
        button: {
          color: 'primary.500',
          _hover: { bgColor: 'primary.50', _disabled: { bgColor: 'inherit' } },
          _active: { bgColor: 'primary.100' },
          _disabled: { bgColor: 'inherit' },
        },
      },
    },
    {
      colorScheme: 'primary',
      variant: 'link',
      css: {
        button: { color: 'primary.500' },
      },
    },
  ],
  defaultVariants: {
    size: 'md',
    colorScheme: 'primary',
    variant: 'solid',
  },
});

export type ButtonProps = DOMAttributes<HTMLButtonElement> &
  RecipeVariantProps<typeof buttonVariants> & {
    isDisabled?: boolean;
    LeftIcon?: ComponentType<SVGAttributes<HTMLOrSVGElement>>;
    RightIcon?: ComponentType<SVGAttributes<HTMLOrSVGElement>>;
  };

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { variant, colorScheme, isDisabled, size, children, LeftIcon, RightIcon, ...rest } = props;
  const { button, icon } = buttonVariants.raw({ colorScheme, size, variant });
  const stateProps = useComponentState({ isDisabled });
  return (
    <>
      <button className={css(button)} ref={ref} {...stateProps} {...rest}>
        {LeftIcon && <LeftIcon className={css(icon, {})}></LeftIcon>}
        {children}
        {RightIcon && <RightIcon className={css(icon, {})}></RightIcon>}
      </button>
    </>
  );
});
Button.displayName = 'Button';

export default Button;
