import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  // Get the pseudo from the request
  const data = await request.json();
  const pseudo = data.pseudo;
  let client;

  try {
    // Connect to the MongoDB cluster
    client = new MongoClient(process.env.MONGODB_CLIENT);
    await client.connect();

    // Connect to the MongoDB database
    const db = client.db(process.env.MONGODB_DATABASE);

    // Get the user
    let user = await db.collection("users").findOne({ pseudo });

    if (!user) {
      throw new Error("L'utilisateur n'existe pas.");
    }

    // Formatting
    const formattedUser = {
      ...user,
      _id: user._id.toString(),
    };

    // Get the posts
    let posts = await db.collection("posts").find({ pseudo }).sort({ creation: -1 }).toArray();

    posts = posts.map((post) => ({
      ...post,
      _id: post._id.toString(),
    }));

    await client.close();

    return NextResponse.json(
      {
        user: formattedUser,
        posts,
      },
      {
        status: 200,
      }
    );
  } catch (e) {
    throw new Error(e.message);
  } finally {
    if (client) {
      await client.close();
    }
  }
}
