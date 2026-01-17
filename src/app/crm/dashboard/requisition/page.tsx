"use client";

import { useUser } from "@/hooks/use-user";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { RequisitionFormData } from "@/components/form/requisition-form/types";
import { LaboratorySection } from "@/components/form/requisition-form/laboratory-section";
import { RegistrationSection } from "@/components/form/requisition-form/registration-section";
import { ExamRequestsSection } from "@/components/form/requisition-form/exam-requests-section";
import { Form } from "@/components/form/form";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import { IndividualExamsSection } from "@/components/form/requisition-form/individual-exams-section";
import { ImagingDiagnosisSection } from "@/components/form/requisition-form/imaging-diagnosis/imaging-diagnosis-section";
import { Loader2 } from "lucide-react";
import { useCreateRequisition } from "@/hooks/requisition/use-create-requisition";

const requisitionFormSchema = z.object({
  // Dados para uso do laboratório
  protocolNumber: z.string().optional(),
  receivedDate: z.string().optional(),
  receivedTime: z.string().optional(),
  receivedBy: z.string().optional(),

  // Dados Cadastrais
  petName: z.string().min(1, "Nome do pet é obrigatório"),
  species: z.string().min(1, "Espécie é obrigatória"),
  breed: z.string().min(1, "Raça é obrigatória"),
  age: z.string().min(1, "Idade é obrigatória"),
  weight: z.string().optional(),
  gender: z.string().min(1, "Sexo é obrigatório"),
  ownerName: z.string().min(1, "Nome do proprietário é obrigatório"),
  ownerPhone: z.string().min(1, "Telefone é obrigatório"),
  ownerEmail: z.string().email("Email inválido"),
  address: z.string().optional(),

  // Informações Clínicas
  clinicalHistory: z.string().min(1, "História clínica é obrigatória"),
  mainComplaint: z.string().min(1, "Queixa principal é obrigatória"),
  physicalExam: z.string(),
  suspectedDiagnosis: z.string(),
  previousTreatment: z.string().optional(),

  // Solicitação de Exames
  examRequests: z.object({
    bloodCount: z.boolean().optional(),
    biochemical: z.boolean().optional(),
    urinalysis: z.boolean().optional(),
    parasitological: z.boolean().optional(),
    cytology: z.boolean().optional(),
    antibiogram: z.boolean().optional(),
    other: z.string().optional(),
    checkUpI: z.boolean().optional(),
    checkUpII: z.boolean().optional(),
    checkUpCompleto: z.boolean().optional(),
    perfilFelino: z.boolean().optional(),
    perfilGeriatrico: z.boolean().optional(),
    perfilHepatico: z.boolean().optional(),
    perfilNeoplastico: z.boolean().optional(),
    perfilRenal: z.boolean().optional(),
    perfilPancreaticoCaninoI: z.boolean().optional(),
    perfilPancreaticoFelinoI: z.boolean().optional(),
    lipasePancreaticaCanina: z.boolean().optional(),
    lipasePancreaticaFelina: z.boolean().optional(),
    citologiaOtologicaUnilateral: z.boolean().optional(),
    citologiaDaPele: z
      .object({
        checked: z.boolean().optional(),
        regiaoAmostra: z.string().optional(),
        tempoEvolucao: z.string().optional(),
        suspeitaClinica: z.string().optional(),
        consideracoes: z.string().optional(),
      })
      .optional(),
    hematologyHemostasis: z
      .object({
        hemogramaCompleto: z.boolean().optional(),
        contagemPlaquetas: z.boolean().optional(),
        contagemPlaquetasProteinaPlasmatica: z.boolean().optional(),
        pesquisaHemoparasitas: z.boolean().optional(),
        pesquisaMicrofilaria: z.boolean().optional(),
        hematocritoProteinaPlasmatica: z.boolean().optional(),
        hemogasometria: z
          .object({
            checked: z.boolean().optional(),
            grau: z.string().optional(),
          })
          .optional(),
        compatibilidadeSanguinea: z
          .object({
            checked: z.boolean().optional(),
            numeroDoadores: z.string().optional(),
          })
          .optional(),
        tpTtpa: z.boolean().optional(),
      })
      .optional(),
  }),

  // Solicitação de Exames Individual
  individualExams: z
    .array(
      z.object({
        examName: z.string(),
        material: z.string(),
        observations: z.string().optional(),
      })
    )
    .optional(),

  // Solicitação de Diagnóstico por Imagem
  imagingDiagnosis: z.object({
    xray: z.boolean().optional(),
    ultrasound: z.boolean().optional(),
    tomography: z.boolean().optional(),
    resonance: z.boolean().optional(),
    region: z.string().optional(),
    positioning: z.string().optional(),
    contrast: z.boolean().optional(),
    sedation: z.boolean().optional(),
  }),

  // Informações Adicionais
  additionalInfo: z.string().optional(),
  veterinarianName: z.string().min(1, "Nome do veterinário é obrigatório"),
  crmv: z.string().min(1, "CRMV é obrigatório"),
  date: z.string().min(1, "Data é obrigatória"),
});

