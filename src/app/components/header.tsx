import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <div className=" inline-flex flex-shrink-0 flex-grow-0 place-items-center  gap-1  h-20 bg-black space-x-0 w-screen  ">
      <Link href="/posts" title="Home">
        <Image
          src="/Logotypes.svg"
          alt="header"
          width={50}
          height={50}
          className="ml-"
        />
      </Link>
      <div className="font-bold text-2xl sm:text-3xl text-gray-300">
        Chatter
      </div>
    </div>
  );
};

export default Header;
