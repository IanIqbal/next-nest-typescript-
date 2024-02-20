import LoginForm from "./LoginForm"
import { LoginImage } from "./LoginImage"
import React from "react"


export default function LoginContainer(){
    return(
            <div className="flex flex-col">
                <LoginForm></LoginForm>
                <LoginImage></LoginImage>
            </div>
    )
}