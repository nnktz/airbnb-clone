'use client'

import { Range } from 'react-date-range'

import { CalendarComponent } from '@/components/calendar-component'
import { Button } from '@/components/ui/button'

interface ListingReservationProps {
  price: number
  totalPrice: number
  onChangeDate: (value: Range) => void
  dateRange: Range
  onSubmit: () => void
  disabled: boolean
  disabledDates: Date[]
}

export const ListingReservation = ({
  price,
  totalPrice,
  onChangeDate,
  dateRange,
  onSubmit,
  disabled,
  disabledDates,
}: ListingReservationProps) => {
  return (
    <div className="overflow-hidden rounded-xl border-[1px] border-neutral-200 bg-white">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">$ {price}</div>

        <div className="font-light text-neutral-600">night</div>
      </div>

      <hr />

      <CalendarComponent
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
        value={dateRange}
      />

      <hr />

      <div className="p-4">
        <Button disabled={disabled} label="Reserve" onClick={onSubmit} />
      </div>

      <div className="flex flex-row items-center justify-between p-4 text-lg font-semibold">
        <div>Total</div>

        <div>$ {totalPrice.toLocaleString()}</div>
      </div>
    </div>
  )
}
