'use client';
import { RecipeVariantProps, sva } from '@styled-system/css';
import { forwardRef, ImgHTMLAttributes } from 'react';

const avatarVariants = sva({
  slots: ['container', 'image'],
  base: {
    container: {
      position: 'relative',
      display: 'flex',
      flexShrink: 0,
      overflow: 'hidden',
      borderRadius: 'full',
    },
    image: { aspectRatio: '1/1', h: 'full', w: 'full' },
  },
  variants: {
    size: {
      sm: {
        container: { h: '10', w: '10' },
      },
      md: {
        container: { h: '16', w: '16' },
      },
      lg: {
        container: { h: '20', w: '20' },
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export type AvatarProps = ImgHTMLAttributes<HTMLImageElement> & RecipeVariantProps<typeof avatarVariants>;

const fallback =
  'data:image/jpeg;base64,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';

const Avatar = forwardRef<HTMLImageElement, AvatarProps>((props, ref) => {
  const { size, src, ...rest } = props;
  const { container, image } = avatarVariants({ size });
  return (
    <div className={container}>
      <img className={image} ref={ref} alt="" src={src || fallback} {...rest}></img>
    </div>
  );
});
Avatar.displayName = 'Avatar';

export default Avatar;
