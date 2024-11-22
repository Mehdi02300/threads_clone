"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import Button from "../Button/Button";
import { toast } from "react-toastify";
import { createPost } from "@/actions/create-post";

const NewPostForm = ({ closeModale = () => {} }) => {
  const [textArea, setTextArea] = useState("");
  const { data: session } = useSession();

  // Funtion
  const onPrepare = async (formData) => {
    try {
      await createPost(formData);
      setTextArea("");
    } catch (e) {
      return toast.error(e.message);
    }

    closeModale();
  };

  return (
    <form action={onPrepare}>
      <div className="flex gap-3 w-full">
        {/* Photo */}
        <div>
          {session?.user?.profile && (
            <Image
              src={session.user.profile}
              alt="profile picture"
              width={50}
              height={50}
              className="rounded-full mt-5"
              unoptimized
            />
          )}
        </div>

        {/* Content */}
        <div className="flex-1">
          <textarea
            placeholder="Commencer un thread..."
            className="input"
            name="content"
            value={textArea}
            onChange={(e) => setTextArea(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="flex justify-end">
        <div>
          <Button formButton disabled={textArea.length < 1}>
            Publier
          </Button>
        </div>
      </div>
    </form>
  );
};

export default NewPostForm;
