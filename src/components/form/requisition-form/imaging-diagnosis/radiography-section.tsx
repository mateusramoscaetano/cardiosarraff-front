import { UseFormReturn } from "react-hook-form";
import { RequisitionFormData } from "../types";
import { CheckboxField } from "./checkbox-field";

interface RadiographySectionProps {
  form: UseFormReturn<RequisitionFormData>;
}

const simpleExams = [
  { name: "imagingDiagnosis.radiography.abdominal", label: "Abdominal" },
  { name: "imagingDiagnosis.radiography.thorax", label: "Tórax" },
  { name: "imagingDiagnosis.radiography.skull", label: "Crânio" },
  {
    name: "imagingDiagnosis.radiography.wildSylvester",
    label: "Selvagens/Silvestres",
  },
];

const cervicalSoftParts = [
  {
    name: "imagingDiagnosis.radiography.cervicalSoftParts.larynx",
    label: "Laringe",
  },
  {
    name: "imagingDiagnosis.radiography.cervicalSoftParts.trachea",
    label: "Tráquea",
  },
];

const spineExams = [
  {
    name: "imagingDiagnosis.radiography.spine.cervical",
    label: "Cervical (C1-C7)",
  },
  {
    name: "imagingDiagnosis.radiography.spine.cervicothoracic",
    label: "Cervicotorácica (C4-T4)",
  },
  {
    name: "imagingDiagnosis.radiography.spine.thoracic",
    label: "Torácica (T1-T13)",
  },
  {
    name: "imagingDiagnosis.radiography.spine.thoracolumbar",
    label: "Teracolombar (T4-L4)",
  },
  {
    name: "imagingDiagnosis.radiography.spine.lumbar",
    label: "Lombar (L1-L7)",
  },
  {
    name: "imagingDiagnosis.radiography.spine.lumbosacral",
    label: "Lombossacral (L4-S3)",
  },
  { name: "imagingDiagnosis.radiography.spine.tail", label: "Cauda" },
];

const thoracicLimbsExams = [
  {
    name: "imagingDiagnosis.radiography.thoracicLimbs.scapula",
    label: "Escápula*",
  },
  {
    name: "imagingDiagnosis.radiography.thoracicLimbs.shoulder",
    label: "Ombro",
  },
  {
    name: "imagingDiagnosis.radiography.thoracicLimbs.humerus",
    label: "Úmero",
  },
  {
    name: "imagingDiagnosis.radiography.thoracicLimbs.elbow",
    label: "Cotovelo",
  },
  {
    name: "imagingDiagnosis.radiography.thoracicLimbs.radiusUlna",
    label: "Radio/Ulna",
  },
  {
    name: "imagingDiagnosis.radiography.thoracicLimbs.carpusMetacarpusPhalanges",
    label: "Carpo/Metacarpos/Falanges",
  },
];

const pelvicLimbsExams = [
  {
    name: "imagingDiagnosis.radiography.pelvicLimbs.coxofemoral",
    label: "Coxofemoral (Pelve)*",
  },
  { name: "imagingDiagnosis.radiography.pelvicLimbs.femur", label: "Fêmur" },
  { name: "imagingDiagnosis.radiography.pelvicLimbs.knee", label: "Joelho" },
  {
    name: "imagingDiagnosis.radiography.pelvicLimbs.tibiaTibula",
    label: "Tíbia/Fíbula",
  },
  {
    name: "imagingDiagnosis.radiography.pelvicLimbs.tarsusMetatarsusPhalanges",
    label: "Tarso/Metatarso/Falanges",
    labelClassName: "text-[10px] font-medium",
  },
];

const contrastStudiesExams = [
  {
    name: "imagingDiagnosis.radiography.contrastStudies.retrogradeUrography",
    label: "Cistografia Retrógrada",
  },
  {
    name: "imagingDiagnosis.radiography.contrastStudies.bariumEnema",
    label: "Enema Baritado",
  },
  {
    name: "imagingDiagnosis.radiography.contrastStudies.esophagogram",
    label: "Esfagograma",
  },
  {
    name: "imagingDiagnosis.radiography.contrastStudies.retrogradeUrethrography",
    label: "Uretrocistografia Retrógrada",
  },
];

