export const formatPhoneNumber = (number: string | undefined) => {
  if (!number) return "";

  const cleaned = ("" + number).replace(/\D/g, "");

  const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);

  if (match) {
    if (cleaned.length === 11) {
      return `(${match[1]}) ${match[2][0]} ${match[2].slice(1)}-${match[3]}`;
    } else if (cleaned.length === 10) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
  }

  return number || "";
};
