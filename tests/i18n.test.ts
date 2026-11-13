import test from 'node:test';
import assert from 'node:assert/strict';
import { languages, translate } from '../src/lib/i18n';
import translations from '../src/lib/translations.json';
import { cats, cafes, products, names, rewards, eventPackages } from '../src/data/seed';
import { featureLinks, stories, moments, culture } from '../src/data/world';
import { infoPages } from '../src/data/info';
import { categories, colors } from '../src/lib/catalog';
import { carePackages, themes } from '../src/lib/config';
import { petScenes, petActions, creditsRules } from '../src/lib/round3';
import fs from 'node:fs';
import ts from 'typescript';
test('all four languages have non-empty dictionary values and preserve names',()=>{
  assert.deepEqual(languages.map(l=>l.code),['zh-Hans','zh-Hant','en','pt']);
  for(const [key,values] of Object.entries(translations)){
    assert.equal(values.length,3,key);assert.ok(values.every(v=>v.trim().length),key);
    assert.equal(translate(key,'en'),key);
  }
  assert.equal(translate('Mochi','pt'),'Mochi');
});
test('all rendered copy and dynamic catalog content have four-language coverage',()=>{
  const keys=new Set<string>([...petScenes.flatMap(v=>[v.name,v.caption]),...petActions.flatMap(v=>[v.name,v.reaction]),...creditsRules.flatMap(v=>[...v]),...cafes.flatMap(v=>v.specialty?[v.specialty]:[]),...cats.flatMap(c=>[c.trait,c.bio,c.identity.breed,c.identity.origin,c.identity.care]),...products.flatMap(p=>[p.name,p.description]),...names,...rewards.flatMap(r=>[r.name,r.description]),...eventPackages.flatMap(p=>p.benefits),...carePackages.map(p=>p.name),...themes,...categories,...colors,...products.flatMap(p=>[p.category,p.colorName,p.productType,p.availability]),...cafes.flatMap(c=>[c.location,c.address,c.description]),...featureLinks.flatMap(f=>[f.name,f.copy]),...stories.flatMap(s=>[s.title,s.caption,s.chapter,s.body]),...moments.flatMap(m=>[m.caption,m.creator]),...culture.flatMap(c=>[c.title,c.copy]),...Object.values(infoPages).flatMap(p=>[p.title,p.eyebrow,...p.paragraphs])]);
  for(const file of fs.readdirSync('src/components').filter(f=>f.endsWith('.tsx'))){
    const source=ts.createSourceFile(file,fs.readFileSync('src/components/'+file,'utf8'),ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
    function visit(node:ts.Node){
      if(ts.isCallExpression(node)&&node.expression.getText(source)==='t'){
        function collect(n:ts.Node){if(ts.isStringLiteral(n)&&n.text)keys.add(n.text);else if(ts.isConditionalExpression(n)){collect(n.whenTrue);collect(n.whenFalse)}else ts.forEachChild(n,collect)}
        node.arguments.forEach(collect);
      }
      ts.forEachChild(node,visit);
    }visit(source);
  }
  const assistantSource=ts.createSourceFile('assistant.ts',fs.readFileSync('src/lib/assistant.ts','utf8'),ts.ScriptTarget.Latest,true);
  function assistantCopy(node:ts.Node){if(ts.isPropertyAssignment(node)&&['title','body','label'].includes(node.name.getText(assistantSource))&&ts.isStringLiteral(node.initializer))keys.add(node.initializer.text);ts.forEachChild(node,assistantCopy)}assistantCopy(assistantSource);
  for(const key of ['About Paw Points','Cat ID','CAT 101','Paw Birthday','Shop','Cafés','Paw Journal','Live Cat World','Contact','Privacy','Terms','QR studio','Find a calm cat','Plan a birthday','Nearby cafés','How do points work?','Physical','Digital','Demo available','Coming soon','Product not available','The guide could not answer. Please try again.','Voice input is unavailable. You can type your question instead.'])keys.add(key);
  const branded=['CAT 101','Mochi','Luna','Coco'];
  const missing=[...keys].filter(key=>!branded.includes(key)&&!(key in translations));
  assert.deepEqual(missing,[]);
});
