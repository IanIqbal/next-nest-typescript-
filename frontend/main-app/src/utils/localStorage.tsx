

export const setLocal = (token:string)=>{
    'use client'

    if(typeof window !== 'undefined'){
        window.localStorage.setItem("access_token", token)
    }

}