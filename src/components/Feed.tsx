"use client";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { PromptCardList } from "./PromptCardList";
import { PostModel } from "@models";

export const Feed: FC = () => {
    const [searchText, setSearchText] = useState<string>("");
    const [posts, setPosts] = useState<PostModel[]>([]);

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch("/api/prompt", { method: "GET" });
            const data = await response.json();

            setPosts(data);
        };

        fetchPosts();
    }, []);

    return (
        <section className="feed">
            <form className="relative w-full flex-center">
                <input
                    type="text"
                    placeholder="Search for a tag or username"
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                    className="search_input peer"
                />
            </form>
            <PromptCardList data={posts} handleTagClick={(tag: string) => {}} />
        </section>
    );
};
