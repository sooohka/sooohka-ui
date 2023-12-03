'use client';
import { Accordion as ArkAccordion, AccordionProps as ArkAccordionProps } from '@ark-ui/react/accordion';
import { css, cx, sva } from '@styled-system/css';
import { RecipeVariantProps } from '@styled-system/types';
import { ChevronDownIcon } from 'lucide-react';
import { forwardRef, ReactNode } from 'react';

export const accordionVariants = sva({
  slots: ['root', 'item', 'itemTrigger', 'itemContent', 'itemIndicator'],
  base: {
    root: {
      divideY: '1px',
      width: 'full',
    },
    item: {
      borderColor: 'border.default',
    },
    itemTrigger: {
      alignItems: 'center',
      cursor: 'pointer',
      display: 'flex',
      fontWeight: 'medium',
      justifyContent: 'space-between',
      width: 'full',
    },
    itemIndicator: {
      color: 'fg.muted',
      transformOrigin: 'center',
      transitionDuration: 'normal',
      transitionProperty: 'transform',
      transitionTimingFunction: 'default',
      _open: {
        transform: 'rotate(-180deg)',
      },
    },
    itemContent: {
      color: 'fg.muted',
      display: 'grid',
      gridTemplateRows: '0fr',
      transitionProperty: 'grid-template-rows, padding-bottom',
      transitionDuration: 'normal',
      transitionTimingFunction: 'default',
      _open: {
        gridTemplateRows: '1fr',
      },
      '& > div': {
        overflow: 'hidden',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
  variants: {
    size: {
      sm: {},
      md: {
        itemTrigger: {
          py: '4',
        },
        itemContent: {
          pb: '6',
          pr: '8',
          _closed: {
            pb: '0',
          },
        },
      },
      lg: {},
    },
  },
});

export type AccordionProps = ArkAccordionProps &
  RecipeVariantProps<typeof accordionVariants> & {
    items: { id: string; title: ReactNode; panel: ReactNode; disabled: boolean }[];
  };

const Accordion = forwardRef<HTMLDivElement, AccordionProps>((props, ref) => {
  const { className, items, size, ...rest } = props;
  const { root, item, itemContent, itemIndicator, itemTrigger } = accordionVariants({ size });

  return (
    <ArkAccordion.Root ref={ref} className={cx(className, root, css())} {...rest}>
      {items.map((content) => (
        <ArkAccordion.Item className={cx(item)} key={content.id} value={content.id} disabled={content.disabled}>
          <ArkAccordion.ItemTrigger className={cx(itemTrigger)}>
            {content.title}
            <ArkAccordion.ItemIndicator className={cx(itemIndicator)}>
              <ChevronDownIcon />
            </ArkAccordion.ItemIndicator>
          </ArkAccordion.ItemTrigger>
          <ArkAccordion.ItemContent className={cx(itemContent)}>
            <div>{content.panel}</div>
          </ArkAccordion.ItemContent>
        </ArkAccordion.Item>
      ))}
    </ArkAccordion.Root>
  );
});

export default Accordion;
