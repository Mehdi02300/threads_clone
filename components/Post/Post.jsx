import Image from "next/image";
import Link from "next/link";

const Post = ({ post }) => {
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
        />
      </div>
      {/* Content  */}
      <div className="text-white w-full">
        <div className="flex justify-between items-center">
          <Link href={`/@${post.pseudo}`}>
            <b>{post.pseudo}</b>
          </Link>
          <div className="text-sm text-threads-gray-light">il y a 1 heure</div>
        </div>
        <div className="mt-3 whitespace-pre-line">{post.content}</div>
      </div>
    </div>
  );
};

export default Post;
