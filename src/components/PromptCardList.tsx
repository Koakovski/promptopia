import { PostModel } from "@models";
import { FC } from "react";
import { PromptCard } from "./PromptCard";

interface PromptCardListProps {
    data: PostModel[];
    handleTagClick?: (post: PostModel) => void;
}

export const PromptCardList: FC<PromptCardListProps> = ({ data, handleTagClick }) => {
    return (
        <div className="mt-16 prompt_layout">
            {data.map((post) => (
                <PromptCard key={post.id} post={post} handleTagClick={handleTagClick} />
            ))}
        </div>
    );
};
