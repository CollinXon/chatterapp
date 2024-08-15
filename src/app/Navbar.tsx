"use client"

import Link from "next/link";

import { auth } from "./utils/config/firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import { Pencil2Icon } from "@radix-ui/react-icons";








const NavBar = () => {

    const [user] = useAuthState(auth);

return (

    <div >
<nav className=" block sm:hidden">

<Link href="/posts/createpost"><Pencil2Icon className="h-8 w-8 absolute top-[30px] left-60 text-white"/></Link>





</nav>


<nav className=" hidden sm:block">

<Link href="/posts/createpost" title="Create Post" className="flex place-items-center gap-2  absolute top-[20px] right-56 text-white"><Pencil2Icon className="h-9 w-9  "/> Write</Link>




</nav>


</div>
)
}


export default NavBar;