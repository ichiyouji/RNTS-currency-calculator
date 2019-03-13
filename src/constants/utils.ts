export const cleanInputValue = (value: string) => {
  const arr = value.split(".");
  const str = arr.splice(0,2).join('.') + arr.join('');
  const regex = /(^0*(?=\d))|([^\d.]+)/g;

  return (str.replace(regex, ''));
}