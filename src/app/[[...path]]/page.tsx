import PawApp from '../../components/PawApp';
export function generateStaticParams(){return [{path:[]},...['menu','cats','companion','rewards','profile'].map(p=>({path:[p]})),...['mochi','luna','milo'].map(id=>({path:['cats',id]}))]}
export default function Page(){return <PawApp/>}
