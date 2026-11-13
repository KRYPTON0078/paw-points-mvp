import { EntryTracker } from '../components/QrEntry';
import './globals.css';
import '../components/brand-world.css';
export const metadata={title:'Paw Points · Every Cat Has a Story',description:'A fictional Cat IP & fan community demo. Discover cat identities, vote in CAT 101, plan a birthday, and explore cat-inspired collectibles.'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="zh-Hans"><body><EntryTracker/>{children}</body></html>}
