'use client';
import { Avatar as ArkAvatar, AvatarProps as ArkAvatarProps } from '@ark-ui/react';
import { cx, sva } from '@styled-system/css';
import { RecipeVariantProps } from '@styled-system/types';
import { forwardRef } from 'react';

const avatarVariants = sva({
  slots: ['root', 'fallback', 'image'],
  base: {
    root: {
      borderRadius: 'full',
      borderWidth: '1px',
      borderColor: 'border',
      flexShrink: 0,
    },
    fallback: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'bg',
      fontWeight: 'semibold',
      height: 'inherit',
    },
    image: {
      objectFit: 'cover',
    },
  },
  defaultVariants: {
    size: 'md',
  },
  variants: {
    size: {
      sm: {
        root: {
          height: '9',
          width: '9',
        },
        fallback: {
          textStyle: 'sm',
        },
      },
      md: {
        root: {
          height: '12',
          width: '12',
        },
        fallback: {
          textStyle: 'md',
        },
      },
      lg: {
        root: {
          height: '16',
          width: '16',
        },
        fallback: {
          textStyle: 'lg',
        },
      },
    },
  },
});

export type AvatarProps = ArkAvatarProps &
  RecipeVariantProps<typeof avatarVariants> & {
    className?: string;
    src?: string;
    alt?: string;
    fallback?: string;
  };

const Avatar = forwardRef<HTMLDivElement, AvatarProps>((props, ref) => {
  const { className, size, fallback, src, alt, ...rest } = props;
  const styles = avatarVariants({ size });
  return (
    <ArkAvatar.Root ref={ref} className={cx(styles.root, className)} {...rest}>
      <ArkAvatar.Fallback className={cx(styles.fallback)}>{fallback}</ArkAvatar.Fallback>
      <ArkAvatar.Image className={cx(styles.image)} src={src} alt={alt}></ArkAvatar.Image>
    </ArkAvatar.Root>
  );
});
Avatar.displayName = 'Avatar';

export default Avatar;
