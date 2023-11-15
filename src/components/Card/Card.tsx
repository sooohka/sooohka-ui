'use client';
import { DOMAttributes, forwardRef } from 'react';
import { tv, VariantProps } from 'tailwind-variants';

const cardVariants = tv({
  slots: {
    container: 'relative flex min-w-[200px] flex-col rounded-lg border bg-white shadow-sm',
    header: 'flex flex-col',
    body: 'flex flex-col',
    footer: 'flex justify-between',
  },
  variants: {
    size: {
      sm: {
        container: 'gap-4 p-4 text-sm',
        header: '',
        body: '',
        footer: '',
      },
      md: {
        container: 'text-md gap-6 p-4',
        header: '',
        body: '',
        footer: '',
      },
    },
  },
});

const { container, header, body, footer } = cardVariants();

export interface CardProps
  extends Omit<DOMAttributes<HTMLDivElement>, 'onChange' | 'onKeyUp' | 'onKeyDown' | 'onBlur'>,
    VariantProps<typeof cardVariants> {
  className?: string | undefined;
}

const Card = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const { className, size = 'md', ...rest } = props;
  return <div ref={ref} className={container({ size, className })} {...rest}></div>;
});
Card.displayName = 'Card';

const CardHeader = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const { className, size = 'md', ...rest } = props;
  return <div ref={ref} className={header({ size, className })} {...rest}></div>;
});
CardHeader.displayName = 'CardHeader';

const CardBody = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const { className, size = 'md', ...rest } = props;
  return <div ref={ref} className={body({ size, className })} {...rest}></div>;
});
CardBody.displayName = 'CardBody';

const CardFooter = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const { className, size = 'md', ...rest } = props;
  return <div ref={ref} className={footer({ size, className })} {...rest}></div>;
});
CardFooter.displayName = 'CardFooter';

export { Card, CardBody, CardFooter, CardHeader };
