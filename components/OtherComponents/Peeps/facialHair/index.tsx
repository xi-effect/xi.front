import React from 'react';
// @ts-ignore
import { FacialHair, FacialHairType } from './z_options.tsx';

interface FacialHairProps {
	piece: FacialHairType;
	strokeColor?: string;
	backgroundColor?: string;
}

const index: React.FC<FacialHairProps> = ({
	piece,
	strokeColor,
	backgroundColor
}) => React.createElement(FacialHair[piece], {
		strokeColor,
		backgroundColor
	});

export default index;
