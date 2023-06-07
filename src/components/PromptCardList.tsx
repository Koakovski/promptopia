import { PostModel, UserModel } from "@models";
import { FC } from "react";
import { PromptCard } from "./PromptCard";

interface PromptCardListProps {
    data: PostModel[];
    handleTagClick?: (post: PostModel) => void;
    handleAuthorClick?: (author: UserModel) => void;
}

export const PromptCardList: FC<PromptCardListProps> = ({
    data,
    handleTagClick,
    handleAuthorClick,
}) => {
    return (
        <div className="mt-16 prompt_layout">
            {data.map((post) => (
                <PromptCard
                    key={post.id}
                    post={post}
                    handleTagClick={handleTagClick}
                    handleAuthorClick={handleAuthorClick}
                />
            ))}
        </div>
    );
};
