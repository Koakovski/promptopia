"use client";
import { PostModel } from "@models";
import Image from "next/image";
import { FC, useState } from "react";

interface PromptCardProps {
    post: PostModel;
    handleTagClick?: (tag: string) => void;
    handleEdit: () => void;
    handledelete: () => void;
}

export const PromptCard: FC<PromptCardProps> = ({ post, handleTagClick }) => {
    const [copiedValue, setCopiedValue] = useState<string>("");

    const handleCopy = () => {
        setCopiedValue(post.prompt);
        navigator.clipboard.writeText(post.prompt);

        setTimeout(() => setCopiedValue(""), 500);
    };

    return (
        <div className="prompt_card">
            <div className="flex justify-between items-start gap-5">
                <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
                    <Image
                        src={post.author.image}
                        alt="author image"
                        width={40}
                        height={40}
                        className="rounded-full object-contain"
                    />

                    <div className="flex flex-col">
                        <h3 className="font-satoshi font-semibold text-gray-900">
                            {post.author.username}
                        </h3>
                        <p className="font-inter text-sm text-gray-500">
                            {post.author.email}
                        </p>
                    </div>
                </div>

                <div className="copy_btn" onClick={handleCopy}>
                    <Image
                        src={
                            copiedValue === post.prompt
                                ? "/assets/icons/tick.svg"
                                : "/assets/icons/copy.svg"
                        }
                        alt="copy button icon"
                        width={12}
                        height={12}
                    />
                </div>
            </div>

            <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
            <p
                className="font-inter text-sm blue_gradient cursor-pointer"
                onClick={() => handleTagClick?.(post.tag)}
            >
                {post.tag}
            </p>
        </div>
    );
};
