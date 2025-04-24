"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import { ar, enUS } from 'date-fns/locale'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { SimpleCalendar } from "./SimpleCalendar"

interface DateRangePickerProps {
  dateRange: DateRange | undefined
  setDateRange: (dateRange: DateRange | undefined) => void
  locale?: "ar" | "en"
}

export function DateRangePicker({ dateRange, setDateRange, locale = "en" }: DateRangePickerProps) {
  const localeObj = locale === "ar" ? ar : enUS
  const formatStr = locale === "ar" ? "dd/MM/yyyy" : "PPP"
  const dir = locale === "ar" ? "rtl" : "ltr"
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !dateRange && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {dateRange?.from ? (
            dateRange.to ? (
              <>
                {format(dateRange.from, formatStr, { locale: localeObj })} -{" "}
                {format(dateRange.to, formatStr, { locale: localeObj })}
              </>
            ) : (
              format(dateRange.from, formatStr, { locale: localeObj })
            )
          ) : (
            <span>{locale === "ar" ? "اختر نطاق التاريخ" : "Pick a date range"}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" dir={dir}>
        <SimpleCalendar
          mode="range"
          selected={dateRange}
          onSelect={setDateRange}
          locale={localeObj}
          initialFocus
          dir={dir}
        />
      </PopoverContent>
    </Popover>
  )
} 