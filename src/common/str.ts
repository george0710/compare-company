export const setParams = (str: string, ...params: string[]) => {
  params.map((p, index) => {
    str = str.replace(`{${index}}`, p);
  })
  return str;
}

export const parseDate = (date: string) => date.replace(/[年月\-]/g, '/').replace(/[日]/g, '');