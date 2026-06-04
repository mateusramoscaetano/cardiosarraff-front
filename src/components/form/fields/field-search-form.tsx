import { Input } from "../../ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form";
import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";
import { TClinicsWithClinicIdAndName } from "../report-form/use-create-report-form";
import { Pet } from "@/@types/tpet-table-data";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { PetOwnersWithPetOwnerIdAndName } from "../pet-form/user-create-pet-form";
import cn from "@/utils/cn";
import { Icons } from "../../ui/icons";
import { X } from "lucide-react";

interface IFieldSearchFormProps<T extends FieldValues> {
  form: UseFormReturn<T, any, undefined>;
  name: Path<T>;
  formLabel: string;
  resultsLabel: string;
  inputPlaceholder: string;
  searchValue: string | undefined;
  setSearchValue: (value: SetStateAction<string>) => void;
  isError: boolean;
  filteredArgsWithIdAndName:
    | TClinicsWithClinicIdAndName[]
    | Pet[]
    | PetOwnersWithPetOwnerIdAndName[];
  setFilteredArgsWithIdAndName: (
    value: SetStateAction<
      TClinicsWithClinicIdAndName[] | Pet[] | PetOwnersWithPetOwnerIdAndName[]
    >
  ) => void;
  isSelected: boolean;
  setIsSelected: (value: SetStateAction<boolean>) => void;
  search: string | undefined;
  setSearch: Dispatch<SetStateAction<string | undefined>>;
  isLoading?: boolean;
}

export function FieldSearchForm<T extends FieldValues>({
  form,
  formLabel,
  name,
  inputPlaceholder,
  filteredArgsWithIdAndName,
  setFilteredArgsWithIdAndName,
  search,
  setSearch,
  searchValue,
  setSearchValue,
  isError,
  isSelected,
  setIsSelected,
  resultsLabel,
  isLoading = false,
}: IFieldSearchFormProps<T>) {
  const [selectedDisplay, setSelectedDisplay] = useState<{
    id: string;
    name: string;
  } | null>(null);

  useEffect(() => {
    if (isSelected) return;

    const trimmed = searchValue?.trim() || "";
    if (!trimmed) return;

    const timer = setTimeout(() => {
      setSearch(trimmed);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchValue, setSearch, isSelected]);

  const handleSearch = () => {
    const trimmed = searchValue?.trim() || "";
    if (trimmed) {
      setSearch(trimmed);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value);

    if (value.trim() === "") {
      setSearch(undefined);
      setFilteredArgsWithIdAndName([]);
      setIsSelected(false);
      setSelectedDisplay(null);
      form.setValue(name, "" as PathValue<T, Path<T>>);
    } else if (isSelected) {
      setIsSelected(false);
      setSelectedDisplay(null);
      form.setValue(name, "" as PathValue<T, Path<T>>);
    }
  };

  const handleClearSelection = () => {
    setIsSelected(false);
    setSelectedDisplay(null);
    form.setValue(name, "" as PathValue<T, Path<T>>);
    setFilteredArgsWithIdAndName([]);
    setSearch(undefined);
    setSearchValue("");
  };

  const selectedItem = isSelected && selectedDisplay ? selectedDisplay : null;
  const hasSearched = Boolean(search?.trim());
  const showEmptyState =
    hasSearched && !isLoading && !isSelected && filteredArgsWithIdAndName.length === 0;
  const showResults =
    hasSearched && !isLoading && !isSelected && filteredArgsWithIdAndName.length > 0;

  return (
    <div className="mb-4">
      <FormField
        control={form.control}
        name={name}
        render={({ fieldState }) => (
          <>
            <FormItem>
              <FormLabel className="p-2">{formLabel}</FormLabel>
              <FormControl>
                <div className="flex items-center gap-2">
                  <Input
                    type="text"
                    placeholder={inputPlaceholder}
                    value={searchValue}
                    onChange={handleChange}
                    onKeyDown={handleKeyPress}
                    className={cn(
                      "text-zinc-600 dark:text-gray-100 flex-1",
                      fieldState.error ||
                        (isError && form.getValues(name) === "")
                        ? "border-2 border-red-500"
                        : ""
                    )}
                    icon={false}
                  />
                  <button
                    type="button"
                    onClick={handleSearch}
                    disabled={isLoading || !searchValue?.trim()}
                    className="shrink-0 h-10 px-3 bg-primary text-white rounded-xl disabled:opacity-50"
                  >
                    {isLoading ? (
                      <Icons.spinner className="h-4 w-4 animate-spin" />
                    ) : (
                      "Buscar"
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage>
                {fieldState.error?.message ||
                  (isError && form.getValues(name) === ""
                    ? `Campo ${formLabel.split(" ")[1] || formLabel} obrigatório`
                    : "")}
              </FormMessage>
            </FormItem>

            {isLoading && hasSearched && (
              <div className="mt-3 flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 px-2">
                <Icons.spinner className="h-4 w-4 animate-spin" />
                Buscando...
              </div>
            )}

            {selectedItem && (
              <div className="mt-3 flex items-center justify-between rounded-xl bg-primary/10 px-3 py-2">
                <div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Selecionado
                  </p>
                  <p className="text-sm font-medium text-[#1e1e1e] dark:text-gray-100">
                    {selectedItem.name}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleClearSelection}
                  className="rounded-full p-1 hover:bg-primary/20"
                  aria-label="Limpar seleção"
                >
                  <X className="h-4 w-4 text-primary" />
                </button>
              </div>
            )}

            {showEmptyState && (
              <div className="mt-3 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-600 px-4 py-3 text-sm text-zinc-500 dark:text-zinc-400">
                Nenhum resultado para &quot;{search}&quot;. Tente outro termo ou
                cadastre um novo registro.
              </div>
            )}

            {showResults && (
              <div className="mt-3 rounded-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden">
                <p className="px-3 py-2 text-xs font-medium text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800">
                  {resultsLabel} ({filteredArgsWithIdAndName.length})
                </p>
                <div className="max-h-[160px] overflow-y-auto divide-y divide-zinc-100 dark:divide-zinc-800">
                  {filteredArgsWithIdAndName.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className="w-full text-left px-3 py-2.5 text-sm hover:bg-primary/10 transition-colors"
                      onClick={() => {
                        form.setValue(name, item.id as PathValue<T, Path<T>>);
                        setSelectedDisplay({ id: item.id, name: item.name });
                        setFilteredArgsWithIdAndName([
                          { id: item.id, name: item.name },
                        ]);
                        setIsSelected(true);
                        setSearchValue(item.name);
                      }}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      />
    </div>
  );
}
