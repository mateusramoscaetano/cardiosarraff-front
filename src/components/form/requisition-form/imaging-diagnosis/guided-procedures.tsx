import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/form/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
export function GuidedProcedures({ form }: { form: any }) {
  return (
    <div className="w-full flex items-center justify-between bg-pink-card text-primary py-2 px-4">
      <div className="w-full">
        <h3 className="text-sm font-bold mb-3">Procedimentos Ecoguiados</h3>
        <div className="flex  gap-4">
          <FormField
            control={form.control}
            name="imagingDiagnosis.guidedProcedures.cystocentesis"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-1">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="size-3"
                    checkSize="sm"
                  />
                </FormControl>
                <FormLabel className="text-xs font-medium">
                  Cistocentese
                </FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imagingDiagnosis.guidedProcedures.abdominocentesis"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-1">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="size-3"
                    checkSize="sm"
                  />
                </FormControl>
                <FormLabel className="text-xs font-medium">
                  Abdominocentese
                </FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imagingDiagnosis.guidedProcedures.thoracocentesis"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-1">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="size-3"
                    checkSize="sm"
                  />
                </FormControl>
                <FormLabel className="text-xs font-medium">
                  Toracocentese
                </FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imagingDiagnosis.guidedProcedures.aspirativeCytology.checked"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-1">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="size-3"
                    checkSize="sm"
                  />
                </FormControl>
                <FormLabel className="text-xs font-medium">
                  Citologia Aspirativa (Região
                </FormLabel>
                <FormField
                  control={form.control}
                  name="imagingDiagnosis.guidedProcedures.aspirativeCytology.region"
                  render={({ field: regionField }) => (
                    <FormControl>
                      <Input
                        icon={false}
                        {...regionField}
                        value={(regionField.value as string) || ""}
                        buttonSize="sm"
                        className="w-32"
                        lineColor="blue"
                      />
                    </FormControl>
                  )}
                />
                <FormLabel className="text-xs font-medium">)</FormLabel>
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}
