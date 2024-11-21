"use client";

import Button from "@/components/Button/Button";
import { setCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Pass() {
  const router = useRouter();

  // Function
  const onContinue = () => {
    setCookie("guest", "true");
    router.push("/");
  };

  return (
    <div className="w-[500px] mx-auto">
      <div className="flex gap-3 items-center">
        <Link href="/login">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 256 256"
            className="hover:opacity-70 duration-150"
          >
            <path
              fill="white"
              d="M228 128a12 12 0 0 1-12 12H69l51.52 51.51a12 12 0 0 1-17 17l-72-72a12 12 0 0 1 0-17l72-72a12 12 0 0 1 17 17L69 116h147a12 12 0 0 1 12 12"
            ></path>
          </svg>
        </Link>
        <h1 className="title">Continuer en mode invité</h1>
      </div>
      <p className="text-threads-gray-light mt-4">
        Vous pouvew naviguer dans Threads sans profil, mais vous ne pourrez pas intéragir avec du
        contenu ni en publier.
      </p>
      <Button onClick={onContinue}>Continuer</Button>
    </div>
  );
}
