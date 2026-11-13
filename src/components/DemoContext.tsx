'use client';
import { createContext, useContext } from 'react';
import type { Locale } from '../lib/i18n';
import type { DemoState } from '../lib/models';
import type { Command } from '../lib/engine';
export type DemoContextValue = {s:DemoState;t:(key:string)=>string;locale:Locale;action:(command:Command,success?:string,id?:string)=>boolean;notify:(text:string)=>void;share:(catId:string)=>Promise<void>};
export const DemoContext = createContext<DemoContextValue | null>(null);
export function useDemo(){const context=useContext(DemoContext);if(!context)throw Error('Missing demo context');return context;}
