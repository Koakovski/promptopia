import { getDatabaseConnection } from "@utils";
import { NextApiHandler } from "next";

const prisma = getDatabaseConnection();

export const GET: NextApiHandler = async (_, { params }) => {
    try {
        const { id } = params;

        const user = await prisma.user.findFirst({
            where: {
                id,
            },
        });

        if (!user) {
            return new Response(undefined, {
                status: 404,
            });
        }

        return new Response(JSON.stringify(user), {
            status: 200,
        });
    } catch (error) {
        return new Response("Fail", {
            status: 500,
        });
    }
};
