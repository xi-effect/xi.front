import React from 'react';
// @ts-ignore
import { Hair, HairType } from './z_options.tsx';

interface HairProps {
  piece: HairType;
  strokeColor?: string;
  backgroundColor?: string;
}

const index: React.FC<HairProps> = ({ piece, strokeColor, backgroundColor }) =>
  React.createElement(Hair[piece], { strokeColor, backgroundColor });

export default index;
