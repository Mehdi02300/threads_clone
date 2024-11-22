import ConnectedLayout from "@/components/ConnectedLayout/ConnectedLayout";
import Post from "@/components/Post/Post";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import NewPostForm from "@/components/NewPostForm/NewPostForm";
import { MongoClient } from "mongodb";
import { revalidatePath } from "next/cache";

export default async function Index() {
  // Viariable
  const session = await getServerSession(authOptions);
  let posts, client;
  try {
    // Connect to the MongoDB cluster
    client = await MongoClient.connect(process.env.MONGODB_CLIENT);

    // Connect to the MongoDB databse
    const db = await client.db(process.env.MONGODB_DATABASE);

    // Select the post collection
    posts = await db.collection("posts").find().sort({ creation: -1 }).toArray();

    // Format posts
    posts = posts.map((post) => ({
      ...post,
      _id: post._id.toString(),
    }));
  } catch (e) {
    throw new Error(e.message);
  }

  await client.close();

  return (
    <ConnectedLayout>
      <div className="w-full md:w-[700px] mx-auto mt-10">
        {/* New post */}
        {session?.user && (
          <div className="border-b border-threads-gray-dark py-4">
            <NewPostForm />
          </div>
        )}
        {/* Post */}
        {posts.map((post) => (
          <div key={post._id}>
            <Post post={post} />
          </div>
        ))}
      </div>
    </ConnectedLayout>
  );
}
