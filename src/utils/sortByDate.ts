export default function sortByDate(
  a: { attributes: { date: string | number | Date } },
  b: { attributes: { date: string | number | Date } },
): number {
  return +new Date(b.attributes.date) - +new Date(a.attributes.date);
}
