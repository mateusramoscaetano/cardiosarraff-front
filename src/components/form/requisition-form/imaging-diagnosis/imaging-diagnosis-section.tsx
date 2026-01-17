import { UseFormReturn } from "react-hook-form";
import { RequisitionFormData } from "../types";
import { FormTitle } from "../form-title";
import { ImagingDiagnosisHeading } from "./heading";
import { Ultrasound } from "./ultrasound";
import { Cardiology } from "./cardiology";
import { GuidedProcedures } from "./guided-procedures";
import { RadiographySection } from "./radiography-section";
import { Tomography } from "./tomography";
import { SedationSection } from "./sedation-section";
import { Observations } from "./observations";

interface ImagingDiagnosisSectionProps {
  form: UseFormReturn<RequisitionFormData>;
}

export function ImagingDiagnosisSection({
  form,
}: ImagingDiagnosisSectionProps) {
  return (
    <div className="">
      <ImagingDiagnosisHeading form={form} />
      <Ultrasound form={form} />
      <Cardiology form={form} />
      <GuidedProcedures form={form} />
      <RadiographySection form={form} />
      <Tomography form={form} />
      <Observations />
      <SedationSection form={form} />
    </div>
  );
}
