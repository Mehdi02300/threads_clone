import ConnectedLayout from "@/components/ConnectedLayout/ConnectedLayout";
import Post from "@/components/Post/Post";

export default function Index() {
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
      <div className="w-full md:w-[700px] mx-auto mt-10">
        {/* New post */}

        {/* New post */}
        {posts.map((post) => (
          <div key={post._id}>
            <Post post={post} />
          </div>
        ))}
      </div>
    </ConnectedLayout>
  );
}
