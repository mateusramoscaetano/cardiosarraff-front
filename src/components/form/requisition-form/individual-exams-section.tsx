import { Checkbox } from "@/components/ui/checkbox";
import { FormTitle } from "./form-title";
import { biochemicalExams, immunologyExams, IndividualExamId } from "./types";

interface IndividualExamsSectionProps {
  form: any;
}

export function IndividualExamsSection({ form }: IndividualExamsSectionProps) {
  const { register } = form;

  const biochemicalColumns = Array.from({ length: 4 }, (_, i) =>
    biochemicalExams.slice(i * 7, (i + 1) * 7)
  );

  const immunologyColumns = Array.from({ length: 4 }, (_, i) =>
    immunologyExams.slice(i * 2, (i + 1) * 2)
  );

  return (
    <div className="">
      <FormTitle title="Solicitação de Exames Individual" />

      <div className="space-y-2 border-2 border-pink-card p-4 rounded-xl">
        <h3 className="text-sm font-semibold">Bioquímica Sérica</h3>
        <div className="grid grid-cols-4 gap-4">
          {biochemicalColumns.map((column, columnIndex) => (
            <div key={columnIndex} className="space-y-1">
              {column.map((exam) => (
                <IndividualExamsSectionItem
                  key={exam.id}
                  id={exam.id}
                  label={exam.label}
                  register={(field) => register(`individualExams.${field}`)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4 border py-2 px-4 bg-pink-card text-primary">
        <h3 className="text-sm font-semibold">Imunologia (Teste Rápido)</h3>
        <div className="grid grid-cols-4 gap-1">
          {immunologyColumns.map((column, columnIndex) => (
            <div key={columnIndex} className="space-y-1">
              {column.map((exam) => (
                <IndividualExamsSectionItem
                  key={exam.id}
                  id={exam.id}
                  label={exam.label}
                  register={(field) => register(`individualExams.${field}`)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface IndividualExamsSectionItemProps {
  id: IndividualExamId;
  label: string;
  register: (field: string) => any;
}

function IndividualExamsSectionItem({
  id,
  label,
  register,
}: IndividualExamsSectionItemProps) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={id} {...register(id)} className="h-3 w-3" />
      <label
        htmlFor={id}
        className="text-[10px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  );
}
