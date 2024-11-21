"use client";

import Button from "@/components/Button/Button";
import { checkEmail } from "@/utils/check-emailsyntax";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import { setCookie } from "cookies-next/client";

export default function Signin() {
  const router = useRouter();

  // Function
  const prepareLogin = async (formData) => {
    const email = formData.get("email");
    const password = formData.get("password");

    // If a field is empty
    if (!email || !password) {
      return toast.error("Veuillez remplir tous les champs.");
    }

    // Check if email is valid
    if (!checkEmail(email)) {
      return toast.error("Veuillez entrer une adresse email valide.");
    }

    // Sign in the user
    try {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (response.error) {
        return toast.error(response.error);
      }
    } catch (e) {
      return toast.error(error.message);
    }

    toast.success("Vous êtes maintenant connecté.");

    setCookie("connected", "true", { maxAge: 3600 });

    router.replace("/");
  };
  return (
    <div className="md:w-[500px] mx-auto p-5 w-full">
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
        <h1 className="title">Connectez-vous</h1>
      </div>
      <form action={prepareLogin}>
        <input type="email" name="email" placeholder="Email" required className="input" />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          required
          className="input"
        />
        <Button>Se connecter</Button>
      </form>
      <div className="flex justify-center items-center gap-3 mt-4 text-white">
        <div className="border-t border-threads-gray-light w-1/4"></div>
        <div>ou</div>
        <div className="border-t border-threads-gray-light w-1/4"></div>
      </div>
      <Link href="/login/signup">
        <Button formButton>S'inscrire</Button>
      </Link>
    </div>
  );
}
