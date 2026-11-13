import type {NextConfig} from 'next';
const config:NextConfig={output:'export',trailingSlash:true,env:{NEXT_PUBLIC_BASE_PATH:process.env.GITHUB_PAGES==='true'?'/paw-points-mvp':''},basePath:process.env.GITHUB_PAGES==='true'?'/paw-points-mvp':''};export default config;
