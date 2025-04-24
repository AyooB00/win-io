"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { DatePicker } from "./advanced/DatePicker"

interface DateFieldProps {
  id?: string
  label?: string
  date?: Date
  onChange?: (date: Date | undefined) => void
  className?: string
  disabled?: boolean
  required?: boolean
  error?: string
  locale?: "en" | "ar"
  placeholder?: string
}

export function DateField({
  id,
  label,
  date,
  onChange,
  className,
  disabled,
  required,
  error,
  locale = "en",
  placeholder,
}: DateFieldProps) {
  const dir = locale === "ar" ? "rtl" : "ltr"
  
  return (
    <div className={cn("space-y-2", className)} dir={dir}>
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <DatePicker
        date={date}
        onChange={onChange}
        disabled={disabled}
        locale={locale}
        placeholder={placeholder}
      />
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  )
} 