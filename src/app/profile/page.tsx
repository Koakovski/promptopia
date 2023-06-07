"use client";

import { Profile } from "@components";
import { PostModel, UserModel } from "@models";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const MyProfilePage = () => {
    const [posts, setPosts] = useState<PostModel[]>([]);
    const { data: session } = useSession();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [userData, setUserData] = useState<UserModel>({
        id: "",
        username: "",
        email: "",
        image: "",
    });

    useEffect(() => {
        const getUserData = async () => {
            const setReponseAsUserData = async (response: Response) => {
                const data = await response.json();
                setUserData(data);
            };

            if (userData.id === "") {
                const userId = searchParams.get("userId");

                if (userId) {
                    const response = await fetch(`/api/user/${userId}`, {
                        method: "GET",
                    });

                    if (response.ok) {
                        await setReponseAsUserData(response);
                    } else {
                        const userId = session?.user?.id;
                        if (userId) {
                            const response = await fetch(`/api/user/${userId}`, {
                                method: "GET",
                            });

                            if (response.ok) {
                                await setReponseAsUserData(response);
                            } else {
                                router.push("/");
                            }
                        }
                    }
                }
            }
        };

        getUserData();
    }, [searchParams, session]);

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
            const response = await fetch(`/api/user/${userData.id}/posts`, {
                method: "GET",
            });
            const data = await response.json();

            setPosts(data);
        };

        if (userData.id !== "") fetchPosts();
    }, [userData]);

    return (
        <Profile
            user={userData}
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    );
};

export default MyProfilePage;
