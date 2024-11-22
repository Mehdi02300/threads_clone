"use client";

import Image from "next/image";
import Link from "next/link";
import moment from "moment-timezone";
import "moment/locale/fr";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-toastify";
import { deletePost } from "@/actions/delete-post";

const Post = ({ post }) => {
  // Variable
  const { data: session } = useSession();

  // State
  const [optionsAreOpen, setOptionsAreOpen] = useState(false);

  // Function
  const onDeletePost = async () => {
    if (!confirm("Voulez-vous vraiment supprimer ce thread ?")) return;

    try {
      await deletePost(post._id);
    } catch (e) {
      return toast.error(e.message);
    }

    toast.success("Le thread a bien été suprimé.");
  };

  return (
    <div className="post">
      {/* Photo */}
      <div>
        <Image
          src={post.profile}
          alt="picture user"
          width={50}
          height={50}
          className="rounded-full object-cover"
          unoptimized
        />
      </div>
      {/* Content  */}
      <div className="text-white w-full">
        <div className="flex justify-between items-center">
          <Link href={`/@${post.pseudo}`}>
            <b>{post.pseudo}</b>
          </Link>
          <div className="relative flex items-center gap-1 text-sm text-threads-gray-light">
            <div className="text-sm text-threads-gray-light">
              {moment.utc(post.creation, "YYYY-MM-DD HH:mm:ss").tz("Europe/Paris").fromNow()}
            </div>
            {session?.user && (
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 256 256"
                  className="cursor-pointer"
                  onClick={() => setOptionsAreOpen((prev) => !prev)}
                >
                  <path
                    fill="currentColor"
                    d="M128 96a32 32 0 1 0 32 32a32 32 0 0 0-32-32m0 48a16 16 0 1 1 16-16a16 16 0 0 1-16 16m0-64a32 32 0 1 0-32-32a32 32 0 0 0 32 32m0-48a16 16 0 1 1-16 16a16 16 0 0 1 16-16m0 144a32 32 0 1 0 32 32a32 32 0 0 0-32-32m0 48a16 16 0 1 1 16-16a16 16 0 0 1-16 16"
                  ></path>
                </svg>
              </div>
            )}
            {/* Options */}
            {optionsAreOpen && session?.user && (
              <div className="options">
                {session?.user && session.user.pseudo != post.pseudo ? (
                  <div className="option">Signaler</div>
                ) : (
                  <>
                    <div className="option">Modifier</div>
                    <div className="option" onClick={onDeletePost}>
                      Supprimer
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="mt-3 whitespace-pre-line">{post.content}</div>
      </div>
    </div>
  );
};

export default Post;
