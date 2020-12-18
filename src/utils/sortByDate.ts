const sortByDate = (
  a: { attributes: { date: string | number | Date } },
  b: { attributes: { date: string | number | Date } },
): number => +new Date(b.attributes?.date) - +new Date(a.attributes?.date);

export default sortByDate;
