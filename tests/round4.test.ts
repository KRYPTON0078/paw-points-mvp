import test from 'node:test';
import assert from 'node:assert/strict';
import {act,initial,dayKey,type Command} from '../src/lib/engine';
import {migrateRound4,roomActions,roomRules,roomScenes,safeReturnPath} from '../src/lib/round4';
import {cats,rewards,products} from '../src/data/seed';
const now=new Date('2026-11-13T04:00:00Z');
let serial=0;
const run=(s:ReturnType<typeof initial>,c:Command,date=now)=>act(s,c,'r4-'+ ++serial,date);
const login=()=>run(initial(),{type:'demo-login'});
function earned(){let s=login();for(const cat of cats)for(const a of roomActions)s=run(s,{type:'room-interact',catId:cat.id,action:a.id});return s;}
test('guests preview every room action without earning and command boundary rejects account actions',()=>{
 let s=initial();for(const a of roomActions)s=run(s,{type:'room-interact',catId:'mochi',action:a.id});
 assert.equal(s.affinity,0);assert.equal(s.points,0);assert.deepEqual(s.cats,{});
 const commands:Command[]=[{type:'follow',catId:'mochi'},{type:'vote',catId:'mochi'},{type:'convert-affinity',amount:1},{type:'request-experience',catId:'mochi',minutes:1},{type:'checkout'},{type:'cart',productId:products[0].id,quantity:1},{type:'referral'},{type:'birthday',birthday:'2000-01-01'}];
 for(const c of commands)assert.throws(()=>run(s,c),/Sign in/);
});
test('demo logout preserves the account but cannot earn or spend until login again',()=>{
 let s=run(login(),{type:'follow',catId:'mochi'});s=run(s,{type:'demo-logout'});assert.equal(s.points,20);
 assert.throws(()=>run(s,{type:'referral'}),/Sign in/);s=run(s,{type:'room-interact',catId:'mochi',action:'play'});assert.equal(s.affinity,0);
 s=run(s,{type:'demo-login'});assert.equal(s.points,20);assert.equal(s.cats.mochi.active,true);
});
test('earning deduplicates each cat/action/day; rest has no earnings and global cap survives reload',()=>{
 let s=login();s=run(s,{type:'room-interact',catId:'mochi',action:'rest'});assert.equal(s.affinity,0);
 s=run(s,{type:'room-interact',catId:'mochi',action:'pet'});for(let i=0;i<50;i++)s=run(s,{type:'room-interact',catId:'mochi',action:'pet'});
 assert.equal(s.affinity,10);assert.equal(s.cats.mochi.xp,10);assert.equal(s.affinityLedger!.length,1);
 s=JSON.parse(JSON.stringify(earned()));assert.equal(s.affinity,roomRules.dailyMoments*roomRules.affinityPerMoment);
 assert.equal(s.bondLedger.reduce((n,r)=>n+r.amount,0),s.affinity);assert.equal(s.points,0);
 s=run(s,{type:'room-interact',catId:'mochi',action:'pet'},new Date('2026-11-13T16:00:00Z'));assert.equal(s.affinity,110);assert.equal(s.affinityLedger![0].date,dayKey(new Date('2026-11-13T16:00:00Z')));
});
test('conversion is atomic, rejects duplicate IDs and invalid amounts, preserves lifetime XP',()=>{
 const before=earned(),s=act(before,{type:'convert-affinity',amount:100},'conversion',now);
 assert.equal(s.affinity,0);assert.equal(s.points,100*roomRules.creditsPerAffinity);assert.deepEqual(s.cats,before.cats);
 assert.throws(()=>act(s,{type:'convert-affinity',amount:100},'conversion',now),/Already completed/);
 for(const amount of [0,-1,0.1,NaN,Infinity,101,Number.MAX_SAFE_INTEGER+1])assert.throws(()=>run(before,{type:'convert-affinity',amount}),/Invalid/);
 assert.equal(before.affinity,100);assert.equal(before.points,0);assert.throws(()=>run(s,{type:'convert-affinity',amount:1}),/Invalid/);
});
test('redemption makes only a pending staff request, deducts once and cancellation refunds exactly once',()=>{
 let s=run(earned(),{type:'convert-affinity',amount:100});const balance=s.points;
 s=act(s,{type:'request-experience',catId:'luna',minutes:1},'request',now);const r=s.experienceRequests![0];
 assert.equal(r.status,'awaiting-staff');assert.equal(r.cafeId,'paw-macau');assert.equal(r.cost,100);assert.equal(s.points,balance-100);
 assert.throws(()=>act(s,{type:'request-experience',catId:'luna',minutes:1},'request',now),/Already/);
 assert.throws(()=>run(s,{type:'request-experience',catId:'luna',minutes:1}),/Insufficient/);
 s=run(s,{type:'cancel-experience',requestId:r.id});assert.equal(s.points,balance);assert.equal(s.experienceRequests![0].status,'cancelled-refunded');
 assert.throws(()=>run(s,{type:'cancel-experience',requestId:r.id}),/Already/);
 assert.equal(s.pointsLedger.reduce((n,v)=>n+v.amount,0),s.points);
 for(const minutes of [-1,0,0.5,Infinity,31])assert.throws(()=>run(s,{type:'request-experience',catId:'mochi',minutes}),/Invalid/);
});
test('migration keeps all historical progress, starts guest mode and never converts old XP retroactively',()=>{
 const old=run(run(login(),{type:'follow',catId:'mochi'}),{type:'checkin',catId:'mochi'});
 delete old.affinity;delete old.affinityLedger;delete old.experienceRequests;
 const migrated=migrateRound4(old);assert.equal(migrated.demoSignedIn,false);assert.equal(migrated.affinity,0);
 assert.deepEqual(migrated.pointsLedger,old.pointsLedger);assert.deepEqual(migrated.cats,old.cats);assert.equal(migrated.points,old.points);
});
test('safe auth return accepts intended public routes and rejects external or recursive redirects',()=>{
 for(const path of ['/cat-room?cat=luna','/shop/','/cats/mochi/','/credits'])assert.equal(safeReturnPath(path),path);
 for(const path of ['https://evil.test','//evil.test','/\\evil.test','/login?next=/login','/signup','javascript:alert(1)','/unknown',null])assert.equal(safeReturnPath(path),'/');
});
test('room actions and scenes have distinct identities; application wording and relevant catalog remain available',()=>{
 assert.deepEqual(roomActions.map(a=>a.id),['pet','play','seek','feed','rest']);assert.equal(new Set(roomActions.map(a=>a.reaction)).size,5);
 assert.deepEqual(roomScenes.map(a=>a.name),['Cozy Cat Café','Sunny Window','Garden']);assert.equal(rewards.find(r=>r.id==='vip')!.description,'Apply for a staff-guided experience.');
 for(const cat of cats)assert.ok(products.some(p=>p.catId===cat.id));
});
