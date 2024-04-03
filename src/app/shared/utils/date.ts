export const subtractDateByDays = (value: number, startDate?: Date): Date => {
  let date = startDate ? new Date(startDate) : new Date();
  date.setDate(date.getDate() - value);
  return date;
}

export const addDateByDays = (value: number, startDate?: Date): Date => {
  let date = startDate ? new Date(startDate) : new Date();
  date.setDate(date.getDate() + value);
  return date;
}

export const subtractDateByYears = (value: number, startDate?: Date): Date => {
  let date = startDate ? new Date(startDate) : new Date();
  date.setFullYear(date.getFullYear() - value);
  return date;
}

export const addDateByYears = (value: number, startDate?: Date): Date => {
  let date = startDate ? new Date(startDate) : new Date();
  date.setFullYear(date.getFullYear() + value);
  return date;
}

export const dateDiffInDays = (startDate: Date, endDate: Date, roundingFn: (x: number) => number = Math.ceil): number => {
  const msDiff = endDate.getTime() - startDate.getTime();
  return roundingFn((msDiff / 1000) / 3600 / 24)
}

export const getMonthName = (date: Date): string => date.toLocaleString('default', { month: 'long' });

export const formatDate = (inputDate: Date, format: string = 'yyyy-MM-dd'): string =>  {
  if (!inputDate) return '';

  const padZero = (value: number) => (value < 10 ? `0${value}` : `${value}`);
  const parts: Record<string, string | number> = {
      yyyy: inputDate.getFullYear(),
      MM: padZero(inputDate.getMonth() + 1),
      dd: padZero(inputDate.getDate()),
      HH: padZero(inputDate.getHours()),
      hh: padZero(inputDate.getHours() > 12 ? inputDate.getHours() - 12 : inputDate.getHours()),
      mm: padZero(inputDate.getMinutes()),
      ss: padZero(inputDate.getSeconds()),
      tt: inputDate.getHours() < 12 ? 'AM' : 'PM'
  };

  return format.replace(/yyyy|MM|dd|HH|hh|mm|ss|tt/g, (match: string) => parts[match]?.toString());
}

export const parseDate = (input: string, format: string = 'dd-mm-yyyy'): Date => {
	let parts = input.match(/(\d+)/g);
  let idx = 0;
  let fmt: { [key: string]: number | string } = {};

	format.replace(/(yyyy|dd|mm)/g, (part: string) => {
    fmt[part] = idx++;
    return part;
  });

  // @ts-ignore
	return new Date(parts[fmt['yyyy']], parts[fmt['mm']]-1, parts[fmt['dd']]);
}
