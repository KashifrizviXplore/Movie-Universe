import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
} from "@heroui/react";
import { Link } from "react-router-dom";
export const AcmeLogo = () => {
  return <img className="h-12" src="/images/yts-seeklogo.png"></img>;
};

export const SearchIcon = ({
  size = 24,
  strokeWidth = 1.5,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={height || size}
      role="presentation"
      viewBox="0 0 24 24"
      width={width || size}
      {...props}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

export default function () {
  return (
    <Navbar isBordered className="bg-[#1d1d1d] flex fixed ">
      <NavbarContent>
        <NavbarBrand>
          <AcmeLogo />
        </NavbarBrand>
        <NavbarContent>
          <Input
            placeholder="Quick Search"
            startContent={<SearchIcon size={16} />}
            type="search"
            radius="full"
            color="default"
            size="sm"
          />
        </NavbarContent>
        <NavbarContent className="hidden sm:flex gap-8 ml-10 ">
          <NavbarItem>
            <Link
              className="text-[#716f6f] font-semibold  hover:text-white "
              to="/"
            >
              Home
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              aria-current="page"
              className="text-green-700 font-semibold hover:text-green-500"
            >
              4K
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link className="text-[#716f6f] font-semibold hover:text-white">
              Trending
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link className="text-[#716f6f] font-semibold  hover:text-white">
              Browse Movies
            </Link>
          </NavbarItem>
          <div className="flex text-white font-semibold text-md gap-2 ml-24">
            <button className="hover:text-[#716f6f]">Login</button>
            <span className="mt-1 hover:text-[##716f6f] ">|</span>
            <button className="hover:text-[#716f6f]">Register</button>
          </div>
        </NavbarContent>
      </NavbarContent>
    </Navbar>
  );
}
