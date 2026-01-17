import cn from "@/utils/cn";

interface IClientDetailTextBoxProps {
  fieldTitle: string;
  field?: string;
  className?: string;
}

export function ClientDetailTextBox({
  fieldTitle,
  field,
  className,
}: IClientDetailTextBoxProps) {
  return (
    <>
      <div
        className={cn(
          "w-full  flex flex-col text-[#1e1e1e] dark:text-gray-100",
          className
        )}
      >
        <div className="font-medium text-sm mb-3 pl-5 dark:text-gray-100">
          {fieldTitle}
        </div>
        <div className="font-sm flex items-center justify-center rounded-3xl h-12 bg-white text-sm dark:bg-zinc-900 dark:text-gray-100 dark:border-zinc-700 dark:border-2">
          {field}
        </div>
      </div>
    </>
  );
}
