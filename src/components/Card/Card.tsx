'use client';
import { sva } from '@styled-system/css';
import { styled } from '@styled-system/jsx';

import { createStyleContext } from '@/lib';

const cardVariants = sva({
  slots: ['root', 'header', 'content', 'footer', 'title', 'description'],
  base: {
    root: {
      bg: 'bg.default',
      boxShadow: 'lg',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
    },
    header: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      display: 'flex',
      flex: '1',
      flexDirection: 'column',
    },
    footer: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    title: {
      textStyle: 'lg',
      fontWeight: 'semibold',
    },
    description: {
      color: 'fg.muted',
      textStyle: 'sm',
    },
  },
  variants: {
    size: {
      sm: {
        root: {
          borderRadius: 'md',
          maxW: 'sm',
        },
        header: {
          gap: '1',
          p: '3',
        },
        content: {
          pb: '3',
          px: '3',
        },
        footer: {
          pb: '3',
          pt: '1',
          px: '3',
        },
      },
      md: {
        root: {
          borderRadius: 'md',
          maxW: 'md',
        },
        header: {
          gap: '1',
          p: '6',
        },
        content: {
          pb: '6',
          px: '6',
        },
        footer: {
          pb: '6',
          pt: '2',
          px: '6',
        },
      },
      lg: {
        root: {
          borderRadius: 'xl',
          maxW: 'lg',
        },
        header: {
          gap: '2',
          p: '8',
        },
        content: {
          pb: '8',
          px: '8',
        },
        footer: {
          pb: '8',
          pt: '3',
          px: '8',
        },
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const { withProvider, withContext } = createStyleContext(cardVariants);
const CardRoot = withProvider(styled('div'), 'root');
export const CardContent = withContext(styled('div'), 'content');
export const CardDescription = withContext(styled('p'), 'description');
export const CardFooter = withContext(styled('div'), 'footer');
export const CardHeader = withContext(styled('div'), 'header');
export const CardTitle = withContext(styled('h3'), 'title');

const Card = Object.assign(CardRoot, {
  Root: CardRoot,
  Content: CardContent,
  Description: CardDescription,
  Footer: CardFooter,
  Header: CardHeader,
  Title: CardTitle,
});

export default Card;
