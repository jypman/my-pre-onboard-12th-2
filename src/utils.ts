export const getDateTimeFormat = (locals: string, date: string) => {
  return new Intl.DateTimeFormat(locals, { dateStyle: "long" }).format(
    new Date(date),
  );
};
