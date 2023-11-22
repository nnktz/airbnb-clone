'use client'

import { CategoryInput } from '@/components/category-input'
import { Heading } from '@/components/heading'
import { categories } from '@/components/layout/nav-bar/categories'

interface CategoryContentProps {
  setCustomValue: (value: string) => void
  category: any
}

export const CategoryContent = ({
  setCustomValue,
  category,
}: CategoryContentProps) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describe your place?"
        subtitle="Pick a category"
      />

      <div className="grid max-h-[50vh] grid-cols-1 gap-3 overflow-y-auto md:grid-cols-2">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={setCustomValue}
              selected={item.label === category}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
