import "@/styles/global.css";
import { Metadata } from "next";
import { FC, PropsWithChildren } from "react";

export const metadata: Metadata = {
    title: "Promptopia",
    description: "Discover & Share AI Prompts",
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <html lang="en">
            <body>
                <div className="main">
                    <div className="gradient" />
                </div>

                <main className="app">{children}</main>
            </body>
        </html>
    );
};

export default RootLayout;
