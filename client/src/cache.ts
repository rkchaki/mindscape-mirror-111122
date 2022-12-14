import { makeVar } from '@apollo/client';
import { RefObject } from 'react';
import { v4 } from 'uuid';
import { PosType } from './features/space/space';
import { IdToType } from './types';

export const frameSpaceElVar = makeVar(null as RefObject<HTMLIonCardElement> | null);
export const focusSpaceElVar = makeVar(null as RefObject<HTMLIonCardElement> | null);

export const frameAdjustIdToPosVar = makeVar({} as IdToType<PosType>);
export const focusAdjustIdToPosVar = makeVar({} as IdToType<PosType>);