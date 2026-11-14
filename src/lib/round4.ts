import type { DemoState, RoomAction } from './models';
// All values are provisional DEMO rules, not commercial entitlements.
export const roomRules = { affinityPerMoment: 10, dailyMoments: 10, creditsPerAffinity: 1, creditsPerMinute: 100, maxMinutes: 30 } as const;
export const roomActions: {id:RoomAction;name:string;reaction:string;symbol:string}[] = [
 {id:'pet',name:'Pet',reaction:'A gentle lean into your hand.',symbol:'♡'},
 {id:'play',name:'Play',reaction:'A curious hop toward the toy!',symbol:'✧'},
 {id:'seek',name:'Seek',reaction:'A little peek: here I am!',symbol:'?'},
 {id:'feed',name:'Feed · simulated',reaction:'A pretend snack, a happy wiggle. No real food is delivered.',symbol:'✿'},
 {id:'rest',name:'Rest',reaction:'Eyes closed. A little room for quiet.',symbol:'☾'},
];
export const roomScenes = [
 {id:'cafe',name:'Cozy Cat Café'}, {id:'window',name:'Sunny Window'}, {id:'garden',name:'Garden'},
] as const;
export const earnedAffinity = (s:DemoState, catId:string) => (s.affinityLedger??[]).filter(v=>v.kind==='earn'&&v.catId===catId).reduce((n,v)=>n+v.amount,0);
export function safeReturnPath(path:string|null){
 if(!path || !/^\/(?![\/\\])/.test(path) || /[\\\r\n]/.test(path))return '/';
 const pathname=path.split(/[?#]/)[0].replace(/\/$/,'');
 if(['/login','/signup'].includes(pathname))return '/';
 const publicPaths=['','/cats','/cafes','/cat101','/shop','/menu','/birthday','/profile','/companion','/rewards','/credits','/cat-room','/leaderboard/fans','/live','/stories','/about','/contact','/privacy','/terms','/qr-generator'];
 return publicPaths.includes(pathname)||/^\/(cats|cafes|virtual-pet|stories)\/[a-z0-9-]+$/.test(pathname)?path:'/';
}
export function migrateRound4(old:Partial<DemoState>):DemoState {
 // Keep historical points/XP/ledgers intact. Old XP has no retrospective conversion allowance.
 return {...old,demoSignedIn:false,affinity:old.affinity??0,affinityLedger:old.affinityLedger??[],experienceRequests:old.experienceRequests??[]} as DemoState;
}
