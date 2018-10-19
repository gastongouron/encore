import strings from '../../../locales/strings'

const isPresent = value => value !== undefined && value !== null;

export const required = value => {
  strings.getLanguage()
  return isPresent(value) ? undefined : strings.required;
};
export const email = value => {
  strings.getLanguage()
  return isPresent(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? strings.invalidEmail
    : undefined;
};