import { RequisitionFormData } from "@/components/form/requisition-form/types";
import Image from "next/image";

interface ExamRequestsPDFSectionProps {
  data: RequisitionFormData["examRequests"];
}

const textStyles = "text-sm font-sans";

export function ExamRequestsPDFSection({ data }: ExamRequestsPDFSectionProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-md font-semibold">Solicitação de Exames:</h3>
      <div className="grid grid-cols-2 gap-2">
        {data.bloodCount && <div className={textStyles}>• Hemograma</div>}
        {data.biochemical && <div className={textStyles}>• Bioquímico</div>}
        {data.urinalysis && <div className={textStyles}>• Urinálise</div>}
        {data.parasitological && (
          <div className={textStyles}>• Parasitológico</div>
        )}
        {data.cytology && <div className={textStyles}>• Citologia</div>}
        {data.antibiogram && <div className={textStyles}>• Antibiograma</div>}
        {data.checkUpI && (
          <div className={textStyles}>
            • Check Up I: Hemograma, Albumina, ALT, FA, Creatinina, Uréia e
            Glicose
          </div>
        )}
        {data.checkUpII && (
          <div className={textStyles}>
            • Check Up II: Hemograma, Albumina, ALT, FA, Creatinina, Uréia,
            Glicose, Proteínas Totais e Frações
          </div>
        )}
        {data.checkUpCompleto && (
          <div className={textStyles}>
            • Check Up Completo: Hemograma, Albumina, ALT, FA, Creatinina,
            Uréia, Glicose e Proteínas Totais e Frações, Coleterol total e
            Triglicerídeos
          </div>
        )}
        {data.perfilFelino && (
          <div className={textStyles}>
            • Perfil Felino: Hemograma, Albumina, AST, ALT, GGT, Creatinina,
            Uréia, Glicose, Proteínas Totais e Frações
          </div>
        )}
        {data.perfilGeriatrico && (
          <div className={textStyles}>
            • Perfil Geriátrico: ALT, Colesterol Total, Creatinina, Fosfatase
            Alcalina, Glicose, Hemograma Completo, Uréia, Proteínas Totais e
            Frações
          </div>
        )}
        {data.perfilHepatico && (
          <div className={textStyles}>
            • Perfil Hepático: ALT, AST, FA, GGT, Hemograma Completo, Proteínas
            Totais e Frações, Uréias, Bilirrubinas e Frações
          </div>
        )}
        {data.perfilNeoplastico && (
          <div className={textStyles}>
            • Perfil Neoplástico: ALT, FA, Creatinina, Cálcio Total, Uréia e
            Hemograma
          </div>
        )}
        {data.perfilRenal && (
          <div className={textStyles}>
            • Perfil Renal: Hemograma, Creatinina, Uréia, Fósforo e Cálcio Total
          </div>
        )}
        {data.perfilPancreaticoCaninoI && (
          <div className={textStyles}>
            • Perfil Pancreático Canino I: ALT, FA, Glicose, Hemograma Completo,
            Lipase Pancreática Específica Canino
          </div>
        )}
        {data.perfilPancreaticoFelinoI && (
          <div className={textStyles}>
            • Perfil Pancreático Felino I: ALT, FA, Glicose, Hemograma Completo,
            Lipase Pancreática Específica Felino
          </div>
        )}
        {data.lipasePancreaticaCanina && (
          <div className={textStyles}>
            • Lipase Pancreática Canina: Análise Específica
          </div>
        )}
        {data.lipasePancreaticaFelina && (
          <div className={textStyles}>
            • Lipase Pancreática Felina: Análise Específica
          </div>
        )}
        {data.citologiaOtologicaUnilateral && (
          <div className={textStyles}>
            • Citologia Otológica Unilateral: Pesquisa de Bactérias + Fungos
          </div>
        )}
        {data.cytology && (
          <div className="flex flex-col items-start space-y-2 border p-4 rounded-md col-span-full md:col-span-1">
            <div className="flex items-center space-x-2">
              <div className={textStyles}>• Citologia</div>
            </div>
            <p className="text-sm font-medium mt-2">Distribuição das lesões</p>
            <div className="flex justify-around w-full mt-2">
              <div className="flex flex-col items-center">
                <Image
                  src="/ventral.png"
                  alt="Ventral view"
                  width={100}
                  height={100}
                />
                <span className="text-xs text-gray-500">ventral</span>
              </div>
              <div className="flex flex-col items-center">
                <Image
                  src="/dorsal.png"
                  alt="Dorsal view"
                  width={100}
                  height={100}
                />
                <span className="text-xs text-gray-500">dorsal</span>
              </div>
            </div>
          </div>
        )}
        {data.citologiaDaPele?.checked && (
          <div className="flex flex-col space-y-2 border p-4 rounded-md col-span-2">
            <div className={textStyles}>• Citologia da Pele</div>
            {data.citologiaDaPele.regiaoAmostra && (
              <div className={`${textStyles} ml-4`}>
                Região da amostra: {data.citologiaDaPele.regiaoAmostra}
              </div>
            )}
            {data.citologiaDaPele.tempoEvolucao && (
              <div className={`${textStyles} ml-4`}>
                Tempo de evolução: {data.citologiaDaPele.tempoEvolucao}
              </div>
            )}
            {data.citologiaDaPele.suspeitaClinica && (
              <div className={`${textStyles} ml-4`}>
                Suspeita clínica: {data.citologiaDaPele.suspeitaClinica}
              </div>
            )}
            {data.citologiaDaPele.consideracoes && (
              <div className={`${textStyles} ml-4`}>
                Considerações: {data.citologiaDaPele.consideracoes}
              </div>
            )}
          </div>
        )}

        {data.hematologyHemostasis?.hemogramaCompleto && (
          <div className={textStyles}>• Hemograma Completo</div>
        )}
        {data.hematologyHemostasis?.contagemPlaquetas && (
          <div className={textStyles}>• Contagem de Plaquetas</div>
        )}
        {data.hematologyHemostasis?.contagemPlaquetasProteinaPlasmatica && (
          <div className={textStyles}>
            • Contagem de Plaquetas e Proteína Plasmática
          </div>
        )}
        {data.hematologyHemostasis?.pesquisaHemoparasitas && (
          <div className={textStyles}>• Pesquisa de Hemoparasitas</div>
        )}
        {data.hematologyHemostasis?.pesquisaMicrofilaria && (
          <div className={textStyles}>• Pesquisa de Microfilaria</div>
        )}
        {data.hematologyHemostasis?.hematocritoProteinaPlasmatica && (
          <div className={textStyles}>• Hematócrito e Proteína Plasmática</div>
        )}
        {data.hematologyHemostasis?.hemogasometria?.checked && (
          <div className={`${textStyles} col-span-2`}>
            • Hemogasometria (°C:{" "}
            {data.hematologyHemostasis.hemogasometria.grau})
          </div>
        )}
        {data.hematologyHemostasis?.compatibilidadeSanguinea?.checked && (
          <div className={`${textStyles} col-span-2`}>
            • Compatibilidade sanguínea (N° doadores:
            {data.hematologyHemostasis.compatibilidadeSanguinea.numeroDoadores})
          </div>
        )}
        {data.hematologyHemostasis?.tpTtpa && (
          <div className={textStyles}>• TP+TTPA</div>
        )}
        {data.other && <div className={textStyles}>• Outros: {data.other}</div>}
      </div>
    </div>
  );
}
