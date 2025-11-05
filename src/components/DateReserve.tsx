"use client";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState, useEffect } from "react";
import { Dayjs } from "dayjs";

export default function DateReserve({
  value,
  onDateChange,
  label,
}: {
  value?: Dayjs | null;
  onDateChange: (date: Dayjs | null) => void;
  label?: string;
}) {
  const [date, setDate] = useState<Dayjs | null>(null);

  useEffect(() => {
    if (value) {
      setDate(value);
    }
  }, [value]);

  return (
    <div className="space-x-5 w-fit py-3 flex flex-row justify-center">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          className="bg-white"
          label={label}
          value={date}
          onChange={(newDate) => {
            setDate(newDate);
            onDateChange(newDate);
          }}
        />
      </LocalizationProvider>
    </div>
  );
}
