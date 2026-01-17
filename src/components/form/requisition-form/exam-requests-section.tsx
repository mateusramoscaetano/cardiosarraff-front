import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/form/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { ReactSketchCanvas } from "react-sketch-canvas";

import { UseFormReturn } from "react-hook-form";
import { RequisitionFormData } from "./types";
import { Checkbox } from "@/components/ui/checkbox";
import { FormTitle } from "./form-title";
import { useRef } from "react";

interface ExamRequestsSectionProps {
  form: UseFormReturn<RequisitionFormData>;
}

export function ExamRequestsSection({ form }: ExamRequestsSectionProps) {
  const { register } = form;
  const ventralCanvasRef = useRef<any>(null);
  const dorsalCanvasRef = useRef<any>(null);

  const canvasStyles = {
    border: "none",
    borderRadius: "0.25rem",
    background: "transparent",
  };

  return (
    <div className="">
      <FormTitle title="Solicitação de Exames" />

      <div className="grid grid-cols-3 gap-2 text-primary">
        <div className="flex items-center space-x-2  p-4 rounded-md max-h-[100px] border-2 border-pink-card">
          <Checkbox id="checkUpI" {...register("examRequests.checkUpI")} />
          <label
            htmlFor="checkUpI"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Check Up I <br />
            <span className="text-[10px] ">
              Hemograma, Albumina, ALT, FA, Creatinina, Uréia e Glicose
            </span>
          </label>
        </div>

        <div className="flex items-center space-x-2  p-4 rounded-md max-h-[100px] border-2 border-pink-card">
          <Checkbox id="checkUpII" {...register("examRequests.checkUpII")} />
          <label
            htmlFor="checkUpII"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Check Up II <br />
            <span className="text-[10px] ">
              Hemograma, Albumina, ALT, FA, Creatinina, Uréia, Glicose,
              Proteínas Totais e Frações
            </span>
          </label>
        </div>

        <div className="flex items-center space-x-2  p-4 rounded-md max-h-[100px] border-2 border-pink-card">
          <Checkbox
            id="checkUpCompleto"
            {...register("examRequests.checkUpCompleto")}
          />
          <label
            htmlFor="checkUpCompleto"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Check Up Completo <br />
            <span className="text-[10px] ">
              Hemograma, Albumina, ALT, FA, Creatinina, Uréia, Glicose e
              Proteínas Totais e Frações, Colesterol total e Triglicerídeos
            </span>
          </label>
        </div>

        <div className="flex items-center space-x-2  p-4 rounded-md max-h-[100px] bg-pink-card">
          <Checkbox
            id="perfilFelino"
            {...register("examRequests.perfilFelino")}
          />
          <label
            htmlFor="perfilFelino"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Perfil Felino <br />
            <span className="text-[10px] ">
              Hemograma, Albumina, AST, ALT, GGT, Creatinina, Uréia, Glicose,
              Proteínas Totais e Frações
            </span>
          </label>
        </div>

        <div className="flex items-center space-x-2  p-4 rounded-md max-h-[100px] bg-pink-card">
          <Checkbox
            id="perfilGeriatrico"
            {...register("examRequests.perfilGeriatrico")}
          />
          <label
            htmlFor="perfilGeriatrico"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Perfil Geriátrico <br />
            <span className="text-[10px] ">
              ALT, Colesterol Total, Creatinina, Fosfatase Alcalina, Glicose,
              Hemograma Completo, Uréia, Proteínas Totais e Frações
            </span>
          </label>
        </div>

        <div className="flex items-center space-x-2  p-4 rounded-md max-h-[100px] bg-pink-card">
          <Checkbox
            id="perfilHepático"
            {...register("examRequests.perfilHepatico")}
          />
          <label
            htmlFor="perfilHepático"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Perfil Hepático <br />
            <span className="text-[10px] ">
              ALT, AST, FA, GGT, Hemograma Completo, Proteínas Totais e Frações,
              Uréias, Bilirrubinas e Frações
            </span>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-2 text-primary">
        <div className="flex items-center space-x-2  p-4 rounded-md max-h-[50px] border-2 border-pink-card">
          <Checkbox
            id="perfilNeoplastico"
            {...register("examRequests.perfilNeoplastico")}
          />
          <label
            htmlFor="perfilNeoplastico"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Perfil Neoplástico <br />
            <span className="text-[10px] ">
              ALT, FA, Creatinina, Cálcio Total, Uréia e Hemograma
            </span>
          </label>
        </div>

        <div className="flex items-center space-x-2  p-4 rounded-md max-h-[50px] border-2 border-pink-card">
          <Checkbox
            id="perfilRenal"
            {...register("examRequests.perfilRenal")}
          />
          <label
            htmlFor="perfilRenal"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Perfil Renal <br />
            <span className="text-[10px] ">
              Hemograma, Creatinina, Uréia, Fósforo e Cálcio Total
            </span>
          </label>
        </div>

        <div className="flex items-center space-x-2  p-4 rounded-md max-h-[50px] bg-pink-card">
          <Checkbox
            id="perfilPancreaticoCaninoI"
            {...register("examRequests.perfilPancreaticoCaninoI")}
          />
          <label
            htmlFor="perfilPancreaticoCaninoI"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Perfil Pancreático Canino I <br />
            <span className="text-[10px] ">
              ALT, FA, Glicose, Hemograma Completo, Lipase Pancreática
              Específica Canino
            </span>
          </label>
        </div>

        <div className="flex items-center space-x-2  p-4 rounded-md max-h-[50px]  bg-pink-card">
          <Checkbox
            id="perfilPancreaticoFelinoI"
            {...register("examRequests.perfilPancreaticoFelinoI")}
          />
          <label
            htmlFor="perfilPancreaticoFelinoI"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Perfil Pancreático Felino I <br />
            <span className="text-[10px] ">
              ALT, FA, Glicose, Hemograma Completo, Lipase Pancreática
              Específica Felino
            </span>
          </label>
        </div>

        <div className="flex items-center space-x-2  p-4 rounded-md max-h-[25px] border-2 border-pink-card">
          <Checkbox
            id="lipasePancreaticaCanina"
            {...register("examRequests.lipasePancreaticaCanina")}
          />
          <label
            htmlFor="lipasePancreaticaCanina"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex gap-2 items-center justify-between "
          >
            Lipase Pancreática Canina <br />
            <span className="text-[10px] ">Análise Específica</span>
          </label>
        </div>

        <div className="flex items-center space-x-2  p-4 rounded-md max-h-[25px] border-2 border-pink-card">
          <Checkbox
            id="lipasePancreaticaFelina"
            {...register("examRequests.lipasePancreaticaFelina")}
          />
          <label
            htmlFor="lipasePancreaticaFelina"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex gap-2 items-center justify-between "
          >
            Lipase Pancreática Felina <br />
            <span className="text-[10px] ">Análise Específica</span>
          </label>
        </div>

        <div className="flex items-center space-x-2 border p-4 rounded-md max-h-[40px] bg-pink-card">
          <Checkbox
            id="coproparasitologico"
            {...register("examRequests.parasitological")}
          />
          <label
            htmlFor="coproparasitologico"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Coproparasitológico <br />
            <span className="text-[10px] ">
              Pesquisa de Parasitas, Ovos, Larvas e Adultos
            </span>
          </label>
        </div>

        <div className="flex items-center space-x-2 border p-4 rounded-md max-h-[40px] bg-pink-card">
          <Checkbox id="urinálise" {...register("examRequests.urinalysis")} />
          <label
            htmlFor="urinálise"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Urinálise <br />
            <span className="text-[10px] ">
              Exame Químico, Físico e Avaliação do Sedimento Urinário
            </span>
          </label>
        </div>
      </div>

      <div>
        {/* Citologia and Lesion Distribution */}
        <div className="flex items-center text-primary  py-1 px-4 rounded-md mt-2 border-2 border-pink-card relative">
          <div className="items-center justify-between space-x-2 w-full max-w-[250px]">
            <Checkbox id="cytology" {...register("examRequests.cytology")} />
            <label
              htmlFor="cytology"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Citologia
            </label>
          </div>

          <p className="text-sm font-medium mt-2">
            Distribuição <br /> das lesões
          </p>

          <div className="flex w-full mt-2 items-end justify-end gap-4">
            <div className="flex flex-col items-center w-[150px]">
              <div className="relative w-[150px] h-[75px]">
                <Image
                  src="/ventral.png"
                  alt="Ventral view"
                  width={150}
                  height={75}
                  className="absolute top-0 left-0 z-0"
                />
                <ReactSketchCanvas
                  ref={ventralCanvasRef}
                  width="150px"
                  height="75px"
                  strokeWidth={5}
                  strokeColor="#D1BAA2"
                  style={canvasStyles}
                  className="absolute top-0 left-0 z-10"
                  backgroundImage="none"
                />
              </div>

              <span className="text-xs mt-1">ventral</span>
            </div>
            <div className="flex flex-col items-center w-[150px]">
              <div className="relative w-[150px] h-[75px]">
                <Image
                  src="/dorsal.png"
                  alt="Dorsal view"
                  width={150}
                  height={75}
                  className="absolute top-0 left-0 z-0"
                />
                <ReactSketchCanvas
                  ref={dorsalCanvasRef}
                  width="150px"
                  height="75px"
                  strokeWidth={5}
                  strokeColor="#D1BAA2"
                  style={canvasStyles}
                  className="absolute top-0 left-0 z-10"
                  backgroundImage="none"
                />
              </div>
              <span className="text-xs mt-1">dorsal</span>
            </div>
          </div>

          <span
            onClick={() => {
              ventralCanvasRef.current?.clearCanvas();
              dorsalCanvasRef.current?.clearCanvas();
            }}
            className="text-xs mt-1 text-blue-600 hover:text-blue-800 cursor-pointer print-hidden absolute right-1 bottom-1"
          >
            limpar
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-2">
          <div className="flex items-center text-primary space-x-2  bg-pink-card p-4 rounded-md col-span-1 max-h-[102px] ">
            <Checkbox
              id="citologiaOtologicaUnilateral"
              {...register("examRequests.citologiaOtologicaUnilateral")}
            />
            <label
              htmlFor="citologiaOtologicaUnilateral"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Citologia Otológica Unilateral <br />
              <span className="text-[10px] ">
                Pesquisa de Bactérias + Fungos
              </span>
            </label>
          </div>

          <div className="flex flex-col text-primary bg-pink-card py-2 px-4 rounded-md col-span-2 ">
            <div className="flex items-center space-x-2 mb-2">
              <Checkbox
                id="citologiaDaPeleChecked"
                {...register("examRequests.citologiaDaPele.checked")}
              />
              <label
                htmlFor="citologiaDaPeleChecked"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Citologia da pele
              </label>
            </div>

            <div className="grid grid-cols-2 ">
              <FormField
                control={form.control}
                name="examRequests.citologiaDaPele.regiaoAmostra"
                render={({ field }) => (
                  <FormItem className=" flex items-center ">
                    <FormLabel className="text-xs text-primary">
                      Região da amostra:
                    </FormLabel>
                    <FormControl>
                      <Input
                        icon={false}
                        id="regiaoAmostra"
                        {...field}
                        buttonSize="sm"
                        className="max-w-[100px]"
                        lineColor="blue"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="examRequests.citologiaDaPele.tempoEvolucao"
                render={({ field }) => (
                  <FormItem className=" flex items-center  ">
                    <FormLabel className="text-xs text-primary">
                      Tempo de evolução:
                    </FormLabel>
                    <FormControl>
                      <Input
                        icon={false}
                        id="tempoEvolucao"
                        {...field}
                        buttonSize="sm"
                        className="max-w-[100px]"
                        lineColor="blue"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 ">
              <FormField
                control={form.control}
                name="examRequests.citologiaDaPele.formaDeColeta"
                render={({ field }) => (
                  <FormItem className=" flex items-center  ">
                    <FormLabel className="text-xs text-primary">
                      Forma de coleta:
                    </FormLabel>
                    <FormControl>
                      <Input
                        icon={false}
                        id="formaDeColeta"
                        {...field}
                        buttonSize="sm"
                        className="max-w-[120px]"
                        lineColor="blue"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="examRequests.citologiaDaPele.suspeitaClinica"
                render={({ field }) => (
                  <FormItem className=" flex items-center  ">
                    <FormLabel className="text-xs text-primary">
                      Suspeita clínica:
                    </FormLabel>
                    <FormControl>
                      <Input
                        icon={false}
                        id="suspeitaClinica"
                        {...field}
                        buttonSize="sm"
                        className="max-w-[125px]"
                        lineColor="blue"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="examRequests.citologiaDaPele.consideracoes"
              render={({ field }) => (
                <FormItem className=" flex items-center  ">
                  <FormLabel className="text-xs text-primary">
                    Considerações:
                  </FormLabel>
                  <FormControl>
                    <Input
                      icon={false}
                      id="consideracoes"
                      {...field}
                      buttonSize="sm"
                      className="min-w-[360px]"
                      lineColor="blue"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4 border p-4 rounded-md">
        <h3 className="text-lg font-semibold">Hematologia/hemostasia</h3>
        <div className="grid grid-cols-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="hemogramaCompleto"
              {...register(
                "examRequests.hematologyHemostasis.hemogramaCompleto"
              )}
            />
            <label
              htmlFor="hemogramaCompleto"
              className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Hemograma Completo
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="pesquisaHemoparasitas"
              {...register(
                "examRequests.hematologyHemostasis.pesquisaHemoparasitas"
              )}
            />
            <label
              htmlFor="pesquisaHemoparasitas"
              className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Pesquisa de Hemoparasitas
            </label>
          </div>
          <div className="flex items-center space-x-2 col-span-2">
            <Checkbox
              id="hemogasometriaChecked"
              {...register(
                "examRequests.hematologyHemostasis.hemogasometria.checked"
              )}
            />
            <label
              htmlFor="hemogasometriaChecked"
              className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Hemogasometria (°C)
            </label>
            <Input
              id="hemogasometriaGrau"
              {...register(
                "examRequests.hematologyHemostasis.hemogasometria.grau"
              )}
              className="max-w-[60px]"
              buttonSize="sm"
              icon={false}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="contagemPlaquetas"
              {...register(
                "examRequests.hematologyHemostasis.contagemPlaquetas"
              )}
            />
            <label
              htmlFor="contagemPlaquetas"
              className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Contagem de Plaquetas
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="pesquisaMicrofilaria"
              {...register(
                "examRequests.hematologyHemostasis.pesquisaMicrofilaria"
              )}
            />
            <label
              htmlFor="pesquisaMicrofilaria"
              className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Pesquisa de Microfilaria
            </label>
          </div>
          <div className="flex items-center space-x-2 col-span-2">
            <Checkbox
              id="compatibilidadeSanguineaChecked"
              {...register(
                "examRequests.hematologyHemostasis.compatibilidadeSanguinea.checked"
              )}
            />
            <label
              htmlFor="compatibilidadeSanguineaChecked"
              className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Compatibilidade sanguínea (N° doadores)
            </label>
            <Input
              id="compatibilidadeSanguineaNumeroDoadores"
              {...register(
                "examRequests.hematologyHemostasis.compatibilidadeSanguinea.numeroDoadores"
              )}
              className="max-w-[60px]"
              buttonSize="sm"
              icon={false}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="contagemPlaquetasProteinaPlasmatica"
              {...register(
                "examRequests.hematologyHemostasis.contagemPlaquetasProteinaPlasmatica"
              )}
            />
            <label
              htmlFor="contagemPlaquetasProteinaPlasmatica"
              className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Contagem de Plaquetas e Proteína Plasmática
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="hematocritoProteinaPlasmatica"
              {...register(
                "examRequests.hematologyHemostasis.hematocritoProteinaPlasmatica"
              )}
            />
            <label
              htmlFor="hematocritoProteinaPlasmatica"
              className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Hematócrito e Proteína Plasmática
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="tpTtpa"
              {...register("examRequests.hematologyHemostasis.tpTtpa")}
            />
            <label
              htmlFor="tpTtpa"
              className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              TP+TTPA
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
