import type {NextConfig} from 'next';
const config:NextConfig={output:'export',trailingSlash:true,basePath:process.env.GITHUB_PAGES==='true'?'/paw-points-mvp':''};export default config;
