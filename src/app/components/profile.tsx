"use client";

import { auth } from "../utils/config/firebase";

import { useAuthState } from "react-firebase-hooks/auth";

import { signOut } from "firebase/auth";

import { useRouter } from "next/navigation";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import * as Dialog from "@radix-ui/react-dialog";
import ProfileDialog from "./profiledialog";


export default function Profile() {
  const router = useRouter();

  const [user] = useAuthState(auth);

  const handleSignOUt = async () => {
    await signOut(auth);

    router.push("/");
  };

  return (
      <nav className="flex justify-end place-items-center   ">
        {user && (
          <>
            <div className="flex flex-col place-items-center absolute left-56 sm:left-[550px] ipad-air:left-[630px] lg:left-[830px] xl:left-[1080px] top-4  ">
              <div className="flex justify-center ">
                <img
                  src={
                    user?.photoURL ||
                    "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
                  }
                  
                  alt="Avatar"
                  className="flex w-10 h-10 md:w-12 md:h-12 mt-2 md:mt-[-5px] rounded-full "
                />
              </div>
              <div className="font-md italic text-[10px] sm:text-[12px] text-white">
                {user?.displayName}
              </div>
            </div>
                  <div className="flex absolute left-80 sm:left-[680px] pixel-7:left-[350px] lg:left-[870px] xl:left-[1130px] top-8 lg:top-7">
            <Dialog.Root>
              <Dialog.Trigger>
                <DotsHorizontalIcon className=" w-7 h-7 bg-red-400 rounded-full  absolute  ipad-air:left-24 " />
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="data-[state=open]" />
                <Dialog.Content
                  className="data-[state=open] bg-black opacity-[0.9] text-white 
        border-solid border-2 border-black border-r-0 
       h-24 w-24 ml-[0px] sm:ml-0 absolute top-[65px] left-64   sm:left-[650px]  ipad-air:left-[725px] lg:left-[930px] xl:left-[1184px]  flex flex-shrink-0 flex-grow-0 "
                >
                  <Dialog.Title/>
                  <Dialog.Description className="text-nowrap">
                    <fieldset className="">
                      <ProfileDialog />
                    </fieldset>

                    <fieldset className="ml-2 mt-2">
                      <button onClick={handleSignOUt}>LogOUt</button>
                    </fieldset>
                  </Dialog.Description>
                  <Dialog.Close />
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
            </div>
          </>
        )}
      </nav>
    
  );
}
