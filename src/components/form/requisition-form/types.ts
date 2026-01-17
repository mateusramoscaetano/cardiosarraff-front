import type { ReactNode } from "react";

export interface RequisitionFormData {
  // Dados para uso do laboratório
  laboratoryUse?: {
    number?: string;
    date?: string;
    time?: string;
    paid?: boolean;
    invoiced?: boolean;
  };

  // Dados Cadastrais
  clinicName: string;
  petName: string;
  age: string;
  specie: string;
  race: string;
  gender: string;
  petOwner: string;
  doctorName: string;
  doctorCrmv: string;
  email: string;
  collectDate: string;
  collectTime: string;
  material: string[];
  observations: string;

  // Solicitação de Exames
  examRequests: {
    bloodCount?: boolean;
    biochemical?: boolean;
    urinalysis?: boolean;
    parasitological?: boolean;
    cytology?: boolean;
    cytologyDrawings?: {
      ventral: string;
      dorsal: string;
    };
    antibiogram?: boolean;
    other?: string;
    checkUpI?: boolean;
    checkUpII?: boolean;
    checkUpCompleto?: boolean;
    perfilFelino?: boolean;
    perfilGeriatrico?: boolean;
    perfilHepatico?: boolean;
    perfilNeoplastico?: boolean;
    perfilRenal?: boolean;
    perfilPancreaticoCaninoI?: boolean;
    perfilPancreaticoFelinoI?: boolean;
    lipasePancreaticaCanina?: boolean;
    lipasePancreaticaFelina?: boolean;
    citologiaOtologicaUnilateral?: boolean;
    citologiaDaPele?: {
      checked: boolean;
      regiaoAmostra: string;
      tempoEvolucao: string;
      suspeitaClinica: string;
      formaDeColeta: string;
      consideracoes: string;
    };
    hematologyHemostasis?: {
      hemogramaCompleto?: boolean;
      contagemPlaquetas?: boolean;
      contagemPlaquetasProteinaPlasmatica?: boolean;
      pesquisaHemoparasitas?: boolean;
      pesquisaMicrofilaria?: boolean;
      hematocritoProteinaPlasmatica?: boolean;
      hemogasometria?: {
        checked: boolean;
        grau: string;
      };
      compatibilidadeSanguinea?: {
        checked: boolean;
        numeroDoadores: string;
      };
      tpTtpa?: boolean;
    };
  };

  // Solicitação de Exames Individual
  individualExams?: {
    // Bioquímica Sérica
    albumina?: boolean;
    alt?: boolean;
    amilase?: boolean;
    ast?: boolean;
    bilirrubinas?: boolean;
    trigliTotalDireta?: boolean;
    calcio?: boolean;
    cloro?: boolean;
    colesterol?: boolean;
    colesterolFracoes?: boolean;
    creatinina?: boolean;
    creatininase?: boolean;
    ferro?: boolean;
    fosfataseAlcalina?: boolean;
    fosforo?: boolean;
    frutosamina?: boolean;
    cgt?: boolean;
    glicose?: boolean;
    globulina?: boolean;
    ldh?: boolean;
    lipase?: boolean;
    lipideosTotais?: boolean;
    lipidograma?: boolean;
    magnesio?: boolean;
    potassio?: boolean;
    proteinaTotal?: boolean;
    proteinaTotalFracoes?: boolean;
    sodio?: boolean;
    triglicerideos?: boolean;
    ureia?: boolean;

    // Imunologia (Teste Rápido)
    brucelose?: boolean;
    cinomoseAg?: boolean;
    dirofilariose?: boolean;
    erlichiose?: boolean;
    fivFelv?: boolean;
    giardiase?: boolean;
    parvoviroseCoronavirus?: boolean;
  };

