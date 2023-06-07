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

    const handleClickTag = (post: PostModel) => {
        setSearchText(post.tag);
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
            <PromptCardList data={posts} handleTagClick={handleClickTag} />
        </section>
    );
};
