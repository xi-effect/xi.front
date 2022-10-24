import React from 'react';
import { IconWrap } from './index';

type Props = {
  color?: string;
};

const H1: React.FC<Props> = ({ color = '#333' }) => (
  <IconWrap>
    <svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0.0113636 12V0.363636H2.47159V5.16477H7.46591V0.363636H9.92045V12H7.46591V7.19318H2.47159V12H0.0113636ZM16.9432 0.363636V12H14.483V2.69886H14.4148L11.75 4.36932V2.1875L14.6307 0.363636H16.9432Z"
        fill={color}
      />
    </svg>
  </IconWrap>
);

export default H1;
