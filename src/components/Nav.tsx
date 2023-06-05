"use client";
import Link from "next/link";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import {
    signIn,
    signOut,
    getProviders,
    useSession,
    ClientSafeProvider,
} from "next-auth/react";

export interface Providers {
    google: ClientSafeProvider;
}

export const Nav: FC = () => {
    const [providers, setProviders] = useState<Providers | null>(null);
    const [toogleDropdown, setToogleDropdown] = useState<boolean>(false);
    const { data: session } = useSession();

    useEffect(() => {
        const setProvidersHandler = async () => {
            const response = await getProviders();
            setProviders(response);
        };

        setProvidersHandler();
    }, []);

    return (
        <nav className="flex-between w-full mb-16 pt-3">
            <Link href="/" className="flex gap-2 flex-center">
                <Image
                    src="/assets/images/logo.svg"
                    alt="logo"
                    width={30}
                    height={30}
                    className="object-contain"
                />
                <p className="logo_text">Promptopia</p>
            </Link>

            {/* Desktop Navigation */}
            <div className="sm:flex hidden">
                {session?.user ? (
                    <div className="flex gap-3 md:gap-5">
                        <Link href="/create-prompt" className="black_btn">
                            Create Post
                        </Link>
                        <button
                            type="button"
                            onClick={() => signOut()}
                            className="outline_btn"
                        >
                            Sign Out
                        </button>
                        <Link href="/profile">
                            <Image
                                src={
                                    session?.user.image ||
                                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                                }
                                alt="profile"
                                width={37}
                                height={37}
                                className="rounded-full"
                            />
                        </Link>
                    </div>
                ) : (
                    providers && (
                        <>
                            {Object.values(providers).map((provider: any) => (
                                <button
                                    type="button"
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className="black_btn"
                                >
                                    Sign In
                                </button>
                            ))}
                        </>
                    )
                )}
            </div>

            {/* Desktop Navigation */}
            <div className="sm:hidden flex relative">
                {session?.user ? (
                    <div className="flex">
                        <Image
                            src="/assets/images/logo.svg"
                            alt="profile"
                            width={37}
                            height={37}
                            className="rounded-full"
                            onClick={() => setToogleDropdown((prevState) => !prevState)}
                        />
                        {toogleDropdown && (
                            <div className="dropdown">
                                <Link
                                    href="/profile"
                                    className="dropdown_link"
                                    onClick={() => setToogleDropdown(false)}
                                >
                                    My Profile
                                </Link>
                                <Link
                                    href="/profile"
                                    className="dropdown_link"
                                    onClick={() => setToogleDropdown(false)}
                                >
                                    Create Post
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setToogleDropdown(false);
                                        signOut();
                                    }}
                                    className="mt-5 w-full black_btn"
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    providers && (
                        <>
                            {Object.values(providers).map((provider: any) => (
                                <button
                                    type="button"
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className="black_btn"
                                >
                                    Sign In
                                </button>
                            ))}
                        </>
                    )
                )}
            </div>
        </nav>
    );
};
