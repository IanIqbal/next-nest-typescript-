import Link from "next/link";


export const Navbar = () => {
    return(
        <nav className=" flex gap-5 justify-start items-center h-20 bg-white mx-auto max-w-full px-28 ">
          <Link className="text-amber-500 text-xl" href={""} >Event</Link>
          <Link className="text-amber-500 text-xl" href={""}>Innovation</Link>
        </nav>
    )
}

export default Navbar