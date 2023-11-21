'use client';

import qs from 'query-string';
import { useRouter, useSearchParams } from 'next/navigation';
import { IconType } from 'react-icons';
import { useCallback } from 'react';

import { cn } from '@/lib/utils';

interface CategoryBoxProps {
  label: string;
  icon: IconType;
  selected?: boolean;
}

export const CategoryBox = ({
  label,
  icon: Icon,
  selected,
}: CategoryBoxProps) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updateQuery: any = {
      ...currentQuery,
      category: label,
    };

    if (params?.get('category') === label) {
      delete updateQuery?.category;
    }

    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updateQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [label, params, router]);

  return (
    <div
      role='button'
      onClick={handleClick}
      className={cn(
        'flex flex-col items-center justify-center gap-2 p-3 border-b-2 border-transparent text-neutral-500 hover:text-neutral-800 transition',
        selected && 'border-b-neutral-800 text-neutral-800'
      )}>
      <Icon size={26} />

      <div className='font-semibold text-sm'>{label}</div>
    </div>
  );
};