  // Solicitação de Diagnóstico por Imagem
  imagingDiagnosis: {
    suspeitaClinica?: string;
    previousSurgeryProcedures?: string;
    observations?: string;

    // Ultrassonografia
    ultrasound: {
      abdominal?: boolean;
      gestational?: boolean;
      cervical?: boolean;
      ocular?: boolean;
      fast?: boolean;
      thoracic?: boolean;
      monitoring?: boolean;
    };

    // Cardiologia
    cardiology: {
      echocardiogramEchodopplercardiogram?: boolean;
      electrocardiogram?: boolean;
      systemicPressureMeasurement?: boolean;
      holter?: boolean;
      pericardiocentesis?: boolean;
      monitoring?: boolean;
    };

    // Procedimentos Ecoguiados
    guidedProcedures: {
      cystocentesis?: boolean;
      abdominocentesis?: boolean;
      thoracocentesis?: boolean;
      aspirativeCytology?: {
        checked: boolean;
        region?: string;
      };
    };

    // Radiografia
    radiography: {
      // Exames simples
      abdominal?: boolean;
      thorax?: boolean;
      cervicalSoftParts?: {
        checked: boolean;
        larynx?: boolean;
        trachea?: boolean;
      };
      skull?: boolean;
      wildSylvester?: boolean;

      // Coluna
      spine?: {
        checked: boolean;
        cervical?: boolean; // C1-C7
        cervicothoracic?: boolean; // C4-T4
        thoracic?: boolean; // T1-T13
        thoracolumbar?: boolean; // T4-L4
        lumbar?: boolean; // L1-L7
        lumbosacral?: boolean; // L4-S3
        tail?: boolean;
      };

      // Membros Torácicos
      thoracicLimbs?: {
        checked: boolean;
        right?: boolean;
        left?: boolean;
        scapula?: boolean;
        shoulder?: boolean;
        humerus?: boolean;
        elbow?: boolean;
        radiusUlna?: boolean;
        carpusMetacarpusPhalanges?: boolean;
      };

      // Membros Pélvicos
      pelvicLimbs?: {
        checked: boolean;
        coxofemoral?: boolean;
        femur?: boolean;
        knee?: boolean;
        tibiaTibula?: boolean;
        tarsusMetatarsusPhalanges?: boolean;
      };

      // Contrastados
      contrastStudies?: {
        checked: boolean;
        retrogradeUrography?: boolean;
        bariumEnema?: boolean;
        esophagogram?: boolean;
        retrogradeUrethrography?: boolean;
      };
    };

    // Tomografia
    tomography: {
      abdomen?: boolean;
      thorax?: boolean;
      head?: {
        checked: boolean;
        region?: string;
      };
      spine?: {
        checked: boolean;
        region?: string;
      };
      thoracicLimb?: {
        checked: boolean;
        region?: string;
      };
      pelvicLimb?: {
        checked: boolean;
        region?: string;
      };
      others?: string;
    };

    // Sedação
    sedation?: {
      required: boolean;
      signature?: string;
    };
  };
}

export type IndividualExamId =
  keyof Required<RequisitionFormData>["individualExams"];

export type ImagingDiagnosisId =
  keyof Required<RequisitionFormData>["imagingDiagnosis"];

interface ExamItem {
  id: IndividualExamId;
  label: string;
}

interface RadiographyExamItem {
  id: string;
  label: string | ReactNode;
}

export const biochemicalExams: ExamItem[] = [
  { id: "albumina", label: "Albumina" },
  { id: "alt", label: "ALT (TGP)" },
  { id: "amilase", label: "Amilase" },
  { id: "ast", label: "AST (TGO)" },
  { id: "bilirrubinas", label: "Bilirrubinas (Total, Direta e Indireta)" },
  { id: "calcio", label: "Cálcio" },
  { id: "cloro", label: "Cloro" },
  { id: "colesterol", label: "Colesterol" },
  { id: "colesterolFracoes", label: "Colesterol Frações" },
  { id: "creatininase", label: "Creatininase (CK)" },
  { id: "creatinina", label: "Creatinina" },
  { id: "ferro", label: "Ferro" },
  { id: "fosfataseAlcalina", label: "Fosfatase Alcalina" },
  { id: "fosforo", label: "Fósforo" },
  { id: "frutosamina", label: "Frutosamina" },
  { id: "cgt", label: "CGT" },
  { id: "glicose", label: "Glicose" },
  { id: "globulina", label: "Globulina" },
  { id: "ldh", label: "LDH" },
  { id: "lipase", label: "Lipase" },
  { id: "lipideosTotais", label: "Lipídios Totais" },
  { id: "lipidograma", label: "Lipidograma" },
  { id: "magnesio", label: "Magnésio" },
  { id: "potassio", label: "Potássio" },
  { id: "proteinaTotal", label: "Proteína Total" },
  { id: "proteinaTotalFracoes", label: "Proteína Total e Frações" },
  { id: "sodio", label: "Sódio" },
  { id: "triglicerideos", label: "Triglicerídeos" },
  { id: "ureia", label: "Uréia" },
];

