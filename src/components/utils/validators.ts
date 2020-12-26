export type FiledValidatoeType = (value: string) => string | undefined;
export const requiredField: FiledValidatoeType = (value) => {
  if (value) return undefined;
  return "заполните поле 'тег'";
};
export const symbolValidField: FiledValidatoeType = (value) => {
  if (!value.match(/[^0-9]/g))
    return "Ввод символов в поле кроме букв латинского алфавита и «,» запрещен";
  return undefined;
};
export const maxLengthCreator = (maxLenght: number): FiledValidatoeType => (
  value
) => {
  if (value.length > maxLenght)
    return `Максимальное количество символов ${maxLenght}!`;
  return undefined;
};
