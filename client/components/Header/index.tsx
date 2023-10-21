import "./header.css";
import { HeaderRight } from "@/components";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <Link href="/" className="header__logo">
          <strong>Whismy</strong>
          <PencilSquareIcon className="header__icon" />
        </Link>
        <HeaderRight />
      </div>
    </header>
  );
}

export default Header;
