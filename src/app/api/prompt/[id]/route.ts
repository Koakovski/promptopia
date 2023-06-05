import { PrismaClient } from "@prisma/client";
import { NextApiHandler } from "next";

const prisma = new PrismaClient();

export const GET: NextApiHandler = async (_, { params }) => {
    try {
        const { id } = params;

        const post = await prisma.post.findFirst({
            where: {
                id: id,
            },
            include: {
                author: true,
            },
        });

        if (!post)
            return new Response("Prompt not found", {
                status: 404,
            });

        return new Response(JSON.stringify(post), {
            status: 200,
        });
    } catch (error) {
        return new Response("Fail", {
            status: 500,
        });
    }
};

export const PATCH: NextApiHandler = async (req, { params }) => {
    try {
        const { authorId, prompt, tag } = await req.json();
        const { id } = params;

        const databasePost = await prisma.post.findFirst({
            where: {
                id: id,
            },
        });

        if (!databasePost)
            return new Response("Prompt not found", {
                status: 404,
            });

        const updatedPost = await prisma.post.update({
            data: {
                prompt: prompt ?? databasePost.prompt,
                tag: tag ?? databasePost.tag,
            },
            where: {
                id: authorId,
            },
        });

        return new Response(JSON.stringify(updatedPost), {
            status: 200,
        });
    } catch (error) {
        return new Response("Fail", {
            status: 500,
        });
    }
};

export const DELETE: NextApiHandler = async (_, { params }) => {
    try {
        const { id } = params;

        await prisma.post.delete({ where: { id } });
    } catch (error) {
        return new Response("Fail", {
            status: 500,
        });
    }
};