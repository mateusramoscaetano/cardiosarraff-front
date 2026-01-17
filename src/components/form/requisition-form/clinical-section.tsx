import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/form/form";

import { UseFormReturn } from "react-hook-form";
import { RequisitionFormData } from "./types";
import { Textarea } from "@/components/ui/text-area";

interface ClinicalSectionProps {
  form: UseFormReturn<RequisitionFormData>;
}
