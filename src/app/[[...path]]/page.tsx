import PawApp from '../../components/PawApp';
import { cats, cafes } from '../../data/seed';
import { stories } from '../../data/world';
export function generateStaticParams(){return [{path:[]},...['cats','cat101','birthday','shop','companion','rewards','profile','menu','cafes','stories','live','about','contact','privacy','terms'].map(p=>({path:[p]})),...cats.map(cat=>({path:['cats',cat.id]})),...cafes.map(cafe=>({path:['cafes',cafe.id]})),...stories.map(story=>({path:['stories',story.id]}))]}
export default function Page(){return <PawApp/>}
