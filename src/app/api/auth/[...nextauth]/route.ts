import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const prisma = new PrismaClient();

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async session({ session }) {
            if (session.user?.email) {
                const databaseUser = await prisma.user.findFirst({
                    where: { email: session.user.email },
                });

                if (databaseUser) {
                    session.user.id = databaseUser.id;
                }
            }

            return session;
        },
        async signIn({ profile }) {
            try {
                if (!profile || !profile.email || !profile.picture || !profile.name) {
                    return false;
                }

                const databaseUser = await prisma.user.findFirst({
                    where: {
                        email: profile.email,
                    },
                });

                if (!databaseUser) {
                    const formatedUsername = profile.name.replace(" ", "").toLowerCase();

                    await prisma.user.create({
                        data: {
                            email: profile.email,
                            username: formatedUsername,
                            image: profile.picture,
                        },
                    });
                }

                return true;
            } catch (error) {
                return false;
            }
        },
    },
});

export { handler as GET, handler as POST };
