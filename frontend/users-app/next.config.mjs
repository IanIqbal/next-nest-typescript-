import {NextFederationPlugin} from '@module-federation/nextjs-mf';

/** @type {import('next').NextConfig} */
NextFederationPlugin
const nextConfig = {
    webpack(config,options){
        const {isServer} = options
        config.plugins.push(
            new NextFederationPlugin(
                {   
                    name:"main",
                    remotes:{
                        login:`login@http://localhost:2002/_next/static/${isServer ? 'ssr' : 'chunks'}/remoteEntry.js`
                    },
                    filename: 'static/chunks/remoteEntry.js',
                    extraOptions:{
                        debug:true
                    }
                }
            )
        )
                console.log("webpack function");
        return config;
    },
    experimental:{
        appDir:true
    }
};

export default nextConfig;
