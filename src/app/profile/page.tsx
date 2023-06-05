"use client";

import { Profile } from "@components";
import { PostModel } from "@models";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const MyProfilePage = () => {
    const [posts, setPosts] = useState<PostModel[]>([]);
    const { data: session } = useSession();

    const handleEdit = (post: PostModel) => {};

    const handleDelete = async (post: PostModel) => {};

    useEffect(() => {
        const fetchPosts = async () => {
            if (session?.user?.id) {
                const response = await fetch(`/api/user/${session.user.id}/posts`, {
                    method: "GET",
                });
                const data = await response.json();

                setPosts(data);
            }
        };

        fetchPosts();
    }, []);

    return (
        <Profile
            name="My"
            desc="Welcome to your personalized profile page"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    );
};

export default MyProfilePage;
