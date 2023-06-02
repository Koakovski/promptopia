"use client";
import Link from "next/link";
import Image from "next/image";
import { FC } from "react";

export const Nav: FC = () => {
    const isUserLogged = true;

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
                {isUserLogged && (
                    <div className="flex gap-3 md:gap-5">
                        <Link href="/create-prompt" className="black_btn">
                            Create post
                        </Link>
                        <button type="button" onClick={() => {}} className="outline_btn">
                            Sign Out
                        </button>
                        <Link href="/profile">
                            <Image
                                src="/assets/images/profile.svg"
                                alt="profile"
                                width={37}
                                height={37}
                                className="rounded-full"
                            />
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};