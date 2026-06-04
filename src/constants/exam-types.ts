export const EXAM_TYPES = [
  "Ecocardiograma",
  "Eletrocardiografia",
  "Ecocardio + ECG",
  "Ecocardio + PAS",
  "Ecocardio + ECG + PAS",
  "ECG + PAS",
  "Pressão arterial sistêmica",
  "Holter",
  "Teste de atropina",
] as const;

export type ExamType = (typeof EXAM_TYPES)[number];
