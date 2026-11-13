import PawApp from '../../components/PawApp';
import { cats } from '../../data/seed';
export function generateStaticParams(){return [{path:[]},...['cats','cat101','birthday','shop','companion','rewards','profile','menu'].map(p=>({path:[p]})),...cats.map(cat=>({path:['cats',cat.id]}))]}
export default function Page(){return <PawApp/>}
