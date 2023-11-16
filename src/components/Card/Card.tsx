'use client';
import { RecipeVariantProps, sva } from '@styled-system/css';
import { DOMAttributes, forwardRef, ReactNode } from 'react';

const cardVariants = sva({
  slots: ['container', 'header', 'body', 'footer'],
  base: {
    container: {
      position: 'relative',
      display: 'flex',
      minWidth: '200px',
      flexDirection: 'column',
      borderRadius: 'lg',
      border: '1px solid',
      borderColor: 'gray.50',
      bgColor: 'white',
      shadow: 'sm',
    },
    header: { display: 'flex', flexDir: 'column' },
    body: { display: 'flex', flexDir: 'column' },
    footer: { display: 'flex', justifyContent: 'space-between' },
  },
  variants: {
    size: {
      sm: {
        container: { gap: '4', p: '4', fontSize: 'sm' },
      },
      md: {
        container: { fontSize: 'md', gap: '6', p: '4' },
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export type CardProps = Omit<DOMAttributes<HTMLDivElement>, 'onChange' | 'onKeyUp' | 'onKeyDown' | 'onBlur'> &
  RecipeVariantProps<typeof cardVariants> & {
    headerContent?: ReactNode;
    bodyContent?: ReactNode;
    footerContent?: ReactNode;
  };

export const Card = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const { size, headerContent, bodyContent, footerContent, ...rest } = props;
  const { container, header, body, footer } = cardVariants({ size });
  return (
    <div ref={ref} className={container} {...rest}>
      <div className={header}>{headerContent}</div>
      <div className={body}>{bodyContent}</div>
      <div className={footer}>{footerContent}</div>
    </div>
  );
});
Card.displayName = 'Card';
