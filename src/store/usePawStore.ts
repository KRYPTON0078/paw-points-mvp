'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { initial, act, type Command } from '../lib/engine';
import type { DemoState } from '../lib/models';
export const usePawStore = create<{data:DemoState;dispatch:(command:Command,id?:string)=>void;reset:()=>void}>()(persist(set=>({
  data:initial(),
  dispatch:(command,id=crypto.randomUUID())=>set(state=>({data:act(state.data,command,id)})),
  reset:()=>set({data:initial()}),
}),{name:'paw-points-v2',version:2}));
