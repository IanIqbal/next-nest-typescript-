import * as bcrypt from "bcrypt"


export const hashPassword = async (password:string) : Promise <string> => {
    let salt = await bcrypt.genSalt(10)
    let hashedPassword = await  bcrypt.hash(password, salt)
    
    return hashedPassword
}

export const comparePassword = async(checkedPassword:string,password:string) : Promise<boolean> =>{
    // console.log(checkedPassword, password);
    let result = await bcrypt.compare(checkedPassword, password)
    console.log(result);
    
    return result
}