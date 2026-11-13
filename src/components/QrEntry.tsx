'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { cafes, cats } from '../data/seed';
import { localEntryAnalytics, qrTarget, resolveCafe } from '../lib/qr-entry';
import './qr-entry.css';
export function EntryTracker(){
  const pathname=usePathname();
  useEffect(()=>{
    const url=new URL(location.href), id=url.pathname.split('/').filter(Boolean)[1];
    const cat=url.pathname.startsWith('/cats/')?cats.find(c=>c.id===id):undefined;
    const cafe=url.pathname.replace(/\/$/,'')==='/enter'?resolveCafe(url.searchParams.get('cafe')||''):undefined;
    if(cafe || (cat && url.searchParams.get('source')==='qr')) void localEntryAnalytics.record({cafeId:(cafe?.id||cat!.cafeId),...(cat?{catId:cat.id}:{}),source:'QR',timestamp:new Date().toISOString()});
  },[pathname]);return null;
}
export function CafeEntry(){
  const [id,setId]=useState<string|null>(null);
  useEffect(()=>setId(new URL(location.href).searchParams.get('cafe')||''),[]);
  const cafe=resolveCafe(id||'');
  return <main className="qr-page"><Link href="/">🐾 Paw Points</Link>{id===null?<p>Opening café…</p>:!cafe?<><h1>Let’s find your café</h1><p>This café link is unavailable. You can still meet our demo cats.</p><Link className="qr-button" href="/cats">Explore cats</Link></>:<><p>WELCOME TO</p><h1>{cafe.name}</h1><p>A little coffee. A little curiosity. A world of paws.</p><p>Fictional café demo · No installation or registration needed.</p><div className="qr-grid">{cats.filter(c=>c.cafeId===cafe.id).map(c=><Link className="qr-button" key={c.id} href={'/cats/'+c.id+'?source=qr'}>{c.name} → View Cat ID Card</Link>)}</div><div className="qr-grid">{[['/cat101','CAT 101 · Explore & vote'],['/cats','Cat ID Cards'],['/birthday','Birthday experiences'],['/shop','IP shop']].map(([href,label])=><Link className="qr-button" key={href} href={href}>{label}</Link>)}</div><p>Browse and vote in demo mode. Progress stays in this browser. Persistent accounts, cross-device progress, real purchases and confirmed bookings are not available in this MVP.</p></>}</main>;
}
export function QrGenerator(){
  const [selection,setSelection]=useState('cafe:pawbrew'),[png,setPng]=useState(''),[svg,setSvg]=useState(''),[error,setError]=useState('');
  const [kind,id]=selection.split(':');
  let target='';try{target=qrTarget(kind,id)}catch{/* Shown below */}
  useEffect(()=>{let active=true;setPng('');setSvg('');if(!target){setError('Configure NEXT_PUBLIC_SITE_URL with a valid URL.');return}setError('');Promise.all([QRCode.toDataURL(target,{width:1024,margin:4,errorCorrectionLevel:'M'}),QRCode.toString(target,{type:'svg',margin:4,errorCorrectionLevel:'M'})]).then(([p,s])=>{if(active){setPng(p);setSvg(s)}}).catch(()=>{if(active)setError('QR generation failed. Please retry.')});return()=>{active=false}},[target]);
  const printable=target.startsWith('https://')&&!/https:\/\/(localhost|127\.|\[::1\])/.test(target);
  return <main className="qr-page"><Link href="/">🐾 Paw Points</Link><h1>QR studio</h1><p>Create a doorway to your café.</p><label>Destination<select value={selection} onChange={e=>setSelection(e.target.value)}><optgroup label="Cafés">{cafes.map(c=><option key={c.id} value={'cafe:'+(c.id==='paw-macau'?'pawbrew':c.id)}>{c.name}</option>)}</optgroup><optgroup label="Cats">{cats.map(c=><option key={c.id} value={'cat:'+c.id}>{c.name}</option>)}</optgroup></select></label><p className="qr-url">{target}</p>{error&&<p role="alert">{error}</p>}{png&&<img className="qr-code" src={png} alt={'QR code for '+target} width={280} height={280}/>}<p>{printable?'HTTPS configured. Verify public access and scan on a phone before printing.':'Local development only — do not print. Set NEXT_PUBLIC_SITE_URL to the actual public HTTPS deployment and rebuild.'}</p><div className="qr-grid">{png&&<a className="qr-button" download={id+'.png'} href={png}>Download PNG</a>}{svg&&<a className="qr-button" download={id+'.svg'} href={'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg)}>Download SVG</a>}</div><p>In WeChat, if downloading is blocked, open this page in Safari or Chrome. Entry events are local demo data, not cross-device analytics.</p></main>;
}
