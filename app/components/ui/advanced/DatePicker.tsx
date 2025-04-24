"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { ar, enUS } from 'date-fns/locale'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { SimpleCalendar } from "./SimpleCalendar"

interface DatePickerProps {
  date?: Date
  setDate: (date?: Date) => void
  locale?: "ar" | "en"
}

export function DatePicker({ date, setDate, locale = "en" }: DatePickerProps) {
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
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, formatStr, { locale: localeObj }) : locale === "ar" ? "اختر تاريخ" : "Pick a date"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" dir={dir}>
        <SimpleCalendar
          mode="single"
          selected={date}
          onSelect={setDate}
          locale={localeObj}
          initialFocus
          dir={dir}
        />
      </PopoverContent>
    </Popover>
  )
} 