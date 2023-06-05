import { PostData } from "@models";
import Link from "next/link";
import { ChangeEvent, Dispatch, FC, FormEvent, SetStateAction } from "react";

interface FormProps {
    type: "Create";
    post: PostData;
    setPost: Dispatch<SetStateAction<PostData>>;
    isSubmiting: boolean;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export const Form: FC<FormProps> = ({
    type,
    post,
    setPost,
    isSubmiting,
    handleSubmit,
}) => {
    const setPrompt = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setPost((prevState) => ({
            ...prevState,
            prompt: event.target.value,
        }));
    };

    const setTag = (event: ChangeEvent<HTMLInputElement>) => {
        setPost((prevState) => ({
            ...prevState,
            tag: event.target.value,
        }));
    };

    return (
        <section className="w-full max-w-full flex-start flex-col">
            <h1 className="head_text tex-left">
                <span className="blue_gradient">{type} Post</span>
            </h1>
            <p className="desc text-left max-w-md">
                {type} and share amazing prompts with the world, and let your imagination
                run wild with any AI-powered platform.
            </p>
            <form
                onSubmit={handleSubmit}
                className="mt-10 w-full mb-5 max-wl-2xl flex flex-col gap-7 glassmorphism"
            >
                <label>
                    <span className="font-satoshi font-semibold text-base text-gray-700">
                        Your AI prompt
                    </span>
                    <textarea
                        value={post.prompt}
                        onChange={setPrompt}
                        placeholder="Write your prompt here..."
                        required
                        className="form_textarea"
                    />
                </label>

                <label>
                    <span className="font-satoshi font-semibold text-base text-gray-700">
                        Tag{" "}
                        <span className="font-normal">
                            (#product, #webdevelopment, #idea)
                        </span>
                    </span>
                    <input
                        value={post.tag}
                        onChange={setTag}
                        placeholder="#tag"
                        required
                        className="form_input"
                    />
                </label>

                <div className="flex-end mx-3 mb-5 gap-4">
                    <Link href="/" className="text-gray-500 text-sm">
                        Cancel
                    </Link>

                    <button
                        type="submit"
                        disabled={isSubmiting}
                        className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
                    >
                        {isSubmiting ? `${type}...` : `${type}`}
                    </button>
                </div>
            </form>
        </section>
    );
};
