"use client";

import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface IReportFiltersProps {
  filterType: string | undefined;
  filterValue: string | undefined;
  onFilterTypeChange: (value: string | undefined) => void;
  onFilterValueChange: (value: string | undefined) => void;
  onClearFilters: () => void;
  isClinicUser?: boolean;
  search?: string | undefined;
  setSearch?: (value: string | undefined) => void;
}

export function ReportFilters({
  filterType,
  filterValue,
  onFilterTypeChange,
  onFilterValueChange,
  onClearFilters,
  isClinicUser = false,
  search,
  setSearch,
}: IReportFiltersProps) {
  const [inputValue, setInputValue] = useState(
    filterType === "all" ? search || "" : filterValue || ""
  );

  useEffect(() => {
    if (filterType === "all") {
      setInputValue(search || "");
    } else {
      setInputValue(filterValue || "");
    }
  }, [filterValue, filterType, search]);

  const handleFilterTypeChange = (value: string) => {
    if (value === "all") {
      onFilterTypeChange("all");
      onFilterValueChange(undefined);
      setInputValue(search || "");
    } else if (value === "none") {
      onFilterTypeChange(undefined);
      onFilterValueChange(undefined);
      setInputValue("");
      if (setSearch) {
        setSearch(undefined);
      }
    } else {
      onFilterTypeChange(value);
      if (!filterValue) {
        setInputValue("");
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const applyFilter = () => {
    const value = inputValue.trim();
    if (filterType === "all") {
      if (setSearch) {
        setSearch(value || undefined);
      }
    } else if (filterType) {
      onFilterValueChange(value || undefined);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      applyFilter();
    }
  };

  const handleBlur = () => {
    applyFilter();
  };

  const handleClear = () => {
    setInputValue("");
    if (filterType === "all") {
      if (setSearch) {
        setSearch(undefined);
      }
    }
    onClearFilters();
  };

  const placeholder =
    filterType === "all"
      ? "Pesquisar por cliente, pet ou doutor..."
      : `Digite o ${
          filterType === "doctor"
            ? "nome do doutor"
            : filterType === "petOwner"
            ? "nome do dono"
            : filterType === "pet"
            ? "nome do pet"
            : "nome da clínica"
        }...`;

  return (
    <div className="flex flex-col gap-3 flex-1 w-full md:flex-row md:items-center md:gap-4">
      <Select
        value={filterType || "all"}
        onValueChange={handleFilterTypeChange}
      >
        <SelectTrigger className="w-full md:w-[200px] border-none text-zinc-600 dark:text-gray-100 bg-[#f2f2f2] dark:bg-zinc-700 rounded-xl">
          <SelectValue placeholder="Filtrar por..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          <SelectItem value="doctor">Doutor</SelectItem>
          <SelectItem value="petOwner">Dono do Pet</SelectItem>
          <SelectItem value="pet">Pet</SelectItem>
          {!isClinicUser && <SelectItem value="clinic">Clínica</SelectItem>}
        </SelectContent>
      </Select>

      {(filterType === "all" || filterType) && (
        <>
          <div className="flex w-full gap-2 md:flex-1 md:items-center">
            <Input
              className="flex-1 border-none text-zinc-600 dark:text-gray-100 bg-[#f2f2f2] dark:bg-zinc-700 rounded-xl placeholder:text-[#b9b9b9] h-10"
              icon={filterType === "all"}
              placeholder={placeholder}
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              onBlur={handleBlur}
            />
            <Button
              onClick={handleClear}
              variant="ghost"
              size="icon"
              type="button"
              className="shrink-0 rounded-xl bg-[#f2f2f2] dark:bg-zinc-700 hover:bg-[#e2e2e2] dark:hover:bg-zinc-600 h-10 w-10"
            >
              <X className="h-4 w-4 text-zinc-600 dark:text-gray-100" />
            </Button>
          </div>
          <Button
            type="button"
            onClick={applyFilter}
            className="md:hidden rounded-xl w-full"
          >
            Buscar
          </Button>
        </>
      )}
    </div>
  );
}
