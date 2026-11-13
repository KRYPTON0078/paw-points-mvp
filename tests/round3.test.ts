import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { act, initial, remainingVotes } from '../src/lib/engine';
import { fanContribution, fanRankings, petActions, petScenes } from '../src/lib/round3';
import { cafes, cafeCats, cats, products } from '../src/data/seed';
const now = new Date('2026-11-13T04:00:00Z');
test('all pet reactions and scenes preserve existing balances, relationships, votes and legacy storage', () => {
 let s = act(initial(), {type:'follow',catId:'mochi'}, 'follow', now);
 const before = structuredClone(s);
 for (const scene of petScenes) {
  s = act(s, {type:'pet-scene',catId:'mochi',scene:scene.id}, scene.id, now);
  for (const action of petActions) s = act(s,{type:'pet',catId:'mochi',scene:scene.id,action:action.id},scene.id+action.id,now);
 }
 assert.equal(s.petHistory?.length,16);
 const restored = JSON.parse(JSON.stringify(s));
 assert.equal(restored.petScenes.mochi,'night');
 assert.deepEqual(restored.petHistory,s.petHistory);
 for (const field of ['points','pointsLedger','bondLedger','cats','votes','primary','cart','orders','wallet'] as const) assert.deepEqual(s[field],before[field],field);
 assert.equal(before.petHistory,undefined);
 assert.throws(()=>act(s,{type:'pet-scene',catId:'unknown',scene:'cafe'},'bad',now),/Unknown cat/);
});
test('pet journal is bounded and repeated commands cannot create duplicate moments', () => {
 let s=initial();
 for(let i=0;i<65;i++)s=act(s,{type:'pet',catId:'luna',scene:'garden',action:'pet'},'pet'+i,now);
 assert.equal(s.petHistory?.length,60);
 assert.throws(()=>act(s,{type:'pet',catId:'luna',scene:'garden',action:'pet'},'pet64',now),/Already/);
 assert.equal(s.petHistory?.[0].id,'pet64');
});
test('fan contribution comes exclusively from accepted votes and obeys existing daily cap', () => {
 let s=act(initial(),{type:'follow',catId:'mochi'},'follow',now);
 s=act(s,{type:'checkin',catId:'mochi'},'checkin',now);
 s=act(s,{type:'pet',catId:'mochi',scene:'night',action:'play'},'play',now);
 assert.equal(fanContribution(s),0);
 for(let i=0;i<3;i++)s=act(s,{type:'vote',catId:i?'luna':'mochi'},'vote'+i,now);
 assert.equal(fanContribution(s),3);
 assert.equal(remainingVotes(s,now),0);
 assert.equal(fanRankings(s).find(f=>f.id==='local')?.catId,'luna');
 assert.throws(()=>act(s,{type:'vote',catId:'luna'},'fourth',now),/No votes/);
 assert.throws(()=>act(s,{type:'vote',catId:'luna'},'vote0',now),/Already/);
 assert.equal(fanContribution({...s,votes:[...s.votes,s.votes[0]]}),3);
 s=act(s,{type:'vote',catId:'luna'},'tomorrow',new Date('2026-11-14T04:00:00Z'));
 assert.equal(fanContribution(s),4);
});
test('five fictional cafes have real cat identities and all merchandise kinds have distinct local mockups', () => {
 assert.ok(cafes.length>=5);
 for(const cafe of cafes){
  assert.equal(cafe.sample,true);
  assert.ok(cafeCats(cafe.id).length);
  assert.ok(cafeCats(cafe.id).every(c=>cats.some(v=>v.id===c.id)));
  assert.ok(fs.existsSync('public'+cafe.image));
 }
 const artworks = new Set<string>();
 for(const kind of new Set(products.map(p=>p.kind))){
  const svg=fs.readFileSync(`public/merch/${kind}.svg`,'utf8');
  assert.match(svg,/<svg/);assert.doesNotMatch(svg,/<image|href=["']https?:/);artworks.add(svg);
 }
 assert.equal(artworks.size,new Set(products.map(p=>p.kind)).size);
 for(const scene of petScenes)assert.ok(fs.existsSync(`public/scenes/${scene.id}.svg`));
});
