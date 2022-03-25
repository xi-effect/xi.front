import React from 'react';
// @ts-ignore
import { Face, FaceType } from './z_options.tsx';

interface HairProps {
	piece: FaceType;
	strokeColor?: string;
	backgroundColor?: string;
}

const index: React.FC<HairProps> = ({
	piece,
	strokeColor,
	backgroundColor
}) => React.createElement(Face[piece], { strokeColor, backgroundColor });

export default index;
