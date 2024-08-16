"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { auth, storage } from "../utils/config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState, ChangeEvent, useEffect } from "react";
import { updateProfile } from "firebase/auth";
import Image from "next/image";

const ProfileDialog = () => {
  const [user, loading, error] = useAuthState(auth);
  const [photoURL, setPhotoUrl] = useState<string | null>(
    user?.photoURL ||
      "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
  );
  const [image, setImage] = useState<File | null>(null);
  const [displayName, setDisplayName] = useState<string>(
    user?.displayName || ""
  );

  useEffect(() => {
    if (user?.photoURL) {
      setPhotoUrl(user.photoURL);
    }
  }, [user]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    if (!user) return;

    if (image) {
      const fileRef = ref(storage, `profiles/${user.uid}/${image.name}`);
      await uploadBytes(fileRef, image);
      const downloadURL = await getDownloadURL(fileRef);
      await updateProfile(user, { photoURL: downloadURL });
      setPhotoUrl(downloadURL);
    }

    if (displayName) {
      await updateProfile(user, { displayName });
    }

    alert("Profile updated successfully!");
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="p-2  text-nowrap ">Edit Profile</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[125vh] w-[90vw] lg:w-[120vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
            Edit profile
          </Dialog.Title>
          <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
            Make changes to your profile here. Click save when you are done.
          </Dialog.Description>

          <fieldset className="mb-10 flex flex-col place-items-center">
            <div className="h-32 w-32 rounded-full bg-black mb-5">
              <img
                src={
                  photoURL ||
                  "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
                }
                alt="avatar"
                
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <p className="font-semibold">{user?.displayName}</p>

            <p className="font-semibold">{user?.email}</p>
          </fieldset>

          <fieldset className="mb-[35px] flex items-center gap-5">
            <label
              className="text-violet11 w-[90px] text-[15px]"
              htmlFor="name"
            >
              Full Name
            </label>
            <input
              className="text-violet-700 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
              id="name"
              placeholder="Enter Name...."
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </fieldset>

          <fieldset className="mb-[15px] flex items-center gap-5">
            <label
              className="text-violet11 w-[90px] text-right text-[15px] text-nowrap"
              htmlFor="upload"
            >
              Upload Photo
            </label>
            <input
              type="file"
              id="upload"
              onChange={handleChange}
              className="text-violet-700 w-full"
            />
          </fieldset>

          <div className="mt-[45px] flex justify-end">
            <Dialog.Close asChild>
              <button
                disabled={loading || (!image && !displayName)}
                className="bg-violet-700 text-white inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:outline-none disabled:opacity-50"
                onClick={handleSave}
              >
                Save
              </button>
            </Dialog.Close>
          </div>

          <Dialog.Close asChild>
            <button
              className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ProfileDialog;
