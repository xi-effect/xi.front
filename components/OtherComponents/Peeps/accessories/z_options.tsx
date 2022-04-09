// @ts-nocheck
import { Eyepatch } from './Eyepatch.tsx';
import { GlassRoundThick } from './GlassRoundThick.tsx';
import { SunglassClubmaster } from './SunglassClubmaster.tsx';
import { SunglassWayfarer } from './SunglassWayfarer.tsx';
import { GlassAviator } from './GlassAviator.tsx';
import { GlassButterfly } from './GlassButterfly.tsx';
import { GlassButterflyOutline } from './GlassButterflyOutline.tsx';
import { GlassClubmaster } from './GlassClubmaster.tsx';
import { GlassRound } from './GlassRound.tsx';
import { None } from './None.tsx';

export const Accessories = {
	None,
	Eyepatch,
	GlassRoundThick,
	SunglassClubmaster,
	SunglassWayfarer,
	GlassAviator,
	GlassButterfly,
	GlassButterflyOutline,
	GlassClubmaster,
	GlassRound
};

export type AccessoryType =
	| 'Eyepatch'
	| 'GlassRoundThick'
	| 'SunglassClubmaster'
	| 'SunglassWayfarer'
	| 'GlassAviator'
	| 'GlassButterfly'
	| 'GlassButterflyOutline'
	| 'GlassClubmaster'
	| 'GlassRound'
	| 'None';
