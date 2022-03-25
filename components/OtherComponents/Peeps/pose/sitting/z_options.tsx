// @ts-nocheck
import { Bike } from './Bike.tsx';
import { ClosedLegBW } from './ClosedLegBW.tsx';
import { ClosedLegWB } from './ClosedLegWB.tsx';
import { CrossedLegs } from './CrossedLegs.tsx';
import { HandsBackBW } from './HandsBackBW.tsx';
import { HandsBackWB } from './HandsBackWB.tsx';
import { MediumBW } from './MediumBW.tsx';
import { MediumWB } from './MediumWB.tsx';
import { OneLegUpBW } from './OneLegUpBW.tsx';
import { OneLegUpWB } from './OneLegUpWB.tsx';
import { WheelChair } from './Wheelchair.tsx';

export const SittingPose = {
  Bike,
  ClosedLegBW,
  ClosedLegWB,
  CrossedLegs,
  HandsBackBW,
  HandsBackWB,
  MediumBW,
  MediumWB,
  OneLegUpBW,
  OneLegUpWB,
  WheelChair
};

export type SittingPoseType =
  | 'Bike'
  | 'ClosedLegBW'
  | 'ClosedLegWB'
  | 'CrossedLegs'
  | 'HandsBackBW'
  | 'HandsBackWB'
  | 'MediumBW'
  | 'MediumWB'
  | 'OneLegUpBW'
  | 'OneLegUpWB'
  | 'WheelChair';