export function RadiographySection({ form }: RadiographySectionProps) {
  return (
    <div className="w-full flex items-center justify-between text-primary py-2 px-4">
      <div className="w-full">
        <h3 className="text-sm font-bold mb-3">Radiografia</h3>

        {/* Exames simples */}
        <div className="flex gap-4 mb-4 justify-between items-start">
          {simpleExams.map((exam) => (
            <CheckboxField
              key={exam.name}
              form={form}
              name={exam.name}
              label={exam.label}
              checkSize="sm"
            />
          ))}

          <div className="flex flex-col gap-1">
            <CheckboxField
              form={form}
              name="imagingDiagnosis.radiography.cervicalSoftParts.checked"
              label="Cervical (Partes Moles)"
              checkSize="sm"
            />
            <div className="flex gap-1 items-center justify-end">
              {cervicalSoftParts.map((exam) => (
                <CheckboxField
                  key={exam.name}
                  form={form}
                  name={exam.name}
                  label={exam.label}
                  labelClassName="text-[10px] font-medium"
                  checkSize="sm"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Grid com 4 colunas para os exames específicos */}
        <div className="grid grid-cols-4 gap-4 mt-4">
          {/* Coluna 1: Coluna */}
          <div className="space-y-1">
            <CheckboxField
              form={form}
              name="imagingDiagnosis.radiography.spine.checked"
              label="Coluna*"
              labelClassName="text-[10px] font-bold"
            />
            {spineExams.map((exam) => (
              <CheckboxField
                key={exam.name}
                form={form}
                name={exam.name}
                label={exam.label}
                labelClassName="text-[10px] font-medium"
              />
            ))}
          </div>

          {/* Coluna 2: Membros Torácicos */}
          <div className="space-y-1">
            <CheckboxField
              form={form}
              name="imagingDiagnosis.radiography.thoracicLimbs.checked"
              label="Membros Torácicos*"
              labelClassName="text-[10px] font-bold"
            />
            <div className="flex gap-2">
              <CheckboxField
                form={form}
                name="imagingDiagnosis.radiography.thoracicLimbs.right"
                label="Direito"
                labelClassName="text-[10px] font-medium"
              />
              <CheckboxField
                form={form}
                name="imagingDiagnosis.radiography.thoracicLimbs.left"
                label="Esquerdo"
                labelClassName="text-[10px] font-medium"
              />
            </div>
            {thoracicLimbsExams.map((exam) => (
              <CheckboxField
                key={exam.name}
                form={form}
                name={exam.name}
                label={exam.label}
                labelClassName="text-[10px] font-medium"
              />
            ))}
          </div>

          {/* Coluna 3: Membros Pélvicos */}
          <div className="space-y-1">
            <CheckboxField
              form={form}
              name="imagingDiagnosis.radiography.pelvicLimbs.checked"
              label="Membros Pélvicos"
              labelClassName="text-[10px] font-bold"
            />
            {pelvicLimbsExams.map((exam) => (
              <CheckboxField
                key={exam.name}
                form={form}
                name={exam.name}
                label={exam.label}
                labelClassName="text-[10px] font-medium"
              />
            ))}
          </div>

          {/* Coluna 4: Contrastadas */}
          <div className="space-y-1">
            <CheckboxField
              form={form}
              name="imagingDiagnosis.radiography.contrastStudies.checked"
              label="Contrastadas"
              labelClassName="text-[10px] font-bold"
            />
            {contrastStudiesExams.map((exam) => (
              <CheckboxField
                key={exam.name}
                form={form}
                name={exam.name}
                label={exam.label}
                labelClassName="text-[10px] font-medium"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
