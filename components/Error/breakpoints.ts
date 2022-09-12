// эти пару строк стоит вынести ещё дальше, как брейкпоинты будут финальными
export type ScreenSize = 'min480' | 'min1000' | 'min1336' | 'min1920' | 'max1920';
export type ScreenToString = { [key in ScreenSize]: string }; // eslint-disable-line no-unused-vars

export const mainFontSize: ScreenToString = {
  min480: '100px',
  min1000: '160px',
  min1336: '160px',
  min1920: '220px',
  max1920: '220px',
};

export const mainMarginTop: ScreenToString = {
  min480: '65px', // + 5 instead of line height of main
  min1000: '78px',
  min1336: '78px',
  min1920: '94px',
  max1920: '94px',
};

export const secondaryFontSize: ScreenToString = {
  min480: '16px',
  min1000: '24px',
  min1336: '24px',
  min1920: '24px',
  max1920: '24px',
};

export const secondaryLineHeight: ScreenToString = {
  min480: '32px',
  min1000: '32px',
  min1336: '32px',
  min1920: '32px',
  max1920: '32px',
};

export const secondaryMarginTop: ScreenToString = {
  min480: '5px', // + 5 instead of line height of main
  min1000: '24px',
  min1336: '24px',
  min1920: '32px',
  max1920: '32px',
};

export const buttonFontSize: ScreenToString = {
  min480: '18px',
  min1000: '24px',
  min1336: '24px',
  min1920: '24px',
  max1920: '24px',
};

export const buttonHeight: ScreenToString = {
  min480: '48px',
  min1000: '64px',
  min1336: '64px',
  min1920: '64px',
  max1920: '64px',
};

export const buttonWidth: ScreenToString = {
  min480: '167px',
  min1000: '201px',
  min1336: '201px',
  min1920: '201px',
  max1920: '201px',
};

export const buttonMarginTop: ScreenToString = {
  min480: '48px',
  min1000: '64px',
  min1336: '64px',
  min1920: '100px',
  max1920: '100px',
};
