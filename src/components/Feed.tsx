"use client";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { PromptCardList } from "./PromptCardList";
import { PostModel, UserModel } from "@models";
import { useRouter } from "next/navigation";

export const Feed: FC = () => {
    const [searchText, setSearchText] = useState<string>("");
    const [posts, setPosts] = useState<PostModel[]>([]);

    const router = useRouter();

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    const handleClickTag = (post: PostModel) => {
        setSearchText(post.tag);
    };

    const handleAuthorClick = (author: UserModel) => {
        router.push(`/profile?userId=${author.id}`);
    };

    useEffect(() => {
        const fetchPosts = async () => {
            let url = "/api/prompt";
            if (searchText !== "") url += `?search=${searchText}`;

            const response = await fetch(url, { method: "GET" });
            const data = await response.json();

            setPosts(data);
        };

        fetchPosts();
    }, [searchText]);

    return (
        <section className="feed">
            <form
                onSubmit={(e) => e.preventDefault()}
                className="relative w-full flex-center"
            >
                <input
                    type="text"
                    placeholder="Search for a tag or username"
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                    className="search_input peer"
                />
            </form>
            <PromptCardList
                data={posts}
                handleTagClick={handleClickTag}
                handleAuthorClick={handleAuthorClick}
            />
        </section>
    );
};
