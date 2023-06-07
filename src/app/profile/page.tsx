"use client";

import { Profile } from "@components";
import { PostModel } from "@models";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MyProfilePage = () => {
    const [posts, setPosts] = useState<PostModel[]>([]);
    const { data: session } = useSession();
    const router = useRouter();

    const handleEdit = (post: PostModel) => {
        router.push(`/update-prompt?id=${post.id}`);
    };

    const handleDelete = async (post: PostModel) => {
        const hasConfirmed = confirm("Are you sure you want to delete this prompt?");

        if (hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post.id}`, {
                    method: "DELETE",
                });
            } catch (error) {}

            setPosts((prevState) => prevState.filter(({ id }) => id !== post.id));
        }
    };

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
    }, [session]);

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
