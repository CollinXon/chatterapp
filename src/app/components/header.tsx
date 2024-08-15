import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <div className=" flex place-items-center  gap-4 w-full h-20 bg-black ">
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
