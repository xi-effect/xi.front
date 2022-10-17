import React from 'react';
import { IconWrap } from './index';

type Props = {
  color?: string;
  medium?: boolean;
};

const File: React.FC<Props> = ({ color = '#333', medium }) => (
  <IconWrap>
    {medium ? (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.5 40.5H31.5C34.8137 40.5 37.5 37.8137 37.5 34.5V18.364C37.5 17.1705 37.0259 16.0259 36.182 15.182L29.818 8.81802C28.9741 7.97411 27.8295 7.5 26.636 7.5H16.5C13.1863 7.5 10.5 10.1863 10.5 13.5V34.5C10.5 37.8137 13.1863 40.5 16.5 40.5Z"
          stroke="#445AFF"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M26.25 7.5V14.25C26.25 16.7353 28.2647 18.75 30.75 18.75H37.5"
          stroke="#445AFF"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path d="M16.5 27H24M16.5 33H30" stroke="#445AFF" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ) : (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 20H16C17.6569 20 19 18.6569 19 17V9.24264C19 8.44699 18.6839 7.68393 18.1213 7.12132L15.8787 4.87868C15.3161 4.31607 14.553 4 13.7574 4H8C6.34315 4 5 5.34315 5 7V17C5 18.6569 6.34315 20 8 20Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M14 4V7C14 8.10457 14.8954 9 16 9H19"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path d="M9 12H11.75M9 16H13.75" stroke={color} strokeWidth="2" strokeLinecap="round" />
      </svg>
    )}
  </IconWrap>
);

export default File;
