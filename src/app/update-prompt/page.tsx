"use client";
import { Form } from "@components";
import { PostData } from "@models";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

const UpdatePromptPage = () => {
    const router = useRouter();

    const [isSubmting, setIsSubmeting] = useState(false);
    const [post, setPost] = useState<PostData>({ prompt: "", tag: "" });
    const { data: session } = useSession();

    const searchParams = useSearchParams();
    const promptId = searchParams.get("id");

    const createPrompt = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setIsSubmeting(true);

        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    authorId: session?.user?.id,
                    prompt: post.prompt,
                    tag: post.tag,
                }),
            });

            if (response.ok) {
                router.push("/profile");
            }
        } catch (error) {
        } finally {
            setIsSubmeting(false);
        }
    };

    useEffect(() => {
        const fetchPrompt = async () => {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: "GET",
            });
            const data = await response.json();

            setPost({
                prompt: data.prompt,
                tag: data.tag,
            });
        };

        if (promptId) fetchPrompt();
    }, [promptId]);

    return (
        <Form
            type="Edit"
            post={post}
            setPost={setPost}
            isSubmiting={isSubmting}
            handleSubmit={createPrompt}
        />
    );
};

export default UpdatePromptPage;
