import Image from "next/image"
import launch3 from "../../../public/launch-3.jpg"
import launch2 from "../../../public/launch-2.jpg"
import launch1 from "../../../public/launch-1.jpg"
import React from "react"

export const LoginImage = () => {
    let sizeWidth = 500
    let sizeHeight = 500
    return (
        <div className=" gap-10 flex justify-center  py-8 bg-gradient-to-r from-sky-500 to-indigo-500 ">
            <Image
                src={launch3}
                alt="Launch page image"
                width={sizeWidth}
                height={sizeHeight}
            ></Image>

            <Image
                src={launch2}
                alt="Launch page image"
                width={sizeWidth}
                height={sizeHeight}
            ></Image>
             <Image
                src={launch1}
                alt="Launch page image"
                width={sizeWidth}
                height={sizeHeight}
            ></Image>
        </div>
    )
}