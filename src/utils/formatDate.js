export default function formatDateString(value) {
  if (!value) return "";

  value = value.replace(/\D/g, '');

  if (value.length >= 2 && value.length < 4) {
    value = value.slice(0, 2) + '/' + value.slice(2);
  } else if (value.length >= 4) {
    value = value.slice(0, 2) + '/' + value.slice(2, 4) + '/' + value.slice(4, 8);
  }

  return value
}