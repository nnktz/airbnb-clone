'use client'

import Image from 'next/image'
import { CldUploadWidget } from 'next-cloudinary'
import { useCallback } from 'react'
import { TbPhotoPlus } from 'react-icons/tb'

declare global {
  var cloudinary: any
}

interface ImageUploadProps {
  onChange: (value: string) => void
  value: string
}

export const ImageUpload = ({ onChange, value }: ImageUploadProps) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url)
    },
    [onChange],
  )

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="tou93xzt"
      options={{ maxFiles: 1 }}
    >
      {({ open }) => {
        return (
          <div
            role="button"
            onClick={() => open?.()}
            className="relative flex flex-col items-center justify-center gap-4 border-2 border-dashed border-neutral-300 p-20 text-neutral-600 transition hover:opacity-75"
          >
            <TbPhotoPlus size={50} />

            <div className="text-lg font-semibold">Click to upload</div>

            {value && (
              <div className="absolute inset-0 h-full w-full">
                <Image src={value} alt="Upload" fill objectFit="cover" />
              </div>
            )}
          </div>
        )
      }}
    </CldUploadWidget>
  )
}
