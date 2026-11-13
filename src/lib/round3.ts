import { cats } from '../data/seed';
import type { DemoState, PetAction, PetScene } from './models';
export const petScenes: {id:PetScene;name:string;caption:string}[] = [
  {id:'cafe',name:'Cozy café',caption:'A warm window seat, just for a moment.'},
  {id:'garden',name:'Sunny garden',caption:'A little sunlight. A little daydream.'},
  {id:'bedroom',name:'Cat lounge',caption:'Soft cushions and absolutely no plans.'},
  {id:'night',name:'Nighttime window',caption:'The city sleeps. Your little friend stays close.'},
];
export const petActions: {id:PetAction;name:string;reaction:string;symbol:string}[] = [
  {id:'pet',name:'Pet gently',reaction:'A little head tilt. A softer afternoon.',symbol:'♡'},
  {id:'play',name:'Play together',reaction:'Those curious eyes follow the little toy.',symbol:'✧'},
  {id:'treat',name:'Virtual treat',reaction:'A tiny happy wiggle. Pretend treats only!',symbol:'✿'},
  {id:'talk',name:'Say hello',reaction:'Your little friend settles in beside you.',symbol:'…'},
];
// A contribution is one accepted vote event, never a separate mutable balance.
export function fanContribution(state:DemoState){return new Set(state.votes.map(v=>v.id)).size;}
export function fanRankings(state:DemoState){
  const counts=new Map<string,number>();state.votes.forEach(v=>counts.set(v.catId,(counts.get(v.catId)??0)+1));
  const supported=[...counts].sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0]))[0]?.[0];
  return [
    {id:'seed-1',name:'Peach Comet',score:24,catId:'mochi',avatar:'✦',sample:true},
    {id:'seed-2',name:'Moon Sparrow',score:18,catId:'luna',avatar:'☾',sample:true},
    {id:'seed-3',name:'Garden Echo',score:12,catId:'milo',avatar:'✿',sample:true},
    {id:'local',name:'You',score:fanContribution(state),catId:supported??cats[0].id,avatar:'♡',sample:false},
  ].sort((a,b)=>b.score-a.score||a.id.localeCompare(b.id)).map((f,i)=>({...f,rank:i+1}));
}
export const creditsRules = [
  ['Earn PP','First follow: 20 PP once. Demo check-in: 5 PP per day. Demo staff interaction: 10 PP per cat per day. Verified referral simulation: 30 PP once.'],
  ['Demo purchases','Simulated merchandise, approved birthday events and care support earn 1 PP per MOP. Booking requests earn no PP. Care support is limited to 3 per day.'],
  ['Use PP','Redeem the listed demo vouchers, subject to each cat’s Bond level and your balance. Each reward can be redeemed once per cat. No real fulfillment is included.'],
  ['Validity and storage','No expiry is implemented. PP and progress are stored in this browser only. Clearing browser data or resetting the demo removes them. They do not sync between devices.'],
  ['Refunds and transfers','PP cannot be purchased, refunded for cash or transferred. No real money is collected. Pending guided-experience requests can be cancelled for a full Credits refund once.'],
  ['Three separate systems','PP pays for demo rewards. Bond XP tracks each cat’s relationship. Free CAT 101 votes are limited to 3 per Macau day. One accepted vote adds 1 fan contribution point. Legacy virtual pet reactions award nothing. Eligible Cat Room moments earn convertible Affinity and matching Bond XP once.'],
  ['Demo Affinity conversion','Eligible Cat Room actions earn once per action per cat per Macau day, within the daily limit. Rest and guest previews earn nothing. Old Bond XP is not convertible.'],
  ['Guided experience requests','Café approval and animal welfare review are required. Cancel pending requests for a full Credits refund once. No real request is sent.'],
] as const;
