import { ImageBox } from "./ImageBox"
import LoginForm from "./LoginForm"


export default function LoginContainer(){
    return(
            <div className="flex flex-col my-0">
                <LoginForm></LoginForm>
               <ImageBox></ImageBox>
            </div>
    )
}