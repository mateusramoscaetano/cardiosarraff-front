import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
} from "@/components/form/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { RequisitionFormData } from "../types";

interface TomographyProps {
  form: UseFormReturn<RequisitionFormData>;
}

export function Tomography({ form }: TomographyProps) {
  return (
    <div className="w-full flex items-center justify-between bg-pink-card text-primary py-2 px-4">
      <div className="w-full">
        <h3 className="text-sm font-bold mb-3">Tomografia**</h3>

        <div className="flex flex-col gap-2 mb-4">
          <div className="grid grid-cols-8 gap-1">
            {/* Abdômen */}
            <FormField
              control={form.control}
              name="imagingDiagnosis.tomography.abdomen"
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
                  <FormLabel className="text-xs font-medium">Abdômen</FormLabel>
                </FormItem>
              )}
            />

            {/* Tórax */}
            <FormField
              control={form.control}
              name="imagingDiagnosis.tomography.thorax"
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
                  <FormLabel className="text-xs font-medium">Tórax</FormLabel>
                </FormItem>
              )}
            />

            {/* Cabeça - Região */}
            <div className="flex items-center space-x-2 col-span-3">
              <FormField
                control={form.control}
                name="imagingDiagnosis.tomography.head.checked"
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
                      Cabeça - Região:
                    </FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="imagingDiagnosis.tomography.head.region"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        className="text-xs max-w-[122px] w-full"
                        icon={false}
                        buttonSize="sm"
                        lineColor="blue"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Coluna - Região */}
            <div className="flex items-center space-x-2 col-span-3">
              <FormField
                control={form.control}
                name="imagingDiagnosis.tomography.spine.checked"
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
                      Coluna - Região:
                    </FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="imagingDiagnosis.tomography.spine.region"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        className="text-xs max-w-[132px] w-full"
                        icon={false}
                        buttonSize="sm"
                        lineColor="blue"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-1">
            {/* Membro Torácico - Região */}
            <div className="flex items-center space-x-2">
              <FormField
                control={form.control}
                name="imagingDiagnosis.tomography.thoracicLimb.checked"
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
                      Membro Torácico - Região:
                    </FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="imagingDiagnosis.tomography.thoracicLimb.region"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        className="text-xs max-w-[165px]"
                        icon={false}
                        buttonSize="sm"
                        lineColor="blue"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Membro Pélvico - Região */}
            <div className="flex items-center space-x-2">
              <FormField
                control={form.control}
                name="imagingDiagnosis.tomography.pelvicLimb.checked"
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
                      Membro Pélvico - Região:
                    </FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="imagingDiagnosis.tomography.pelvicLimb.region"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        className="text-xs max-w-[170px] w-full"
                        icon={false}
                        buttonSize="sm"
                        lineColor="blue"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Outros */}
          <div className="flex items-center space-x-2">
            <FormField
              control={form.control}
              name="imagingDiagnosis.tomography.others"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-1">
                  <FormControl>
                    <Checkbox
                      checked={!!field.value}
                      onCheckedChange={(checked) =>
                        field.onChange(checked ? "" : undefined)
                      }
                      className="size-3"
                      checkSize="sm"
                    />
                  </FormControl>
                  <FormLabel className="text-xs font-medium">Outros:</FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imagingDiagnosis.tomography.others"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      className="min-w-[calc(714px-72px)] text-xs"
                      placeholder=""
                      icon={false}
                      buttonSize="sm"
                      lineColor="blue"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
