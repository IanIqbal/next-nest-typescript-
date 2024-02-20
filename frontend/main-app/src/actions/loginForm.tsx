import { setLocal } from "@/utils/localStorage"
import { RedirectType, redirect } from "next/navigation"

const loginUser = async (data: FormData) => {
    "use server"
    try {
        // console.log(data);
        let form = {
            email: data.get("email"),
            password: data.get("password")
        }
        let response = await fetch("http://localhost:3000/login_user", {
            method: "post",
            body: JSON.stringify(form),
            headers: {
                'content-type': 'application/json;charset=UTF-8'
            }
        })

        let loginResponse = await response.json()
        console.log(loginResponse);

        setLocal(loginResponse.access_token)
        // NextResponse.redirect("/dashboard")

        // toDashboard()
    } catch (error) {
        console.log(error);
    }

    redirect("/dashboard", RedirectType.push)
}

const toDashboard = ()=>{
    "use client"
    redirect("/dashboard")
}

export default loginUser