// @ts-nocheck
import React from 'react';
import { BustPose, BustPoseType } from './bust/z_options.tsx';
import { SittingPose, SittingPoseType } from './sitting/z_options.tsx';
import { StandingPose, StandingPoseType } from './standing/z_options.tsx';

interface PoseProps {
	piece: BustPoseType | SittingPoseType | StandingPoseType;
	strokeColor?: string;
	backgroundColor?: string;
}

const index: React.FC<PoseProps> = ({
	piece,
	strokeColor,
	backgroundColor
}) => React.createElement(
		BustPose[piece] || SittingPose[piece] || StandingPose[piece],
		{ strokeColor, backgroundColor }
	);

export default index;
