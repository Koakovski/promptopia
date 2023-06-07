import { getDatabaseConnection } from "@utils";
import { NextApiHandler } from "next";

const prisma = getDatabaseConnection();

export const GET: NextApiHandler = async (req) => {
    try {
        const { searchParams } = new URL(req.url as string);
        const searchQuery = searchParams.get("search");

        const prompts = await prisma.post.findMany({
            where: {
                OR: [
                    {
                        tag: {
                            contains: searchQuery || "",
                        },
                    },
                    {
                        author: {
                            username: {
                                contains: searchQuery || "",
                            },
                        },
                    },
                ],
            },
            include: { author: true },
        });

        return new Response(JSON.stringify(prompts), {
            status: 200,
        });
    } catch (error) {
        return new Response("Fail", {
            status: 500,
        });
    }
};
