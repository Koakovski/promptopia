"use client";

import { Form } from "@components";
import { PostData } from "@models";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const CreatePromptPage = () => {
    const router = useRouter();

    const [isSubmting, setIsSubmeting] = useState(false);
    const [post, setPost] = useState<PostData>({ prompt: "", tag: "" });
    const { data: session } = useSession();

    const createPrompt = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmeting(true);

        try {
            const response = await fetch("/api/prompt/new", {
                method: "POST",
                body: JSON.stringify({
                    authorId: session?.user?.id,
                    prompt: post.prompt,
                    tag: post.tag,
                }),
            });

            if (response.ok) {
                router.push("/");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsSubmeting(false);
        }
    };

    return (
        <Form
            type="Create"
            post={post}
            setPost={setPost}
            isSubmiting={isSubmting}
            handleSubmit={createPrompt}
        />
    );
};

export default CreatePromptPage;
