'use client';
import { cx, sva } from '@styled-system/css';
import { RecipeVariantProps } from '@styled-system/types';
import { InfoIcon } from 'lucide-react';
import { forwardRef } from 'react';

const alertVariants = sva({
  slots: ['root', 'content', 'description', 'icon', 'title'],
  base: {
    root: {
      background: 'bg.default',
      borderWidth: '1px',
      borderRadius: 'l3',
      borderColor: 'border.default',
      display: 'flex',
      gap: '3',
      p: '4',
      width: 'full',
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1',
    },
    description: {
      color: 'fg.muted',
      textStyle: 'sm',
    },
    icon: {
      color: 'fg.emphasized',
      flexShrink: '0',
      width: '5',
      height: '5',
    },
    title: {
      fontWeight: 'semibold',
      textStyle: 'sm',
    },
  },
  variants: {
    colorScheme: {
      primary: {
        root: {
          borderColor: 'border.accent',
        },
        icon: {
          color: 'accent.default',
        },
        title: {
          color: 'accent.default',
        },
        description: {
          color: 'accent.8',
        },
      },
      natural: {},
    },
  },
  defaultVariants: {
    colorScheme: 'natural',
  },
});

export type AlertProps = RecipeVariantProps<typeof alertVariants> & {
  className?: string | undefined;
  title: string | undefined;
  description?: string | undefined;
};

const Alert = forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  const { className, colorScheme, title, description } = props;
  const style = alertVariants({ colorScheme });
  return (
    <div ref={ref} className={cx(style.root, className)}>
      <InfoIcon className={cx(style.icon)} />
      <div className={cx(style.content)}>
        <h5 className={cx(style.title)}>{title}</h5>
        <p className={cx(style.description)} hidden={!description}>
          {description}
        </p>
      </div>
    </div>
  );
});
Alert.displayName = 'Alert';

export default Alert;
