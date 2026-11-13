import test from 'node:test';
import assert from 'node:assert/strict';
import { act, dayKey, initial as guestInitial, level, rankings, remainingVotes, seasonAt, localVotingService } from '../src/lib/engine';
import { cats, products } from '../src/data/seed';
import type { Command, State } from '../src/lib/engine';
const now=new Date('2026-11-13T04:00:00Z');
let serial=0;
const run=(s:State,command:Command,date=now)=>act(s,command,'test-'+(++serial),date);
const followed=()=>run(initial(),{type:'follow',catId:'mochi'});
test('first follow awards once, multiple companions and unfollow preserve XP',()=>{
  let s=followed();assert.equal(s.points,20);assert.equal(s.primary,'mochi');
  s=run(s,{type:'checkin',catId:'mochi'});s=run(s,{type:'follow',catId:'luna'});
  s=run(s,{type:'primary',catId:'luna'});assert.equal(s.cats.mochi.xp,20);
  s=run(s,{type:'unfollow',catId:'mochi'});s=run(s,{type:'follow',catId:'mochi'});
  assert.equal(s.cats.mochi.xp,20);assert.equal(s.points,25);
  s=run(s,{type:'unfollow',catId:'luna'});assert.equal(s.primary,'');
  assert.throws(()=>run(s,{type:'primary',catId:'luna'}),/Follow/);
});
test('votes are free, limited per Macau calendar day and persist by JSON roundtrip',()=>{
  let s=followed();for(const catId of ['mochi','luna','milo'])s=localVotingService.cast(s,catId,'vote-'+catId,now);
  assert.equal(remainingVotes(s,now),0);assert.equal(s.points,20);assert.equal(s.cats.mochi.xp,0);assert.equal(s.badges.length,3);
  assert.throws(()=>run(s,{type:'vote',catId:'mochi'}),/No votes/);
  const restored=JSON.parse(JSON.stringify(s));assert.equal(remainingVotes(restored,now),0);
  assert.equal(remainingVotes(restored,new Date('2026-11-13T16:00:00Z')),3);
  assert.equal(dayKey(new Date('2026-11-13T16:00:00Z')),'2026-11-14');
});
test('rankings sort total descending and season changes retain old votes without counting them',()=>{
  let s=initial();const before=rankings(s,now);s=run(s,{type:'vote',catId:'luna'});
  assert.equal(rankings(s,now).find(r=>r.catId==='luna')!.total,before.find(r=>r.catId==='luna')!.total+1);
  const next=new Date('2026-12-01T00:00:00Z');assert.equal(rankings(s,next).find(r=>r.catId==='luna')!.total,cats.find(c=>c.id==='luna')!.seedVotes);
  assert.equal(s.votes.length,1);assert.equal(seasonAt(now).endsAt,'2026-11-30T16:00:00.000Z');
  const ties=initial();ties.votes=Array.from({length:6},(_,i)=>({id:String(i),catId:'luna',day:dayKey(now),seasonId:seasonAt(now).id}));
  assert.equal(rankings(ties,now)[0].catId,'luna');
});
test('check-in grants configured PP and XP, blocks duplicates and rewards consecutive weeks',()=>{
  let s=followed();for(const day of ['2026-10-26','2026-11-02','2026-11-09'])s=run(s,{type:'checkin',catId:'mochi'},new Date(day+'T04:00:00Z'));
  assert.equal(s.points,35);assert.equal(s.cats.mochi.xp,100);assert.equal(level(s.cats.mochi.xp),2);
  assert.equal(s.weeklyBonuses.length,1);
  assert.throws(()=>run(s,{type:'checkin',catId:'mochi'},new Date('2026-11-09T05:00:00Z')),/Already/);
  s=run(s,{type:'checkin',catId:'mochi'},new Date('2026-11-10T04:00:00Z'));assert.equal(s.cats.mochi.xp,120);
  let gap=followed();for(const day of ['2026-10-19','2026-11-02','2026-11-09'])gap=run(gap,{type:'checkin',catId:'mochi'},new Date(day+'T04:00:00Z'));
  assert.equal(gap.cats.mochi.xp,60);
});
test('staff interaction once per cat daily, remote care has welfare limit and pending fulfillment',()=>{
  let s=run(followed(),{type:'interaction',catId:'mochi'});assert.equal(s.points,30);assert.equal(s.cats.mochi.xp,30);
  assert.throws(()=>run(s,{type:'interaction',catId:'mochi'}),/already/);
  for(let i=0;i<3;i++)s=run(s,{type:'care',catId:'mochi',packageId:'comfort'});
  assert.equal(s.careOrders.length,3);assert.equal(s.cats.mochi.xp,45);assert.equal(s.points,75);
  assert.equal(s.careOrders[0].status,'awaiting-staff');assert.throws(()=>run(s,{type:'care',catId:'mochi',packageId:'comfort'}),/limit/);
});
test('cart uses catalog prices, checkout earns PP only, empties and records immutable items',()=>{
  let s=followed();s=run(s,{type:'cart',productId:'mochi-cards',quantity:2});s=run(s,{type:'checkout'});
  assert.equal(s.orders[0].amount,116);assert.equal(s.points,136);assert.equal(s.cats.mochi.xp,0);assert.deepEqual(s.cart,{});
  assert.equal(s.orders[0].items[0].unitPrice,products[0].price);assert.equal(s.orders[0].shippingStatus,'not-applicable');
  assert.throws(()=>run(s,{type:'checkout'}),/empty/);
  assert.throws(()=>run(s,{type:'cart',productId:'mochi-cards',quantity:21}),/between/);
});
test('birthday validates date, capacity and package; request earns no points until explicit simulated approval',()=>{
  let s=followed();s=run(s,{type:'birthday',birthday:'2001-03-12'});assert.equal(s.user.birthday,'2001-03-12');
  assert.throws(()=>run(s,{type:'birthday',birthday:'2026-02-30'}),/valid/);
  const booking:Command={type:'book',packageId:'mini',date:'2026-11-20',guests:4,cafeId:'paw-macau',theme:'Peach garden'};
  assert.throws(()=>run(s,{...booking,guests:5}),/capacity/);
  assert.throws(()=>run(s,{...booking,date:'2026-11-01'}),/future/);
  assert.throws(()=>run(s,{...booking,date:'2026-11-31'}),/future/);
  s=run(s,booking);assert.equal(s.bookings[0].status,'requested');assert.equal(s.points,20);
  s=run(s,{type:'confirm-event',bookingId:s.bookings[0].id});assert.equal(s.points,419);assert.equal(s.bookings[0].status,'demo-confirmed');
  assert.throws(()=>run(s,{type:'confirm-event',bookingId:s.bookings[0].id}),/Already/);
});
test('redemption enforces levels, balance and one reward per cat; ledger reconciles',()=>{
  let s=followed();assert.throws(()=>run(s,{type:'redeem',rewardId:'wallpaper',catId:'mochi'}),/Insufficient/);
  s=run(s,{type:'cart',productId:'mochi-cards',quantity:1});s=run(s,{type:'checkout'});
  s=run(s,{type:'redeem',rewardId:'wallpaper',catId:'mochi'});assert.equal(s.points,38);assert.equal(s.wallet.length,1);
  assert.throws(()=>run(s,{type:'redeem',rewardId:'wallpaper',catId:'mochi'}),/already/);
  assert.throws(()=>run(s,{type:'redeem',rewardId:'adoption',catId:'mochi'}),/locked/);
  assert.equal(s.points,s.pointsLedger.reduce((sum,t)=>sum+t.amount,0));
  assert.equal(s.cats.mochi.xp,s.bondLedger.filter(b=>b.catId==='mochi').reduce((sum,b)=>sum+b.amount,0));
});
test('idempotency rejects repeat command IDs without mutating original state; referral once',()=>{
  const s=act(initial(),{type:'follow',catId:'mochi'},'same',now);
  assert.throws(()=>act(s,{type:'vote',catId:'luna'},'same',now),/Already/);assert.equal(s.votes.length,0);
  const next=run(s,{type:'referral'});assert.equal(next.points,50);assert.throws(()=>run(next,{type:'referral'}),/Already/);
});
test('levels and medical sample statuses are safe and all passports distinct',()=>{
  assert.deepEqual([0,99,100,299,300,799,800].map(level),[1,1,2,2,3,3,4]);
  assert.equal(new Set(cats.map(c=>c.identity.passportId)).size,5);
  assert.ok(cats.every(c=>c.identity.vaccination.sample&&c.identity.vaccination.status!=='verified'&&c.identity.vaccination.lastVerified===null));
});

function initial():import('../src/lib/models').DemoState{return {...guestInitial(),demoSignedIn:true};}
