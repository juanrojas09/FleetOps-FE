"use client"

import { useState } from "react"
import { Calendar, CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Label } from "../../common/ui/label"
import { Button } from "../../common/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "../../common/ui/popover"

import { cn } from "../../lib/utils"

export interface DateRange {
  from: Date | undefined
  to: Date | undefined
}

interface DateRangePickerProps {
  dateRange?: DateRange
  onChange?: (dateRange: DateRange) => void
  className?: string
}

export function DateRangePicker({ dateRange, onChange, className }: DateRangePickerProps) {
  const [date, setDate] = useState<DateRange>(
    dateRange || {
      from: undefined,
      to: undefined,
    },
  )

  const handleDateChange = (newDateRange: DateRange) => {
    setDate(newDateRange)
    if (onChange) {
      onChange(newDateRange)
    }
  }

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor="date-range">Rango de fechas</Label>
      <div className="grid grid-cols-2 gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date-from"
              variant={"outline"}
              className={cn("w-full justify-start text-left font-normal", !date.from && "text-muted-foreground")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date.from ? format(date.from, "dd/MM/yyyy", { locale: es }) : <span>Desde</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              
              onSelect={(day:any) => handleDateChange({ ...date, from: day as Date })}
              
             
            />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date-to"
              variant={"outline"}
              className={cn("w-full justify-start text-left font-normal", !date.to && "text-muted-foreground")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date.to ? format(date.to, "dd/MM/yyyy", { locale: es }) : <span>Hasta</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
           
              onSelect={(day:any) => handleDateChange({ ...date, to: day as Date })}
              
     
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
