import type { Cafe, Cat, EventPackage, MerchandiseProduct, Reward } from '../lib/models';
export { names } from '../lib/config';
const img = (id: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/cats/${id}.jpg`;
export const cafes: Cafe[] = [{id:'paw-macau', name:'Paw & Brew Macau', location:'Macau · Sample café'}];
const shared = {cafeId:'paw-macau', identity: {passportId:'', breed:'Domestic shorthair', birthDate:'', gender:null, origin:'', vaccination:{label:'Sample vaccination record',status:'pending' as const,lastVerified:null,sample:true as const},care:'Rest, enrichment and all interactions are guided by trained staff.'}};
export const cats: Cat[] = [
  {...shared,id:'mochi',name:'Mochi',age:2,image:img('mochi'),trait:'Gentle soul · Sunbeam seeker',bio:'Mochi turns quiet afternoons into an art form. A window seat, a soft blanket, and your patient company are all this little sunbeam needs.',fans:0,seedVotes:0,identity:{...shared.identity,passportId:'PAW-MO-001',birthDate:'2024-05 (approx.)',origin:'Sample story: adopted through a local rescue network.'}},
  {...shared,id:'luna',name:'Luna',age:3,image:img('luna'),trait:'Quietly curious · A little independent',bio:'Luna watches the world before joining in. Give her space and she might choose the seat beside you. Her fan club calls it a very special invitation.',fans:0,seedVotes:0,identity:{...shared.identity,passportId:'PAW-MO-002',birthDate:'2023-08 (approx.)',origin:'Sample story: rehomed with support from a foster family.',vaccination:{...shared.identity.vaccination,status:'not-provided'}}},
  {...shared,id:'milo',name:'Milo',age:1,image:img('milo'),trait:'Playful spirit · Everyone’s friend',bio:'Milo finds wonder in a paper bag and adventure in a sunlit corner. His playful energy comes in short bursts, followed by very serious naps.',fans:0,seedVotes:0,identity:{...shared.identity,passportId:'PAW-MO-003',birthDate:'2025-02 (approx.)',origin:'Sample story: welcomed from a community foster programme.'}},
  {...shared,id:'coco',name:'Coco',age:4,image:img('coco'),trait:'Velvet calm · A thoughtful observer',bio:'Coco is the quiet heart of the room. She loves a slow morning and a familiar face, and always reserves the right to enjoy her own company.',fans:0,seedVotes:0,identity:{...shared.identity,passportId:'PAW-MO-004',birthDate:'2022-04 (approx.)',origin:'Sample story: a former family companion in a caring new home.',vaccination:{...shared.identity.vaccination,status:'not-provided'}}},
  {...shared,id:'nori',name:'Nori',age:2,image:img('nori'),trait:'Bright eyes · Tiny adventurer',bio:'Nori is an expert at finding new perspectives from the highest safe perch. Curious and alert, this little explorer makes every ordinary day interesting.',fans:0,seedVotes:0,identity:{...shared.identity,passportId:'PAW-MO-005',birthDate:'2024-09 (approx.)',origin:'Sample story: rescued as a kitten and raised by volunteers.'}},
];
export const products: MerchandiseProduct[] = [
  {id:'mochi-cards',catId:'mochi',name:'Sunbeam photo cards',description:'A collectible set of five Mochi portraits. Printed keepsakes for your favourite little sunshine.',price:58,kind:'photo',color:'#f2d6bd',revenueShareCafeId:'paw-macau'},
  {id:'luna-stickers',catId:'luna',name:'Moonlight sticker set',description:'Six little Luna moods for your notebook, laptop, or a letter to a friend.',price:38,kind:'sticker',color:'#ded7f0',revenueShareCafeId:'paw-macau'},
  {id:'milo-tote',catId:'milo',name:'Everyday adventure tote',description:'A playful Milo design on a roomy everyday tote. A little companion for your daily adventures.',price:128,kind:'tote',color:'#dce4d4',revenueShareCafeId:'paw-macau'},
  {id:'coco-poster',catId:'coco',name:'Quiet moments art print',description:'An editorial Coco portrait for your favourite corner. A3 collectible art print concept.',price:88,kind:'poster',color:'#edd7cf',revenueShareCafeId:'paw-macau'},
  {id:'nori-member',catId:'nori',name:'Little explorer fan card',description:'A digital collectible fan membership card featuring Nori. Demo collectible; no paid voting advantages.',price:48,kind:'digital',color:'#dae3e6',revenueShareCafeId:'paw-macau'},
  {id:'mochi-winter',catId:'mochi',name:'Winter sunshine collection',description:'A seasonal Mochi postcard and sticker collection. A small piece of warmth to keep.',price:78,kind:'seasonal',color:'#f0dfcb',revenueShareCafeId:'paw-macau'},
];
export const eventPackages: EventPackage[] = [
  {id:'mini',name:'Paw Mini Party',price:399,maxGuests:4,benefits:['Themed decorations','Digital birthday invitation','Photo opportunities, subject to welfare rules']},
  {id:'celebration',name:'Paw Celebration',price:699,maxGuests:8,benefits:['Premium decorations','Personalized birthday card','Reserved event space','Exclusive digital fan badge']},
  {id:'vip',name:'Paw VIP Birthday',price:999,maxGuests:12,benefits:['Customized party theme','Digital photo collection','Personalized cat IP merchandise','Priority event coordination']},
];
export const rewards: Reward[] = [
  {id:'wallpaper',name:'Cat portrait wallpaper',cost:40,level:1,description:'A demo digital collectible voucher featuring your companion.'},
  {id:'invite',name:'Personalized fan invitation',cost:100,level:1,description:'A demo invitation design voucher; staff approval is required.'},
  {id:'priority',name:'Priority event request',cost:150,level:2,description:'Priority request access only. Availability and animal welfare rules still apply.'},
  {id:'vip',name:'Companion experience request',cost:300,level:3,description:'Request a staff-guided experience. Physical interaction is never guaranteed.'},
  {id:'adoption',name:'Adoption application information',cost:0,level:4,description:'Information only. Eligibility, welfare checks and independent human review are required.'},
];
