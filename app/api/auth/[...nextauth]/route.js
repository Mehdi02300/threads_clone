import Credentials from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";

export const authOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          // Connect to the MongoDB cluster
          const client = await MongoClient.connect(process.env.MONGODB_CLIENT, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });

          // Connect to the MongoDB database
          const db = client.db(process.env.MONGODB_DATABASE);

          // Get the user for this email
          const user = await db.collection("users").findOne({ email });

          if (!user) {
            await client.close();
            throw new Error("Adresse email ou mot de passe incorrect.");
          }

          // Verify the password
          const passwordIsValid = await bcrypt.compare(password, user.password);

          if (!passwordIsValid) {
            await client.close();
            throw new Error("Adresse email ou mot de passe incorrect.");
          }

          // Map the user data to exclude sensitive information
          const userData = {
            _id: user._id.toString(),
            email: user.email,
            username: user.username,
            pseudo: user.pseudo,
            profile: user.profile,
          };

          await client.close();

          return userData;
        } catch (error) {
          throw new Error(error.message || "Erreur lors de l'authentification.");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
