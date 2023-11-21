'use client';

import Image from 'next/image';

interface AvatarProps {
  src?: string | null;
}

export const Avatar = ({ src }: AvatarProps) => {
  return (
    <Image
      src={src || '/placeholder.jpg'}
      height={30}
      width={30}
      alt='Avatar'
      className='rounded-full select-none'
    />
  );
};
