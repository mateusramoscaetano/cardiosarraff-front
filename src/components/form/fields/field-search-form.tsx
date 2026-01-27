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
import { Dispatch, SetStateAction } from "react";
import { PetOwnersWithPetOwnerIdAndName } from "../pet-form/user-create-pet-form";
import cn from "@/utils/cn";
import Image from "next/image";

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
}: IFieldSearchFormProps<T>) {
  const handleSearch = () => {
    if (searchValue && searchValue.trim() !== "") {
      setSearch(searchValue);
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
    }
  };

  return (
    <>
      <div className="mb-4">
        <FormField
          control={form.control}
          name={name}
          render={({ field, fieldState }) => (
            <>
              <FormItem>
                <FormLabel className="p-2">{formLabel}</FormLabel>
                <FormControl>
                  <div className="flex items-center">
                    <Input
                      type="text"
                      placeholder={inputPlaceholder}
                      value={searchValue}
                      onChange={handleChange}
                      onKeyDown={handleKeyPress}
                      className={cn(
                        "text-zinc-600 dark:text-gray-100",
                        isError && form.getValues("clinicId" as Path<T>) === ""
                          ? "border-2 border-red-500"
                          : ""
                      )}
                      icon={false}
                    />
                    <button
                      type="button"
                      onClick={handleSearch}
                      className="ml-2 p-2 bg-primary text-white rounded"
                    >
                      <Image
                        src="/white arrow[1].svg"
                        width={15}
                        height={15}
                        alt="arrow"
                      />
                    </button>
                  </div>
                </FormControl>
                <FormMessage>
                  {isError && form.getValues(name) === ""
                    ? `Campo ${formLabel.split(" ")[1]} obrigatório`
                    : ""}
                </FormMessage>
              </FormItem>
              {filteredArgsWithIdAndName.length > 0 && (
                <div className="mt-4 rounded-xl border-1 border-slate-400">
                  <FormLabel className="p-2">{resultsLabel}</FormLabel>

                  <div className="max-h-[200px] overflow-y-auto">
                    {filteredArgsWithIdAndName.map((item) => {
                      const handleItemClick = () => {
                        form.setValue(name, item.id as PathValue<T, Path<T>>);

                        setFilteredArgsWithIdAndName([
                          { id: item.id, name: item.name },
                        ]);
                        setIsSelected(!isSelected);
                      };

                      return (
                        <div
                          key={item.id}
                          className={`px-3 text-sm border-2 cursor-pointer rounded-xl shadow-sm ${
                            isSelected ? "bg-primary text-white" : ""
                          }`}
                          onClick={handleItemClick}
                        >
                          <div className="">{item.name}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        />
      </div>
    </>
  );
}
