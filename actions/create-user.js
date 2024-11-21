"use server";

import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";
import { checkEmail } from "@/utils/check-emailsyntax";

export const createUser = async (username, pseudo, email, password) => {
  // If a field is empty
  if (!username || !pseudo || !email || !password) {
    return toast.error("Veuillez remplir tous les champs.");
  }

  // Check if email is valid
  if (!checkEmail(email)) {
    return toast.error("Veuillez entrer une adresse email valide.");
  }

  // Connect to the MongoDB cluster
  const client = await MongoClient.connect(process.env.MONGODB_CLIENT);

  // Connect to the MongoDB database
  const db = client.db(process.env.MONGODB_DATABASE);

  try {
    // Verify if email is already exist
    let user = await db.collection("users").find({ email }).limit(1).toArray();
    if (user.length !== 0) {
      await client.close();
      throw new Error("Cet email est déjà utilisé.");
    }

    // Verify if pseudo is already exist
    user = await db.collection("users").find({ pseudo }).limit(1).toArray();
    if (user.length !== 0) {
      await client.close();
      throw new Error("Ce pseudo est déjà utilisé.");
    }

    // Encrypt the password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Create the user
    await db.collection("users").insertOne({
      username,
      pseudo,
      email,
      password: encryptedPassword,
      profile: "/picture.png",
      bio: "-",
      url: "",
      creation: new Date(),
    });
  } catch (e) {
    await client.close();
    throw new Error(e);
  }

  await client.close();
};
