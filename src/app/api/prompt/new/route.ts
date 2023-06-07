import { getDatabaseConnection } from "@utils";
import { NextApiHandler } from "next";

const prisma = getDatabaseConnection();

export const POST: NextApiHandler = async (req) => {
    try {
        const { authorId, prompt, tag } = await req.json();

        const createdPost = await prisma.post.create({
            data: {
                prompt,
                tag,
                authorId,
            },
        });

        return new Response(JSON.stringify(createdPost), {
            status: 201,
        });
    } catch (error) {
        return new Response(JSON.stringify("Failed to create a new prompt"), {
            status: 500,
        });
    }
};
