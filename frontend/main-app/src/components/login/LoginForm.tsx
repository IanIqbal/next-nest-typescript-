import loginUser from "@/actions/loginForm"


 const LoginForm = async () => {
   

    return (
        <div className="flex flex-col gap-10  items-center justify-center  h-3/6 bg-white  text-gray-900 py-24" >
            <h1 className=" text-2xl text-amber-500" >Login</h1>
            <form action={loginUser} className="p-8 border-solid rounded-lg  border-indigo-500/100 border-2" >
                <div className="flex flex-col gap-4">

                    <label >Email</label>
                    <input className="border-solid rounded-lg border-gray-100 border-2" type="text" name="email" />

                    <label >Password</label>
                    <input className="border-solid rounded-lg border-gray-100 border-2" type="text" name="password" />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginForm