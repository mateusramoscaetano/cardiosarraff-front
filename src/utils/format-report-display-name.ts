import { convertDate } from "@/utils/convertData";

const capitalizeFirst = (value: string) => {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const formatPetNameFromPath = (path?: string) => {
  if (!path) return "";
  const petSegment = path.split("/")[1];
  if (!petSegment) return "";
  const normalized = petSegment.replace(/_/g, " ");
  return capitalizeFirst(normalized);
};

type FormatReportDisplayNameParams = {
  petName?: string;
  createdAt?: string | Date;
  path?: string;
};

export const formatReportDisplayName = ({
  petName,
  createdAt,
  path,
}: FormatReportDisplayNameParams) => {
  const resolvedPetName =
    petName?.trim() || formatPetNameFromPath(path) || "Laudo";

  if (!createdAt) return resolvedPetName;

  const dateLabel = convertDate(
    typeof createdAt === "string"
      ? createdAt
      : createdAt.toISOString()
  );

  if (!dateLabel) return resolvedPetName;

  return `${resolvedPetName} - ${dateLabel}`;
};
