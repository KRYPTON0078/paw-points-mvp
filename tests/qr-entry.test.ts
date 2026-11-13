import test from 'node:test';
import assert from 'node:assert/strict';
import {qrTarget,resolveCafe,localEntryAnalytics} from '../src/lib/qr-entry';
import QRCode from 'qrcode';
test('café alias, invalid targets and cats',()=>{assert.equal(resolveCafe('pawbrew')?.id,'paw-macau');assert.equal(resolveCafe('missing'),undefined);assert.throws(()=>qrTarget('cat','missing'));assert.match(qrTarget('cat','mochi'),/\/cats\/mochi\?source=qr$/);assert.match(qrTarget('cafe','pawbrew'),/\/enter\?cafe=pawbrew$/)});
test('PNG and SVG payloads',async()=>{const target=qrTarget('cat','luna');assert.match(await QRCode.toDataURL(target),/^data:image\/png;base64,/);assert.match(await QRCode.toString(target,{type:'svg'}),/<svg/)});
test('local events survive adapter re-read',()=>{const data=new Map<string,string>();Object.defineProperty(globalThis,'localStorage',{configurable:true,value:{getItem:(k:string)=>data.get(k)||null,setItem:(k:string,v:string)=>data.set(k,v)}});localEntryAnalytics.record({cafeId:'paw-macau',source:'QR',timestamp:new Date().toISOString()});assert.equal(JSON.parse(data.get('paw-qr-events')!)[0].source,'QR')});
