import Link from "next/link";
import Image from "next/image";
import React from "react";
import { ModeToggle } from "./ModeToggle";
import SearchInput from "./SearchInput";
import GenreDropdown from "./GenreDropdown";

function Header() {
  return (
    <header className="fixed w-full z-[100] top-0 flex items-center justify-between py-2 px-6 bg-white/60 dark:bg-gray-900/60 backdrop-blur border-b-2">
      <Link href="/" className="mr-10 cursor-pointer">
        <Image
          src="https://static-mh.content.disney.io/matterhorn/assets/goc/disney_logo_dark@2x-45d70f7dd57b.png"
          alt="Disney Logo"
          width={120}
          height={100}
          className="cursor-pointer dark:invert mt-1"
        />
      </Link>

      <div className="flex space-x-2">
        {/* Genre */}
        <GenreDropdown />

        {/* Search Box */}
        <SearchInput />

        {/* Dark/Light Mode */}
        <ModeToggle />
      </div>
    </header>
  );
}

export default Header;
