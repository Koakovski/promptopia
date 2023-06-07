import { getDatabaseConnection } from "@utils";
import { NextApiHandler } from "next";

const prisma = getDatabaseConnection();

export const GET: NextApiHandler = async (_, { params }) => {
    try {
        const { id } = params;

        const userPosts = await prisma.post.findMany({
            where: {
                author: {
                    id: id as string,
                },
            },
            include: {
                author: true,
            },
        });

        return new Response(JSON.stringify(userPosts), {
            status: 200,
        });
    } catch (error) {
        return new Response("Fail", {
            status: 500,
        });
    }
};
