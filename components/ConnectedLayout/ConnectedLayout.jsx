"use client";

import React, { useEffect, useState } from "react";
import Footer from "../Footer";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Button from "../Button/Button";
import { signOut, useSession } from "next-auth/react";
import { deleteCookie } from "cookies-next/client";
import NewPostForm from "../NewPostForm/NewPostForm";
import { createPortal } from "react-dom";

const ConnectedLayout = ({ children }) => {
  // Variables
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  console.log(session);

  // State
  const [openModale, setOpenModale] = useState(false);

  // Cycle
  useEffect(() => {
    if (openModale) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [openModale]);

  // Function
  const handleLogout = async () => {
    await signOut({ redirect: false });

    deleteCookie("connected");

    router.push("/login");
  };

  return (
    <section className="flex flex-col min-h-screen px-5">
      {openModale &&
        createPortal(
          <div
            className="modale-background"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setOpenModale(false);
              }
            }}
          >
            <div className="modale-foreground">
              <NewPostForm closeModale={() => setOpenModale(false)} />
            </div>
          </div>,
          document.body
        )}
      {/* Header */}
      <header className="flex justify-between items-center py-5">
        {/* Navigation */}
        <nav className="absolute left-0 top-0 right-0 flex justify-center gap-5 my-7">
          <Link href="/" aria-label="Accueil">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-10 h-10 hover:bg-gray-800 duration-150 p-1 rounded-xl ${
                pathname === "/" ? "text-white" : "text-threads-gray-light"
              }`}
              viewBox="0 0 256 256"
            >
              <path
                fill="currentColor"
                d="m222.14 105.85l-80-80a20 20 0 0 0-28.28 0l-80 80A19.86 19.86 0 0 0 28 120v96a12 12 0 0 0 12 12h64a12 12 0 0 0 12-12v-52h24v52a12 12 0 0 0 12 12h64a12 12 0 0 0 12-12v-96a19.86 19.86 0 0 0-5.86-14.15M204 204h-40v-52a12 12 0 0 0-12-12h-48a12 12 0 0 0-12 12v52H52v-82.35l76-76l76 76Z"
              ></path>
            </svg>
          </Link>

          <Link href="/search" aria-label="Recherche">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-10 h-10 hover:bg-gray-800 duration-150 p-1 rounded-xl ${
                pathname === "/search" ? "text-white" : "text-threads-gray-light"
              }`}
              viewBox="0 0 256 256"
            >
              <path
                fill="currentColor"
                d="M232.49 215.51L185 168a92.12 92.12 0 1 0-17 17l47.53 47.54a12 12 0 0 0 17-17ZM44 112a68 68 0 1 1 68 68a68.07 68.07 0 0 1-68-68"
              ></path>
            </svg>
          </Link>

          {/* Create */}
          {session?.user?.email && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={
                "w-10 h-10 hover:bg-gray-800 duration-150 p-1 rounded-xl cursor-pointer text-threads-gray-light"
              }
              viewBox="0 0 256 256"
              onClick={() => setOpenModale(true)}
            >
              <path
                fill="currentColor"
                d="m232.49 55.51l-32-32a12 12 0 0 0-17 0l-96 96A12 12 0 0 0 84 128v32a12 12 0 0 0 12 12h32a12 12 0 0 0 8.49-3.51l96-96a12 12 0 0 0 0-16.98M192 49l15 15l-11 11l-15-15Zm-69 99h-15v-15l56-56l15 15Zm105-7.43V208a20 20 0 0 1-20 20H48a20 20 0 0 1-20-20V48a20 20 0 0 1 20-20h67.43a12 12 0 0 1 0 24H52v152h152v-63.43a12 12 0 0 1 24 0"
              ></path>
            </svg>
          )}

          {/* User */}
          {session?.user?.email && (
            <Link href={`/@${session.user.pseudo}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`w-10 h-10 hover:bg-gray-800 duration-150 p-1 rounded-xl ${
                  pathname.includes("@") ? "text-white" : "text-threads-gray-light"
                }`}
                viewBox="0 0 256 256"
              >
                <path
                  fill="currentColor"
                  d="M234.38 210a123.36 123.36 0 0 0-60.78-53.23a76 76 0 1 0-91.2 0A123.36 123.36 0 0 0 21.62 210a12 12 0 1 0 20.77 12c18.12-31.32 50.12-50 85.61-50s67.49 18.69 85.61 50a12 12 0 0 0 20.77-12M76 96a52 52 0 1 1 52 52a52.06 52.06 0 0 1-52-52"
                ></path>
              </svg>
            </Link>
          )}
        </nav>

        {/* Logo */}
        <Image src="/logo.png" alt="Threads logo" width={40} height={40} />

        {/* Session Handling */}
        <div className="z-10">
          {session?.user ? (
            <Button onClick={() => handleLogout()} className="mt-0 ">
              Se déconnecter
            </Button>
          ) : (
            <Link href="/login">
              <Button className="mt-0">Se connecter</Button>
            </Link>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1">{children}</div>

      {/* Footer */}
      <Footer />
    </section>
  );
};

export default ConnectedLayout;
