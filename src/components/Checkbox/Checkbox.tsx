'use client';

import { cx, RecipeVariantProps, sva } from '@styled-system/css';
import { DOMAttributes, forwardRef, InputHTMLAttributes } from 'react';

import { useComponentState } from '@/hooks';

const checkboxVariants = sva({
  slots: ['container', 'label', 'controlContainer', 'control', 'indicator', 'indicatorIcon'],
  base: {
    container: {
      display: 'inline-flex',
      alignItems: 'center',
      _disabled: {
        cursor: 'not-allowed',
        opacity: '.4',
      },
      _readOnly: {
        pointerEvents: 'none',
      },
    },
    label: {
      fontSize: 'md',
      _groupInvalid: { color: 'red.500' },
    },
    controlContainer: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      rounded: 'full',
      overflow: 'hidden',
      borderRadius: 'full',
    },
    control: {
      _before: {
        content: "''",
        position: 'relative',
        h: '5',
        w: '5',
        cursor: 'pointer',
        appearance: 'none',
        border: '1px solid',
        transition: 'all 150ms',
        _groupInvalid: { borderColor: 'red.500', color: 'red.500' },
      },
    },
    indicator: {
      pointerEvents: 'none',
      position: 'absolute',
      left: '1/2',
      top: '1/2',
      transform: 'translate(-1/2, -1/2)',
      color: 'white',
      opacity: '0',
      transition: 'opacity',
      _peerChecked: { opacity: '100' },
    },
    indicatorIcon: {},
  },
  variants: {
    colorScheme: {
      primary: {
        label: { color: 'primary.500' },
        control: {
          border: '1px solid',
          borderColor: 'primary.500',
          color: 'primary.500',
          _checked: {
            borderColor: 'primary.500',
            bgColor: 'primary.500',
            _before: {
              bgColor: 'primary.500',
            },
          },
        },
      },
    },
    size: {
      sm: {
        container: { gap: '1' },
        control: { h: '3', w: '3', borderRadius: '.2rem' },
        label: { fontSize: 'xs' },
        indicatorIcon: { h: '3', w: '3' },
      },
      md: {
        container: { gap: '1.5' },
        control: { h: '4', w: '4', borderRadius: '.3rem' },
        label: { fontSize: 'sm' },
        indicatorIcon: { h: '3.5', w: '3.5' },
      },
      lg: {
        container: { gap: '2' },
        control: { h: '5', w: '5', borderRadius: 'md' },
        label: { fontSize: 'lg' },
        indicatorIcon: { h: '4', w: '4' },
      },
    },
  },
  defaultVariants: {
    size: 'md',
    colorScheme: 'primary',
  },
});

export type CheckboxProps = Omit<DOMAttributes<HTMLLabelElement>, 'onChange' | 'onKeyUp' | 'onKeyDown' | 'onBlur'> &
  RecipeVariantProps<typeof checkboxVariants> & {
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
  };
const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const {
    size,
    colorScheme,
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
  const { container, label, controlContainer, indicator, indicatorIcon, control } = checkboxVariants({
    size,
    colorScheme,
  });
  const stateProps = useComponentState({ isDisabled, isInvalid, isReadonly });
  return (
    <label {...stateProps} className={cx(container, 'group')} {...rest}>
      <div className={controlContainer}>
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
          className={cx(control, 'peer')}
          {...stateProps}
        />
        <div className={indicator}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={indicatorIcon}
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
      <span className={label}>{children}</span>
    </label>
  );
});
Checkbox.displayName = 'Checkbox';

export default Checkbox;
