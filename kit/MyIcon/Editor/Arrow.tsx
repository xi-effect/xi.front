import React from 'react';
import { IconWrap } from './index';

type Props = {
  color?: string;
  up?: boolean;
};

const Arrow: React.FC<Props> = ({ color = '#333', up }) => (
  <IconWrap>
    {up ? (
      <svg
        width="12"
        height="14"
        viewBox="0 0 12 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.29308 0.292893C5.68361 -0.0976311 6.31677 -0.0976311 6.7073 0.292893L11.0713 4.65685C11.4618 5.04738 11.4618 5.68054 11.0713 6.07107C10.6807 6.46159 10.0476 6.46159 9.65705 6.07107L7.00019 3.41421V13C7.00019 13.5523 6.55248 14 6.00019 14C5.44791 14 5.00019 13.5523 5.00019 13V3.41421L2.34334 6.07107C1.95281 6.46159 1.31965 6.46159 0.929124 6.07107C0.538599 5.68054 0.538599 5.04738 0.929124 4.65685L5.29308 0.292893Z"
          fill={color}
        />
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
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.29308 13.7071C5.68361 14.0976 6.31677 14.0976 6.7073 13.7071L11.0713 9.34315C11.4618 8.95262 11.4618 8.31946 11.0713 7.92893C10.6807 7.53841 10.0476 7.53841 9.65705 7.92893L7.00019 10.5858V1C7.00019 0.447715 6.55248 0 6.00019 0C5.44791 0 5.00019 0.447715 5.00019 1V10.5858L2.34334 7.92893C1.95281 7.53841 1.31965 7.53841 0.929124 7.92893C0.538599 8.31946 0.538599 8.95262 0.929124 9.34315L5.29308 13.7071Z"
          fill={color}
        />
      </svg>
    )}
  </IconWrap>
);

export default Arrow;