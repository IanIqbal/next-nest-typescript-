import NextFederationPlugin from '@module-federation/nextjs-mf';
import { config } from 'process';

/** @type {import('next').NextConfig} */
NextFederationPlugin
const nextConfig = {
    // webpack:(config,options) =>{
    //     const {isServer} = options
    //     config.experiments = {topLevelAwait:true}
    //     config.plugins.push(
    //         new NextFederationPlugin(
    //             {
    //                 name:"main-app",
    //                 remotes:{
    //                     login:`login@http://localhost:2002/_next/static/${isServer ? 'ssr' : 'chunks'}/remoteEntry.js`
    //                 },
    //                 filename: 'static/chunks/remoteEntry.js'
    //             }
    //         )
    //     )

    //     return config;
    // }
};

export default nextConfig;
