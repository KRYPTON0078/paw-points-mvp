import test from 'node:test';
import assert from 'node:assert/strict';
import { languages, translate } from '../src/lib/i18n';
import translations from '../src/lib/translations.json';
import { cats, products, names, rewards, eventPackages } from '../src/data/seed';
import { carePackages, themes } from '../src/lib/config';
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
  const keys=new Set<string>([...cats.flatMap(c=>[c.trait,c.bio,c.identity.breed,c.identity.origin,c.identity.care]),...products.flatMap(p=>[p.name,p.description]),...names,...rewards.flatMap(r=>[r.name,r.description]),...eventPackages.flatMap(p=>p.benefits),...carePackages.map(p=>p.name),...themes]);
  for(const file of ['PawApp.tsx','Discovery.tsx','Experiences.tsx','Account.tsx','ui.tsx','QrEntry.tsx']){
    const source=ts.createSourceFile(file,fs.readFileSync('src/components/'+file,'utf8'),ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
    function visit(node:ts.Node){
      if(ts.isCallExpression(node)&&node.expression.getText(source)==='t'){
        function collect(n:ts.Node){if(ts.isStringLiteral(n)&&n.text)keys.add(n.text);else if(ts.isConditionalExpression(n)){collect(n.whenTrue);collect(n.whenFalse)}else ts.forEachChild(n,collect)}
        node.arguments.forEach(collect);
      }
      ts.forEachChild(node,visit);
    }visit(source);
  }
  const branded=['CAT 101'];
  const missing=[...keys].filter(key=>!branded.includes(key)&&!(key in translations));
  assert.deepEqual(missing,[]);
});
