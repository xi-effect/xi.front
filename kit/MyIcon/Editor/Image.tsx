import React from 'react';
import { IconWrap } from './index';

type Props = {
  color?: string;
  medium?: boolean;
};

const Image: React.FC<Props> = ({ color = '#333', medium }) => (
  <IconWrap>
    {medium ? (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_1846_10341)">
          <rect x="7.5" y="7.5" width="33" height="33" rx="6.5" stroke="#445AFF" strokeWidth="3" />
          <path
            d="M28.7283 17.5924C28.3759 16.8952 27.3959 16.8533 26.9852 17.5178L23.2471 23.5654C22.8629 24.187 21.9634 24.2 21.5614 23.5898L19.4563 20.3945C19.032 19.7506 18.0693 19.8089 17.7259 20.4993L13.719 28.5546C13.3883 29.2194 13.8718 30 14.6143 30H33.374C34.1193 30 34.6027 29.214 34.2665 28.5489L28.7283 17.5924Z"
            stroke="#445AFF"
            strokeWidth="3"
          />
        </g>
        <defs>
          <clipPath id="clip0_1846_10341">
            <rect width="48" height="48" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ) : (
      <svg
        width="20"
        height="13"
        viewBox="0 0 20 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.6248 1.78801C13.443 1.44268 12.9534 1.42941 12.7531 1.76439L9.12562 7.83379C8.93479 8.15307 8.47458 8.15963 8.27473 7.84592L5.96186 4.21528C5.75583 3.89186 5.27741 3.91119 5.09815 4.25019L1.388 11.2663C1.21192 11.5993 1.45332 12 1.83001 12H18.1718C18.548 12 18.7895 11.6001 18.6142 11.2671L13.6248 1.78801Z"
          stroke={color}
          strokeWidth="2"
        />
      </svg>
    )}
  </IconWrap>
);

export default Image;
