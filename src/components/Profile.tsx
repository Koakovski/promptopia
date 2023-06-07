"use client";
import { PostModel, UserModel } from "@models";
import { FC } from "react";
import { PromptCard } from "./PromptCard";
import { useSession } from "next-auth/react";

interface ProfileProps {
    user: UserModel;
    data: PostModel[];
    handleEdit: (post: PostModel) => void;
    handleDelete: (post: PostModel) => Promise<void>;
}

export const Profile: FC<ProfileProps> = ({ user, data, handleEdit, handleDelete }) => {
    const { data: session } = useSession();

    return (
        <section className="w-full">
            <h1 className="head_text text-left">
                <span className="blue_gradient">
                    {user.id === session?.user?.id ? "My" : `${user.username}`} Profile
                </span>
            </h1>
            <p className="desc text-left">
                {user.id === session?.user?.id
                    ? "Welcome to your personalized profile page"
                    : `${user.email}`}
            </p>
            <div className="mt-10 prompt_layout">
                {data.map((post) => (
                    <PromptCard
                        key={post.id}
                        post={post}
                        handleEdit={() => handleEdit?.(post)}
                        handleDelete={() => handleDelete?.(post)}
                    />
                ))}
            </div>
        </section>
    );
};
