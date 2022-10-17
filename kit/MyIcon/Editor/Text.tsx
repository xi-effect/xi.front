import React from 'react';
import { IconWrap } from './index';

type Props = {
  color?: string;
};

const Text: React.FC<Props> = ({ color = '#333' }) => (
  <IconWrap>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 8C4 7.44772 4.44772 7 5 7H8V15H5C4.44772 15 4 14.5523 4 14V8Z"
        stroke={color}
        strokeWidth="2"
      />
      <path
        d="M8 7L17.6712 5.38813C18.8903 5.18496 20 6.12504 20 7.36092V14.6391C20 15.875 18.8903 16.815 17.6712 16.6119L8 15V7Z"
        stroke={color}
        strokeWidth="2"
      />
      <path
        d="M11 15.8V17C11 18.1046 10.1046 19 9 19H8C6.89543 19 6 18.1046 6 17V15"
        stroke={color}
        strokeWidth="2"
      />
    </svg>
  </IconWrap>
);

export default Text;
