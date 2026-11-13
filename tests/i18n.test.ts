import test from 'node:test';
import assert from 'node:assert/strict';
import {languages, translate} from '../src/lib/i18n';
import translations from '../src/lib/translations.json';
import {cats, products, names, rewards} from '../src/data/seed';
test('all four languages cover every translation and preserve English',()=>{
  assert.deepEqual(languages.map(l=>l.code), ['zh-Hans','zh-Hant','en','pt']);
  for(const [key,values] of Object.entries(translations)){
    assert.equal(values.length,3,key);
    for(const locale of languages){
      assert.ok(translate(key,locale.code).trim(), key);
      if(locale.code==='en')assert.equal(translate(key,locale.code),key);
      else if(!(locale.code==='pt'&&['Paw Points','Menu','Total MOP'].includes(key))) assert.notEqual(translate(key,locale.code),key,`${locale.code}: ${key}`);
    }
  }
});
test('dynamic product, cat, level and reward content has translations',()=>{
  const keys=[...cats.map(c=>c.trait),...products.map(p=>p.name),...names,...rewards.map(r=>r[0])];
  for(const key of keys)assert.ok(key in translations,key);
  assert.equal(translate('Mochi','pt'),'Mochi');
});
