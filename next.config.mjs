import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

const nextConfig = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        MONGODB_CLIENT:
          "mongodb+srv://mehdirhallab:NKYDu45asJLiTver@cluster0.cqkb4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
        MONGODB_DATABASE: "threads",
      },
    };
  }

  return {
    env: {
      MONGODB_CLIENT:
        "mongodb+srv://mehdirhallab:NKYDu45asJLiTver@cluster0.cqkb4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    },
  };
};

export default nextConfig;
