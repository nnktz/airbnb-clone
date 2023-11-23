'use client'

import { RangeKeyDict, Range, DateRange } from 'react-date-range'

import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file

interface CalendarComponentProps {
  disabledDates?: Date[]
  onChange: (value: RangeKeyDict) => void
  value: Range
}

export const CalendarComponent = ({
  disabledDates,
  onChange,
  value,
}: CalendarComponentProps) => {
  return (
    <DateRange
      rangeColors={['#262626']}
      ranges={[value]}
      date={new Date()}
      onChange={onChange}
      direction="vertical"
      showDateDisplay={false}
      minDate={new Date()}
      disabledDates={disabledDates}
    />
  )
}
