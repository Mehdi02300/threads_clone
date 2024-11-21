"use client";

import ConnectedLayout from "@/components/ConnectedLayout/ConnectedLayout";
import Post from "@/components/Post/Post";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function Profile() {
  // Variable
  const params = useParams();
  const pseudo = params.pseudo.slice(3);

  const posts = [
    {
      _id: "1",
      content: "Bienvenue sur mon tout nouveau profil Threads !",
      pseudo: "johndoe",
      profile: "/picture.png",
    },
    {
      _id: "2",
      content: "Bienvenue sur mon tout nouveau profil Threads !",
      pseudo: "johndoe",
      profile: "/picture.png",
    },
    {
      _id: "3",
      content: "Bienvenue sur mon tout nouveau profil Threads !",
      pseudo: "johndoe",
      profile: "/picture.png",
    },
    {
      _id: "4",
      content: "Bienvenue sur mon tout nouveau profil Threads !",
      pseudo: "johndoe",
      profile: "/picture.png",
    },
    {
      _id: "5",
      content: "Bienvenue sur mon tout nouveau profil Threads !",
      pseudo: "johndoe",
      profile: "/picture.png",
    },
  ];

  return (
    <ConnectedLayout>
      <div className="mt-10 w-full md:w-[700px] mx-auto text-white flex flex-col">
        <div className="flex justify-between">
          <div className="flex flex-col justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold">John Doe</h1>
            </div>
            <div className="text-threads-gray-light mt-2">@{pseudo}</div>
            <div className="mt-5 whitespace-pre-line">-</div>
            <div className="mt-5 text-blue-500 hover:text-blue-400 duration-150">
              <a href="#" target="_blank">
                https://mehdi.com
              </a>
            </div>
          </div>
          <div>
            <Image
              src="/picture.png"
              alt="picture user"
              width={100}
              height={100}
              className="rounded-full object-cover"
            />
          </div>
        </div>
        <div className="flex mt-10">
          <div className="flex-1 border-b border-white font-bold pb-4 px-4 text-center cursor-pointer">
            Threads
          </div>
          <div className="flex-1 border-b text-threads-gray-light border-threads-gray-light pb-4 px-4 text-center hover:text-white hover:border-white duration-300 cursor-pointer">
            Réponses
          </div>
          <div className="flex-1 border-b text-threads-gray-light border-threads-gray-light pb-4 px-4 text-center hover:text-white hover:border-white duration-300 cursor-pointer">
            Republications
          </div>
        </div>
        <div>
          {posts.map((post) => (
            <div key={post._id}>
              <Post post={post} />
            </div>
          ))}
        </div>
      </div>
    </ConnectedLayout>
  );
}
