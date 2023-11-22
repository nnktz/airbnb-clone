'use client'

import Select from 'react-select'

import useCountries from '@/hooks/use-contries'

export type CountrySelectValue = {
  flag: string
  label: string
  latlng: number[]
  region: string
  value: string
}

interface CountrySelectProps {
  value?: CountrySelectValue
  onChange: (value: CountrySelectValue) => void
}

export const CountrySelect = ({ value, onChange }: CountrySelectProps) => {
  const { getAll } = useCountries()

  return (
    <div>
      <Select
        placeholder="Any where"
        isClearable
        options={getAll}
        onChange={(value) => onChange(value as CountrySelectValue)}
        value={value}
        formatOptionLabel={(option: any) => (
          <div className="flex flex-row items-center gap-3">
            <div>{option.flag}</div>

            <div>
              {option.label},{' '}
              <span className="ml-1 text-neutral-800">{option.region}</span>
            </div>
          </div>
        )}
        classNames={{
          control: () => 'border-2 p-3',
          input: () => 'text-lg',
          option: () => 'text-lg',
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: 'black',
            primary25: '#ffe4e6',
          },
        })}
      />
    </div>
  )
}
