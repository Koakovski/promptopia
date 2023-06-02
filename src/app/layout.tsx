import "@styles/global.css";
import { Metadata } from "next";
import { FC, PropsWithChildren } from "react";
import { SessionProvider, Nav } from "@components";

export const metadata: Metadata = {
    title: "Promptopia",
    description: "Discover & Share AI Prompts",
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <html lang="en">
            <body>
                <SessionProvider>
                    <div className="main">
                        <div className="gradient" />
                    </div>

                    <main className="app">
                        <Nav />
                        {children}
                    </main>
                </SessionProvider>
            </body>
        </html>
    );
};

export default RootLayout;
