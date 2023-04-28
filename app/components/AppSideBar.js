"use client";

import Image from "next/image";
import { useAuth } from "../utils/authProvider";
import Link from "next/link";

export default function AppSideBar({ children }) {
  const { user } = useAuth();

  const MenuOptions = () => {
    const signedIn = ["Update Profile", "Update Avatar", "Sign Out"];
    const signedOut = [
      { text: "Sign In", link: "/signin" },
      { text: "Sign Up", link: "/signup" },
    ];

    if (user) {
      return signedIn.map((item) => (
        <li key={item}>
          <Link href={item}>{item}</Link>
        </li>
      ));
    } else {
      return signedOut.map(({ text, link }) => (
        <li key={link}>
          <Link href={link}>{text}</Link>
        </li>
      ));
    }
  };

  return (
    <div className="drawer drawer-mobile">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* <!-- Navbar --> */}
        <div className="navbar bg-pink-500 h-16 w-full">
          <div className="flex-1">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="flex-none lg:hidden">
              {user && (
                <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block w-6 h-6 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </label>
              )}
            </div>
          </div>
          <div className="flex-1">
            <a className="link" href="/">
              <Image src="/images/logo.png" alt="logo" priority width={160} height={160}></Image>
            </a>
          </div>
          <div className="flex-none">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-12 rounded-full">
                  <img src="/images/avatar.png" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-40"
              >
                <MenuOptions />
              </ul>
            </div>
          </div>
        </div>
        {/* <!-- Page content here --> */}
        {children}
      </div>
      {user && (
        <div className="drawer-side">
          <label htmlFor="my-drawer-3" className="drawer-overlay"></label>

          <ul className="menu p-4 w-80 bg-base-100">
            {/* <!-- Sidebar content here --> */}
            <div className="navbar bg-pink-500 absolute left-0 top-0 h-16"></div>
            <li className="mt-16">
              <Link href="/myPosts">My Posts</Link>
            </li>
            <li>
              <Link href="/myPosts">Following</Link>
            </li>
            <li>
              <Link href="/myPosts">Followers</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
