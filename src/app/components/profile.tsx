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
      <nav className="flex justify-end place-items-center gap-4 sm:gap-10 mt-[-65px] sm:mr-8 ">
        {user && (
          <>
            <div className="place-items-center mt-[-10px]">
              <div className="flex justify-center">
                <img
                  src={
                    user?.photoURL ||
                    "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
                  }
                  className="w-12 h-12 mt-2 rounded-full "
                />
              </div>
              <div className="font-bold text-[8px] sm:text-[12px] text-white">
                {user?.displayName}
              </div>
            </div>

            <Dialog.Root>
              <Dialog.Trigger>
                <DotsHorizontalIcon className=" w-7 h-7 bg-white rounded-full mt-[-8px]" />
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="data-[state=open]" />
                <Dialog.Content
                  className="data-[state=open] bg-black opacity-[0.9] text-white 
        border-solid border-2 border-black border-r-0 
       h-24 w-24 absolute top-[65px] left-[320px] sm:left-[675px] lg:left-[1135px]"
                >
                  <Dialog.Description className=" ">
                    <fieldset className="text-nowrap text-right">
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
          </>
        )}
      </nav>
    </div>
  );
}
