// @ts-nocheck
import React from 'react';

import { HairType } from '../hair/z_options.tsx';
import { FaceType } from '../face/z_options.tsx';
import { FacialHairType } from '../facialHair/z_options.tsx';
import { AccessoryType } from '../accessories/z_options.tsx';

import Hair from '../hair/index.tsx';
import Face from '../face/index.tsx';
import FacialHair from '../facialHair/index.tsx';
import Accessory from '../accessories/index.tsx';

interface HeadProps {
  hairPiece?: HairType;
  facePiece?: FaceType;
  facialHairPiece?: FacialHairType;
  accessoryPiece?: AccessoryType;
  strokeColor?: string;
  backgroundColor?: string;
}

const index: React.FC<HeadProps> = ({
  hairPiece,
  facePiece,
  facialHairPiece,
  accessoryPiece,
  strokeColor,
  backgroundColor,
}) => (
  <g transform="translate(225 0)">
    <g>
      {hairPiece &&
        React.createElement(Hair, {
          piece: hairPiece,
          strokeColor,
          backgroundColor,
        })}
    </g>
    <g transform="translate(159 186)">
      {facePiece &&
        React.createElement(Face, {
          piece: facePiece,
          strokeColor,
          backgroundColor,
        })}
    </g>
    <g transform="translate(123 338)">
      {facialHairPiece &&
        React.createElement(FacialHair, {
          piece: facialHairPiece,
          strokeColor,
          backgroundColor,
        })}
    </g>
    <g transform="translate(47 241)">
      {accessoryPiece &&
        React.createElement(Accessory, {
          piece: accessoryPiece,
          strokeColor,
          backgroundColor,
        })}
    </g>
  </g>
);

export default index;
