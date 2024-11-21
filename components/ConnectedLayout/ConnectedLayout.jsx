"use client";

import React from "react";
import Footer from "../Footer";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Button from "../Button/Button";

const ConnectedLayout = ({ children }) => {
  // Variables
  const pathname = usePathname();

  return (
    <section className="flex flex-col min-h-screen px-5">
      {/* Header */}
      <header className="flex justify-between items-center py-5 z-0">
        <nav className="absolute left-0 top-0 right-0 flex justify-center gap-5 my-7 -z-10">
          <Link href="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-10 h-10 hover:bg-gray-800 duration-150 p-1 rounded-xl ${
                pathname == "/" ? "text-white" : "text-threads-gray-light"
              }`}
              viewBox="0 0 256 256"
            >
              <path
                fill="currentColor"
                d="m222.14 105.85l-80-80a20 20 0 0 0-28.28 0l-80 80A19.86 19.86 0 0 0 28 120v96a12 12 0 0 0 12 12h64a12 12 0 0 0 12-12v-52h24v52a12 12 0 0 0 12 12h64a12 12 0 0 0 12-12v-96a19.86 19.86 0 0 0-5.86-14.15M204 204h-40v-52a12 12 0 0 0-12-12h-48a12 12 0 0 0-12 12v52H52v-82.35l76-76l76 76Z"
              ></path>
            </svg>
          </Link>

          <Link href="/search">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-10 h-10 hover:bg-gray-800 duration-150 p-1 rounded-xl ${
                pathname == "/search" ? "text-white" : "text-threads-gray-light"
              }`}
              viewBox="0 0 256 256"
            >
              <path
                fill="currentColor"
                d="M232.49 215.51L185 168a92.12 92.12 0 1 0-17 17l47.53 47.54a12 12 0 0 0 17-17ZM44 112a68 68 0 1 1 68 68a68.07 68.07 0 0 1-68-68"
              ></path>
            </svg>
          </Link>
        </nav>

        <Image src="/logo.png" alt="Threads logo" width={40} height={40} />

        <div>
          <Link href="/login">
            <Button className="mt-0 z-10">Se connecter</Button>
          </Link>
        </div>
      </header>
      {/* Content */}
      <div className="flex-1">{children}</div>

      {/* Footer */}
      <Footer />
    </section>
  );
};

export default ConnectedLayout;
