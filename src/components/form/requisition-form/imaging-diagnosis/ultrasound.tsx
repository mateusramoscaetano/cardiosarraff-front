import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/form/form";
import { Checkbox } from "@/components/ui/checkbox";
export function Ultrasound({ form }: { form: any }) {
  return (
    <div className="w-full flex items-center  bg-pink-card text-primary py-2 px-4 mt-4">
      <div className="w-full">
        <h3 className="text-sm font-bold mb-3">Ultrassonografia</h3>
        <div className="flex  gap-4">
          <FormField
            control={form.control}
            name="imagingDiagnosis.ultrasound.abdominal"
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
                <FormLabel className="text-xs font-medium">Abdominal</FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imagingDiagnosis.ultrasound.gestational"
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
                  Gestacional
                </FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imagingDiagnosis.ultrasound.cervical"
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
                <FormLabel className="text-xs font-medium">Cervical</FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imagingDiagnosis.ultrasound.ocular"
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
                <FormLabel className="text-xs font-medium">Ocular</FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imagingDiagnosis.ultrasound.fast"
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
                <FormLabel className="text-xs font-medium">FAST</FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imagingDiagnosis.ultrasound.thoracic"
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
                <FormLabel className="text-xs font-medium">Torácico</FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imagingDiagnosis.ultrasound.monitoring"
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
                  Acompanhamento
                </FormLabel>
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}
