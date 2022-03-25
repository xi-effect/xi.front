// @ts-nocheck
import React, { CSSProperties, useMemo } from 'react';
import Head from './head/index.tsx';
import Pose from './pose/index.tsx';
import { GradientType } from './types.tsx';

import { HairType } from './hair/z_options.tsx';
import { AccessoryType } from './accessories/z_options.tsx';
import { FaceType } from './face/z_options.tsx';
import { FacialHairType } from './facialHair/z_options.tsx';
import { StandingPoseType } from './pose/standing/z_options.tsx';
import { SittingPoseType } from './pose/sitting/z_options.tsx';
import { BustPoseType } from './pose/bust/z_options.tsx';

export { BustPose, BustPoseType } from './pose/bust/z_options.tsx';
export { SittingPose, SittingPoseType } from './pose/sitting/z_options.tsx';
export { StandingPose, StandingPoseType } from './pose/standing/z_options.tsx';
export { Hair, HairType } from './hair/z_options.tsx';
export { Accessories, AccessoryType } from './accessories/z_options.tsx';
export { Face, FaceType } from './face/z_options.tsx';
export { FacialHair, FacialHairType } from './facialHair/z_options.tsx';

interface PeepProps {
  style?: CSSProperties;
  accessory?: AccessoryType;
  body?: BustPoseType | SittingPoseType | StandingPoseType;
  face?: FaceType;
  facialHair?: FacialHairType;
  hair?: HairType;
  viewBox?: { x: string; y: string; width: string; height: string };
  circleStyle?: CSSProperties;
  strokeColor?: string | GradientType;
  backgroundColor?: string | GradientType;
  wrapperBackground?: string | GradientType;
}

const Peep: React.FC<PeepProps> = ({
  style,
  accessory,
  body,
  face,
  facialHair,
  hair,
  viewBox,
  circleStyle,
  strokeColor,
  backgroundColor,
  wrapperBackground,
}) => {
  const { x, y, width, height } = viewBox || {
    x: 0,
    y: 0,
    width: 850,
    height: 1200,
  };

  const uniqueIdentifier = useMemo(() => `_${Math.random().toString(36).substr(2, 9)}`, []);

  const adjustStrokeColor = () =>
    typeof strokeColor === 'object' ? `url(#strokeGradient${uniqueIdentifier})` : strokeColor;

  const adjustBackgroundColor = () =>
    typeof backgroundColor === 'object'
      ? `url(#backgroundGradient${uniqueIdentifier})`
      : backgroundColor;

  const adjustWrapperBackground = () =>
    typeof wrapperBackground === 'object'
      ? `url(#wrapperGradient${uniqueIdentifier})`
      : wrapperBackground;

  const mainContent = (
    <svg style={style} viewBox={`${x} ${y} ${width} ${height}`}>
      {typeof strokeColor === 'object' && (
        <defs>
          <linearGradient
            id={`strokeGradient${uniqueIdentifier}`}
            x1="0%"
            y1="0%"
            x2="50%"
            y2="100%"
            gradientTransform={`rotate(${strokeColor.degree || 0})`}>
            <stop offset="0%" stopColor={strokeColor.firstColor} />
            <stop offset="100%" stopColor={strokeColor.secondColor} />
          </linearGradient>
        </defs>
      )}
      {typeof backgroundColor === 'object' && (
        <defs>
          <linearGradient
            id={`backgroundGradient${uniqueIdentifier}`}
            x1="0%"
            y1="0%"
            x2="50%"
            y2="100%"
            gradientTransform={`rotate(${backgroundColor.degree || 0})`}>
            <stop offset="0%" stopColor={backgroundColor.firstColor} />
            <stop offset="100%" stopColor={backgroundColor.secondColor} />
          </linearGradient>
        </defs>
      )}
      {typeof wrapperBackground === 'object' &&
        (wrapperBackground.type === 'RadialGradient' ? (
          <defs>
            <radialGradient id={`wrapperGradient${uniqueIdentifier}`}>
              <stop offset="0%" stopColor={wrapperBackground.firstColor} />
              <stop offset="100%" stopColor={wrapperBackground.secondColor} />
            </radialGradient>
          </defs>
        ) : (
          <defs>
            <linearGradient
              id={`wrapperGradient${uniqueIdentifier}`}
              x1="0%"
              y1="0%"
              x2="50%"
              y2="100%"
              gradientTransform={`rotate(${wrapperBackground.degree || 0})`}>
              <stop offset="0%" stopColor={wrapperBackground.firstColor} />
              <stop offset="100%" stopColor={wrapperBackground.secondColor} />
            </linearGradient>
          </defs>
        ))}
      {wrapperBackground && (
        <rect x={x} y={y} width="100%" height="100%" fill={adjustWrapperBackground()} rx="30" />
      )}
      <g>
        {body &&
          React.createElement(Pose, {
            piece: body,
            strokeColor: adjustStrokeColor(),
            backgroundColor: adjustBackgroundColor(),
          })}
        {React.createElement(Head, {
          hairPiece: hair,
          facePiece: face,
          facialHairPiece: facialHair,
          accessoryPiece: accessory,
          strokeColor: adjustStrokeColor(),
          backgroundColor: adjustBackgroundColor(),
        })}
      </g>
    </svg>
  );

  return circleStyle ? <div style={circleStyle}>{mainContent}</div> : mainContent;
};

export default Peep;
