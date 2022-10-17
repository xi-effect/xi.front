import React from 'react';
import { IconWrap } from './index';

type Props = {
  color?: string;
  medium?: boolean;
};

const Video: React.FC<Props> = ({ color = '#333', medium }) => (
  <IconWrap>
    {medium ? (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_1846_10419)">
          <rect x="7.5" y="7.5" width="33" height="33" rx="6.5" stroke="#445AFF" strokeWidth="3" />
          <path
            d="M28.3905 24.8779C29.0854 24.4989 29.0854 23.5011 28.3905 23.1221L20.4789 18.8066C19.8125 18.4432 19 18.9255 19 19.6845V28.3155C19 29.0745 19.8125 29.5568 20.4789 29.1934L28.3905 24.8779Z"
            stroke="#445AFF"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_1846_10419">
            <rect width="48" height="48" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ) : (
      <svg
        width="12"
        height="14"
        viewBox="0 0 12 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.3905 7.8779C11.0854 7.49888 11.0854 6.50112 10.3905 6.1221L2.47885 1.80665C1.81248 1.44317 1 1.92548 1 2.68454V11.3155C1 12.0745 1.81248 12.5568 2.47885 12.1934L10.3905 7.8779Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )}
  </IconWrap>
);

export default Video;
