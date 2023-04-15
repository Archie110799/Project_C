export const formatToSlug = (text: string) => {
  return text.toLowerCase().replace(/ /g, '_');
};

export const formatToPhone = (text: string) => {
  return text.slice(0, 3) + '-' + text.slice(3, 7) + '-' + text.slice(7);
};

export const formatToPhoneDefault = (text: string) => {
  return text.split('-').join('');
};