export default function RequisitionPage({
  params,
}: {
  params: { petId: string };
}) {
  const router = useRouter();
  const { user } = useUser();
  const [showPreview, setShowPreview] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const logoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Pré-carrega a imagem
    const img = new Image();
    img.src = "/CARDIO-SARRAFF.svg";
    img.onload = () => setIsImageLoaded(true);
    img.onerror = () => {
      console.error("Erro ao carregar a imagem");
      setIsImageLoaded(true);
    };
  }, []);

  const form = useForm<RequisitionFormData>({
    mode: "onChange",
    defaultValues: {
      laboratoryUse: {
        number: "",
        date: "",
        time: "",
        paid: false,
        invoiced: false,
      },
      clinicName: "",
      petName: "",
      age: "",
      specie: "",
      race: "",
      gender: "",
      petOwner: "",
      doctorName: "",
      doctorCrmv: "",
      email: "",
      collectDate: "",
      collectTime: "",
      material: [""],
      observations: "",
      examRequests: {
        bloodCount: true,
        biochemical: false,
        urinalysis: false,
        parasitological: false,
        cytology: false,
        antibiogram: false,
        other: "",
        checkUpI: false,
        checkUpII: false,
        checkUpCompleto: false,
        perfilFelino: false,
        perfilGeriatrico: false,
        perfilHepatico: false,
        perfilNeoplastico: false,
        perfilRenal: false,
        perfilPancreaticoCaninoI: false,
        perfilPancreaticoFelinoI: false,
        lipasePancreaticaCanina: false,
        lipasePancreaticaFelina: false,
        citologiaOtologicaUnilateral: false,
        citologiaDaPele: {
          checked: false,
          regiaoAmostra: "",
          tempoEvolucao: "",
          suspeitaClinica: "",
          consideracoes: "",
        },
        hematologyHemostasis: {
          hemogramaCompleto: false,
          contagemPlaquetas: false,
          contagemPlaquetasProteinaPlasmatica: false,
          pesquisaHemoparasitas: false,
          pesquisaMicrofilaria: false,
          hematocritoProteinaPlasmatica: false,
          hemogasometria: {
            checked: false,
            grau: "",
          },
          compatibilidadeSanguinea: {
            checked: false,
            numeroDoadores: "",
          },
          tpTtpa: false,
        },
      },
      individualExams: {
        albumina: false,
        alt: false,
        amilase: false,
        ast: false,
        bilirrubinas: false,
        trigliTotalDireta: false,
        calcio: false,
        cloro: false,
        colesterol: false,
        colesterolFracoes: false,
        creatinina: false,
        creatininase: false,
        ferro: false,
        fosfataseAlcalina: false,
        fosforo: false,
        frutosamina: false,
        cgt: false,
        glicose: false,
        globulina: false,
        ldh: false,
        lipase: false,
        lipideosTotais: false,
        lipidograma: false,
        magnesio: false,
        potassio: false,
        proteinaTotal: false,
        proteinaTotalFracoes: false,
        sodio: false,
        triglicerideos: false,
        ureia: false,
        brucelose: false,
        cinomoseAg: false,
        dirofilariose: false,
        erlichiose: false,
        fivFelv: false,
        giardiase: false,
        parvoviroseCoronavirus: false,
      },
      imagingDiagnosis: {
        suspeitaClinica: "",
        previousSurgeryProcedures: "",
        observations: "",
        ultrasound: {
          abdominal: false,
          gestational: false,
          cervical: false,
          ocular: false,
          fast: false,
          thoracic: false,
          monitoring: false,
        },
        cardiology: {
          echocardiogramEchodopplercardiogram: false,
          electrocardiogram: false,
          systemicPressureMeasurement: false,
          holter: false,
          pericardiocentesis: false,
          monitoring: false,
        },
        guidedProcedures: {
          cystocentesis: false,
          abdominocentesis: false,
          thoracocentesis: false,
          aspirativeCytology: {
            checked: false,
            region: "",
          },
        },
        radiography: {
          abdominal: false,
          thorax: false,
          cervicalSoftParts: {
            checked: false,
            larynx: false,
            trachea: false,
          },
          skull: false,
          wildSylvester: false,
          spine: {
            cervical: false,
            cervicothoracic: false,
            thoracic: false,
            thoracolumbar: false,
            lumbar: false,
            lumbosacral: false,
            tail: false,
          },
          thoracicLimbs: {
            right: false,
            left: false,
            scapula: false,
            shoulder: false,
            humerus: false,
            elbow: false,
            radiusUlna: false,
            carpusMetacarpusPhalanges: false,
          },
          pelvicLimbs: {
            coxofemoral: false,
            femur: false,
            knee: false,
            tibiaTibula: false,
            tarsusMetatarsusPhalanges: false,
          },
          contrastStudies: {
            retrogradeUrography: false,
            bariumEnema: false,
            esophagogram: false,
            retrogradeUrethrography: false,
          },
        },
        tomography: {
          abdomen: false,
          thorax: false,
          head: {
            checked: false,
            region: "",
          },
          spine: {
            checked: false,
            region: "",
          },
          thoracicLimb: {
            checked: false,
            region: "",
          },
          pelvicLimb: {
            checked: false,
            region: "",
          },
          others: "",
        },
        sedation: {
          required: false,
          signature: "",
        },
      },
    },
  });

  const generatePDF = async (): Promise<Blob> => {
    if (!isImageLoaded) {
      throw new Error("Aguarde o carregamento da imagem");
    }

    const page1Element = document.querySelector(".page-1");
    const page2Element = document.querySelector(".page-2");

    if (!page1Element || !page2Element) {
      throw new Error("Elementos não encontrados");
    }

    // Aguarda um tempo maior para garantir que todos os elementos foram renderizados
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Captura cada página como PNG
    const page1DataUrl = await toPng(page1Element as HTMLElement, {
      quality: 1,
      pixelRatio: 2,
      cacheBust: true,
      skipAutoScale: true,
      includeQueryParams: true,
      imagePlaceholder:
        "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
      style: {
        transform: "none",
      },
      filter: (node) => {
        if (node instanceof HTMLElement) {
          if (node.classList.contains("print-hidden")) {
            return false;
          }
          if (window.getComputedStyle(node).position === "absolute") {
            return true;
          }
        }
        return true;
      },
      canvasWidth: 794,
      canvasHeight: 1123,
      fetchRequestInit: {
        mode: "no-cors",
      },
    });

    const page2DataUrl = await toPng(page2Element as HTMLElement, {
      quality: 1,
      pixelRatio: 2,
      cacheBust: true,
      skipAutoScale: true,
      includeQueryParams: true,
      imagePlaceholder:
        "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
      style: {
        transform: "none",
      },
      filter: (node) => {
        if (node instanceof HTMLElement) {
          if (node.classList.contains("print-hidden")) {
            return false;
          }
          if (window.getComputedStyle(node).position === "absolute") {
            return true;
          }
        }
        return true;
      },
      canvasWidth: 794,
      canvasHeight: 1123,
      fetchRequestInit: {
        mode: "no-cors",
      },
    });

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Adiciona primeira página
    pdf.addImage(
      page1DataUrl,
      "PNG",
      0,
      0,
      pdfWidth,
      pdfHeight,
      undefined,
      "MEDIUM"
    );

    // Adiciona segunda página
    pdf.addPage();
    pdf.addImage(
      page2DataUrl,
      "PNG",
      0,
      0,
      pdfWidth,
      pdfHeight,
      undefined,
      "MEDIUM"
    );

    return pdf.output("blob");
  };

  const createRequisitionMutation = useCreateRequisition(user?.token);

  const handleShareWhatsApp = async () => {
    try {
      setIsGeneratingPdf(true);

      const pdfBlob = await generatePDF();

      const formData = form.getValues();

      const sanitizeName = (name: string) => {
        return name
          .replace(/[^a-zA-Z0-9\s-]/g, "")
          .replace(/\s+/g, "-") // Substitui espaços por hífens
          .toLowerCase()
          .trim();
      };

      const clinicName = sanitizeName(formData.clinicName || "clinica");
      const petOwner = sanitizeName(formData.petOwner || "proprietario");
      const fileName = `${clinicName}-${petOwner}-requisicao_pdf`;
      const file = new File([pdfBlob], fileName, { type: "application/pdf" });

      const response = await createRequisitionMutation.mutateAsync({ file });

      const fileUrl = `https://f005.backblazeb2.com/file/exavet/requisitions/${fileName}`;

      const phoneNumber = "554130810360";
      const message = encodeURIComponent(
        `Olá! Aqui está a requisição de exame solicitada:\n\n${fileUrl}\n\nAguardo o retorno dos resultados.`
      );
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

      window.open(whatsappUrl, "_blank");

      toast.success("Requisição enviada com sucesso! Abrindo WhatsApp...");
    } catch (error) {
      console.error("Erro ao enviar requisição:", error);
      toast.error("Erro ao enviar requisição. Por favor, tente novamente.");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const onSubmit = (data: RequisitionFormData) => {
    setShowPreview(true);
  };

  return (
    <div className="flex flex-col items-center gap-8 px-2 ">
      <div className="w-full overflow-x-auto bg-requisition print-hidden">
        <div className="min-w-[794px] max-w-[794px] bg-white text-[#1e1e1e] rounded-lg mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <div className="bg-white rounded-lg page-1 p-6">
                {/* Primeira Página */}
                <div className="flex items-center justify-between">
                  <div className="w-[200px] mb-4">
                    <img
                      ref={logoRef}
                      src="/CARDIO-SARRAFF.svg"
                      alt="logo"
                      className="w-full h-auto object-contain "
                      style={{ maxHeight: "60px" }}
                    />
                  </div>
                  <LaboratorySection form={form} />
                </div>
                <RegistrationSection form={form} />
                <ExamRequestsSection form={form} />
              </div>

              <div className="page-2 py-0 px-6 min-h-[1123px]">
                <IndividualExamsSection form={form} />
                <ImagingDiagnosisSection form={form} />
              </div>

              <div className="flex justify-end space-x-4 print-hidden px-6 pb-6">
                <Button type="button" onClick={() => router.back()}>
                  Cancelar
                </Button>
                <Button
                  type="button"
                  onClick={handleShareWhatsApp}
                  className="bg-green-600 hover:bg-green-700 text-white"
                  disabled={isGeneratingPdf}
                >
                  {isGeneratingPdf ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : null}
                  Enviar WhatsApp
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
