import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  const data = await request.json();

  const pseudo = data.pseudo;
  const profile = data.profile;
  let bio = data.bio;
  const url = data.url;

  if (!bio) {
    bio = "-";
  }

  let client;

  try {
    // Connect to the MongoDB cluster
    client = new MongoClient(process.env.MONGODB_CLIENT);
    await client.connect();

    // Connect to the MongoDB database
    const db = client.db(process.env.MONGODB_DATABASE);

    // Get the user
    let user = await db.collection("users").find({ pseudo }).limit(1).toArray();

    if (user.length === 0) {
      await client.close();
      return NextResponse.json(
        {
          error: "Utilisateur inéxistant.",
        },
        {
          status: 404,
        }
      );
    }

    // UPDATING
    await db.collection("users").updateOne(
      { pseudo },
      {
        $set: {
          profile,
          bio,
          url,
        },
      }
    );

    await client.close();

    return NextResponse.json({ user }, { status: 200 });
  } catch (e) {
    await client.close();

    return NextResponse.json(
      {
        error: e.message,
      },
      { status: 500 }
    );
  }
}
