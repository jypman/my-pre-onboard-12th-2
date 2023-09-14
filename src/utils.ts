export const getDateTimeFormat = (locals: string, date: string) => {
  return new Intl.DateTimeFormat(locals, { dateStyle: "long" }).format(
    new Date(date),
  );
};

export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
