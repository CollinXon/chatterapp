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
    <div>
      <nav className="flex justify-end place-items-center gap-8 sm:gap-10 mt-[-65px]  pr-6 ">
        {user && (
          <>
            <div className="place-items-center   ">
              <div className="flex justify-center">
                <img
                  src={
                    user?.photoURL ||
                    "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
                  }
                  
                  alt="Avatar"
                  className="w-11 h-11 md:w-12 md:h-12 mt-2 md:mt-[-5px] rounded-full "
                />
              </div>
              <div className="font-bold text-[8px] sm:text-[12px] text-white">
                {user?.displayName}
              </div>
            </div>
                  <div className="">
            <Dialog.Root>
              <Dialog.Trigger>
                <DotsHorizontalIcon className=" w-7 h-7 bg-white rounded-full mt-[-8px] " />
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="data-[state=open]" />
                <Dialog.Content
                  className="data-[state=open] bg-black opacity-[0.9] text-white 
        border-solid border-2 border-black border-r-0 
       h-24 w-24 ml-[-30px] sm:ml-0 absolute top-[65px] left-[310px]  sm:left-[525px] lg:left-[1135px]  flex flex-shrink-0 flex-grow-0 "
                >
                  <Dialog.Description className=" ">
                    <fieldset className="text-nowrap">
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
    </div>
  );
}
