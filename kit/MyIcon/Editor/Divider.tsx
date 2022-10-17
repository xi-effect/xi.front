import React from 'react';
import { IconWrap } from './index';

type Props = {
  color?: string;
};

const Divider: React.FC<Props> = ({ color = '#333' }) => (
  <IconWrap>
    <svg width="16" height="2" viewBox="0 0 16 2" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="16" height="2" rx="1" fill={color} />
    </svg>
  </IconWrap>
);

export default Divider;
