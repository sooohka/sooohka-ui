'use client';
import { Checkbox as ArkCheckbox } from '@ark-ui/react';
import { UseCheckboxProps } from '@ark-ui/react/checkbox/use-checkbox';
import { cx, sva } from '@styled-system/css';
import { RecipeVariantProps } from '@styled-system/types';
import { CheckIcon, MinusIcon } from 'lucide-react';
import { forwardRef, ReactNode } from 'react';

import { useComponentState } from '@/hooks';

const checkboxVariants = sva({
  slots: ['root', 'label', 'control'],
  base: {
    root: {
      width: 'fit-content',
      alignItems: 'center',
      display: 'flex',
      _disabled: {
        opacity: '0.4',
      },
    },
    label: {
      color: 'text',
      fontWeight: 'medium',
    },
    control: {
      alignItems: 'center',
      borderColor: 'border',
      borderWidth: '1px',
      borderStyle: 'solid',
      color: 'white',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'center',
      transitionDuration: 'normal',
      transitionProperty: 'border-color, background',
      transitionTimingFunction: 'default',
      _hover: {
        background: 'gray.100',
      },
      _checked: {
        background: 'primary',
        borderColor: 'border.primary',
        _hover: {
          background: 'primary.hover',
        },
      },
      _disabled: {
        cursor: 'not-allowed',
        _hover: {
          background: 'primary',
        },
      },
      _groupInvalid: {
        borderColor: 'danger',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
  variants: {
    size: {
      sm: {
        root: {
          gap: '2',
        },
        control: {
          width: '4',
          height: '4',
          borderRadius: 'sm',
          '& svg': {
            width: '3',
            height: '3',
          },
        },
        label: {
          textStyle: 'sm',
        },
      },
      md: {
        root: {
          gap: '3',
        },
        control: {
          width: '5',
          height: '5',
          borderRadius: 'sm',
          '& svg': {
            width: '3.5',
            height: '3.5',
          },
        },
        label: {
          textStyle: 'md',
        },
      },
      lg: {
        root: {
          gap: '4',
        },
        control: {
          width: '6',
          height: '6',
          borderRadius: 'md',
          '& svg': {
            width: '4',
            height: '4',
          },
        },
        label: {
          textStyle: 'lg',
        },
      },
    },
  },
});

export type CheckboxProps = UseCheckboxProps &
  RecipeVariantProps<typeof checkboxVariants> & {
    className?: string | undefined;
    isDisabled?: boolean;
    isInvalid?: boolean;
    children?: ReactNode;
  };

const Checkbox = forwardRef<HTMLLabelElement, CheckboxProps>((props, ref) => {
  const { className, size, isDisabled, isInvalid, children, ...rest } = props;
  const styles = checkboxVariants({ size });
  const formControlProps = useComponentState({ isDisabled, isInvalid });
  return (
    <ArkCheckbox.Root ref={ref} className={cx('group', styles.root, className)} {...formControlProps} {...rest}>
      {({ isChecked, isIndeterminate }) => (
        <>
          <ArkCheckbox.Control className={cx(styles.control)}>
            {isChecked && <CheckIcon />}
            {isIndeterminate && <MinusIcon />}
          </ArkCheckbox.Control>
          <ArkCheckbox.Label className={cx(styles.label)}>{children}</ArkCheckbox.Label>
        </>
      )}
    </ArkCheckbox.Root>
  );
});
Checkbox.displayName = 'Checkbox';

export default Checkbox;
