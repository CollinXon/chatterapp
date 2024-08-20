"use client"

import Link from "next/link";

import { auth } from "./utils/config/firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import { Pencil2Icon } from "@radix-ui/react-icons";








const NavBar = () => {

    const [user] = useAuthState(auth);

return (

    <div >
<nav className=" block  sm:hidden">

<Link href="/posts/createpost" title="Create Post"><Pencil2Icon className="h-9 w-9 absolute top-28 right-0 text-slate-900"/></Link>





</nav>


<nav className=" hidden sm:block">

<Link href="/posts/createpost" title="Create Post" className="flex place-items-center gap-2  absolute top-[20px] right-56 text-white"><Pencil2Icon className="h-9 w-9  "/> Write</Link>




</nav>


</div>
)
}


export default NavBar;