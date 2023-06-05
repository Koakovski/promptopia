import { PrismaClient } from "@prisma/client";
import { NextApiHandler } from "next";

const prisma = new PrismaClient();

export const GET: NextApiHandler = async () => {
    const prompts = await prisma.post.findMany({
        include: { author: true },
    });

    return new Response(JSON.stringify(prompts), {
        status: 200,
    });
};
