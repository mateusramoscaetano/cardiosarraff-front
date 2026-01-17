"use client";

import * as React from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./button";

export function DatePickerDemo({
  date,
  setDate,
}: {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          data-empty={!date}
          className="data-[empty=true]:text-muted-foreground h-5 justify-start hover:bg-gray-100 text-left font-normal gap-2 bg-white text-[#1e1e1e] shadow-sm"
        >
          <CalendarIcon size={16} />
          {date ? (
            format(date, "PPP", { locale: ptBR })
          ) : (
            <span>Selecione uma data</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-white text-[#1e1e1e]">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(selectedDate) => {
            if (selectedDate) {
              // Normaliza para meia-noite local
              const normalized = new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth(),
                selectedDate.getDate() + 1
              );
              setDate(normalized);
            } else {
              setDate(undefined);
            }
          }}
          className="rounded-[4px]"
        />
      </PopoverContent>
    </Popover>
  );
}
