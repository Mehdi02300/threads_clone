"use client";

import Button from "@/components/Button/Button";
import ConnectedLayout from "@/components/ConnectedLayout/ConnectedLayout";
import Post from "@/components/Post/Post";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";

export default function Profile() {
  // Variables
  const params = useParams();
  const pseudo = params.pseudo.slice(3);
  const router = useRouter();
  const { data: session } = useSession();

  // States
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [openModale, setOpenModale] = useState(false);
  const [profileInput, setProfileInput] = useState("");
  const [bioInput, setBioInput] = useState("");
  const [linkInput, setLinkInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!pseudo) {
      router.push("/");
      return;
    }

    const fetchUserDataPosts = async () => {
      try {
        const response = await fetch("/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ pseudo }),
        });

        if (!response.ok) {
          throw new Error("Une erreur est intervenue lors du chargement des données.");
        }

        const data = await response.json(); // Déplacez cette ligne ici

        if (!data.user) {
          router.push("/");
          return;
        }

        setUser(data.user); // Remarquez que `setUser` est appelé après que `data` ait été récupéré
        setPosts(data.posts); // Ajoutez les posts après avoir récupéré les données
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchUserDataPosts();
  }, [pseudo]);

  useEffect(() => {
    if (openModale) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [openModale]);

  if (!user) {
    // Assurez-vous que `user` est chargé avant de rendre le contenu
    return <p>Chargement...</p>;
  }

  const edit = () => {
    setProfileInput(user.profile);
    setBioInput(user.bio);
    setLinkInput(user.url);

    setOpenModale(true);
  };

  const editUser = async () => {
    if (isLoading) return;

    setIsLoading(true);

    const response = await fetch("api/user/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pseudo,
        profile: profileInput,
        bio: bioInput,
        url: linkInput,
      }),
    });

    const date = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      toast.error("Une erreur est survenue.");
      return;
    }

    const newUser = {
      ...user,
      profile: profileInput,
      bio: bioInput,
      url: linkInput,
    };

    setUser(newUser);

    setOpenModale(false);
    setIsLoading(false);

    toast.success("Profil mis à jour.");
  };

  return (
    <ConnectedLayout>
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
            <div className="modale-user-foreground">
              {/* Photo */}
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="label" htmlFor="picture">
                    Photo de profil
                  </label>
                  <input
                    type="url"
                    name="picture"
                    id="picture"
                    className="input"
                    placeholder="https://www.johndoe.com/image.png"
                    value={profileInput}
                    onChange={(e) => setProfileInput(e.target.value)}
                  />
                </div>
                <div>
                  {user.profile && (
                    <Image
                      src={user.profile}
                      alt="profile picture"
                      width={100}
                      height={100}
                      className="rounded-full"
                      unoptimized
                    />
                  )}
                </div>
              </div>

              {/* Bio */}
              <div className="mt-5">
                <label className="label" htmlFor="bio">
                  Bio
                </label>
                <textarea
                  name="bio"
                  id="bio"
                  className="input"
                  placeholder="bio"
                  value={bioInput}
                  onChange={(e) => setBioInput(e.target.value)}
                ></textarea>
              </div>

              {/* URL */}
              <div className="mt-5">
                <label className="label" htmlFor="url">
                  Lien
                </label>
                <input
                  name="url"
                  id="url"
                  className="input"
                  placeholder="https://thread.com"
                  value={linkInput}
                  onChange={(e) => setLinkInput(e.target.value)}
                />
              </div>

              <div className="flex justify-end mt-1">
                <div>
                  <Button onClick={editUser} disabled={isLoading}>
                    Terminer
                  </Button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
      <div className="mt-10 md:w-[700px] mx-auto text-white">
        {/* Infos */}
        <div className="flex justify-between gap-4">
          {/* Data */}
          <div>
            <h1 className="text-3xl font-semibold">{user.username}</h1>
            <div className="text-threads-gray-light mt-2">@{pseudo}</div>
            <div className="mt-5 whitespace-pre-line">{user.bio}</div>
            {user.url && (
              <div className="mt-5 text-blue-500 hover:text-blue-400 duration-150 inline-block">
                <a href={user.url} target="_blank">
                  {user.url}
                </a>
              </div>
            )}
          </div>

          {/* Photo */}
          <div>
            {user.profile && (
              <Image
                src={user.profile}
                alt="profile picture"
                width={100}
                height={100}
                className="rounded-full"
                unoptimized
              />
            )}
          </div>
        </div>

        {/* Updating */}
        {session?.user?.pseudo === pseudo && (
          <div className="user-button" onClick={edit}>
            Modifier le profil
          </div>
        )}

        {/* Tabs */}
        <div className="flex mt-10">
          {/* Threads */}
          <div className="flex-1 border-b border-white pb-4 px-4 text-center hover:text-white hover:border-white duration-150 cursor-pointer">
            Threads
          </div>

          {/* Responses */}
          <div className="flex-1 border-b border-threads-gray-light pb-4 px-4 text-center text-threads-gray-light hover:text-white hover:border-white duration-150 cursor-pointer">
            Réponses
          </div>

          {/* Reposts */}
          <div className="flex-1 border-b border-threads-gray-light pb-4 px-4 text-center text-threads-gray-light hover:text-white hover:border-white duration-150 cursor-pointer">
            Republications
          </div>
        </div>

        {/* Posts */}
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