export const immunologyExams: ExamItem[] = [
  { id: "brucelose", label: "Brucelose" },
  { id: "cinomoseAg", label: "Cinomose Ag" },
  { id: "dirofilariose", label: "Dirofilariose" },
  { id: "erlichiose", label: "Erlichiose" },
  { id: "fivFelv", label: "FIV/FeLV" },
  { id: "giardiase", label: "Giardíase" },
  { id: "parvoviroseCoronavirus", label: "Parvovirose/Coronavírus" },
];

// Radiografia - Coluna
export const spineRadiographyExams: RadiographyExamItem[] = [
  { id: "spine.checked", label: "Coluna" },
  { id: "spine.cervical", label: "Cervical (C1-C7)" },
  { id: "spine.cervicothoracic", label: "Cervicotorácica (C4-T4)" },
  { id: "spine.thoracic", label: "Torácica (T1-T13)" },
  { id: "spine.thoracolumbar", label: "Teracolombar (T4-L4)" },
  { id: "spine.lumbar", label: "Lombar (L1-L7)" },
  { id: "spine.lumbosacral", label: "Lombossacral (L4-S3)" },
  { id: "spine.tail", label: "Cauda" },
];

// Radiografia - Membros Torácicos
export const thoracicLimbsRadiographyExams: RadiographyExamItem[] = [
  { id: "thoracicLimbs.checked", label: "Membros Torácicos" },
  { id: "thoracicLimbs.right", label: "Direito" },
  { id: "thoracicLimbs.left", label: "Esquerdo" },
  { id: "thoracicLimbs.scapula", label: "Escápula*" },
  { id: "thoracicLimbs.shoulder", label: "Ombro" },
  { id: "thoracicLimbs.humerus", label: "Úmero" },
  { id: "thoracicLimbs.elbow", label: "Cotovelo" },
  { id: "thoracicLimbs.radiusUlna", label: "Radio/Ulna" },
  {
    id: "thoracicLimbs.carpusMetacarpusPhalanges",
    label: `Carpo/Metacarpos/\nFalanges*`, // Added \n for a new line
  },
];

// Radiografia - Membros Pélvicos
export const pelvicLimbsRadiographyExams: RadiographyExamItem[] = [
  { id: "pelvicLimbs.checked", label: "Membros Pélvicos" },
  { id: "pelvicLimbs.coxofemoral", label: "Coxofemoral (Pelve)*" },
  { id: "pelvicLimbs.femur", label: "Fêmur" },
  { id: "pelvicLimbs.knee", label: "Joelho" },
  { id: "pelvicLimbs.tibiaTibula", label: "Tíbia/Fíbula" },
  {
    id: "pelvicLimbs.tarsusMetatarsusPhalanges",
    label: "Tarso/Metatarso/Falanges",
  },
];

// Radiografia - Contrastadas
export const contrastRadiographyExams: RadiographyExamItem[] = [
  { id: "contrastStudies.checked", label: "Contrastados" },
  {
    id: "contrastStudies.retrogradeUrography",
    label: "Cistografia Retrógrada",
  },
  { id: "contrastStudies.bariumEnema", label: "Enema Baritado" },
  { id: "contrastStudies.esophagogram", label: "Esfagograma" },
  {
    id: "contrastStudies.retrogradeUrethrography",
    label: "Uretrocistografia Retrógrada",
  },
];
