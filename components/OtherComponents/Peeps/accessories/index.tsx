import React from 'react';
// @ts-ignore
import { Accessories, AccessoryType } from './z_options.tsx';

interface AccessoriesProps {
	piece: AccessoryType;
	strokeColor?: string;
	backgroundColor?: string;
}

const index: React.FC<AccessoriesProps> = ({
	piece,
	strokeColor,
	backgroundColor
}) => React.createElement(Accessories[piece], {
		strokeColor,
		backgroundColor
	});

export default index;
