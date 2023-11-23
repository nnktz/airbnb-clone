'use client'

import { Range, RangeKeyDict } from 'react-date-range'

import { CalendarComponent } from '@/components/calendar-component'
import { Heading } from '@/components/heading'

interface DateContentProps {
  value: Range
  onChange: (value: RangeKeyDict) => void
}

export const DateContent = ({ value, onChange }: DateContentProps) => {
  return (
    <div className="flex flex-col gap-4">
      <Heading
        title="When do you plan to go?"
        subtitle="Make sure everyone is free!"
      />

      <CalendarComponent value={value} onChange={onChange} />
    </div>
  )
}
