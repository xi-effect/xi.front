export const getLastCodeFromURL = () => {
  const url = window.location.href;
  const codeArray = url.split('/');
  return codeArray[codeArray.length - 1];
};
