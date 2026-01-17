import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/form/form";
import { Checkbox } from "@/components/ui/checkbox";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { useRef } from "react";

export function SedationSection({ form }: { form: any }) {
  const signatureCanvasRef = useRef<any>(null);

  const handleSignatureChange = async (paths: any, field: any) => {
    try {
      if (paths && paths.length > 0) {
        const svgData = await signatureCanvasRef.current?.exportSvg();
        if (svgData) {
          field.onChange(svgData);
        }
      } else {
        field.onChange("");
      }
    } catch (error) {
      console.error("Erro ao capturar assinatura:", error);
      field.onChange("assinado");
    }
  };

  const handleClearSignature = (field: any) => {
    signatureCanvasRef.current?.clearCanvas();
    field.onChange("");
  };

  return (
    <div className="w-full text-primary py-2 px-4 mt-4">
      <div className="w-full">
        <div className="flex items-center space-x-1 mb-1">
          <FormField
            control={form.control}
            name="imagingDiagnosis.sedation.required"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="size-3"
                    checkSize="sm"
                  />
                </FormControl>
                <FormLabel className="text-xs font-medium">
                  Exame sob sedação
                </FormLabel>
              </FormItem>
            )}
          />
        </div>

        {/* Texto de autorização e campo de assinatura */}
        <div className="flex  space-x-2">
          <p className="text-xs font-medium">
            Caso seja necessário, autorizo que o paciente de minha
            responsabilidade seja sedado.
          </p>

          <FormField
            control={form.control}
            name="imagingDiagnosis.sedation.signature"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-1">
                <FormLabel className="text-primary text-xs ">
                  Assinatura:
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <ReactSketchCanvas
                      ref={signatureCanvasRef}
                      width="220px"
                      height="80px"
                      strokeWidth={2}
                      strokeColor="#000000"
                      style={{
                        border: "none",
                        borderRadius: "0.25rem",
                        background: "transparent",
                      }}
                      backgroundImage="none"
                      onChange={(paths) => handleSignatureChange(paths, field)}
                      allowOnlyPointerType="all"
                      className="absolute -right-30 -top-10 bg-transparent border-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleClearSignature(field)}
                      className="absolute top-1 right-1 text-xs text-red-600 hover:text-red-800 cursor-pointer bg-white px-1 rounded print-hidden"
                    >
                      limpar
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Instruções importantes */}
        <div className="mt-4 p-3 bg-primary text-pink-card rounded-t-lg text-center">
          <p className="text-[10px] leading-relaxed">
            Para todos os exames de imagem, o ideal é o paciente estar com 8
            horas de jejum para possíveis sedações. Ao agendar exame, checar as
            necessidades de preparo. Não esqueça de levar os exames anteriores
            para comparação.
          </p>
        </div>
      </div>
    </div>
  );
}
