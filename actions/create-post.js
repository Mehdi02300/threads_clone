"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { MongoClient } from "mongodb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export const createPost = async (formData) => {
  // Variable
  const session = await getServerSession(authOptions);

  if (!session.user) {
    throw new Error("Vous devez être connecté.");
  }

  let client;

  try {
    // Connect to the MongoDB cluster
    client = await MongoClient.connect(process.env.MONGODB_CLIENT);

    // Connect to the MongoDB database
    const db = client.db(process.env.MONGODB_DATABASE);

    // Add the post
    await db.collection("posts").insertOne({
      pseudo: session.user.pseudo,
      content: formData.get("content"),
      profile: session.user.profile,
      creation: new Date(),
    });
  } catch (e) {
    await client.close();
    throw new Error(e);
  }

  await client.close();

  revalidatePath("/", "/[pseudo]");
};
