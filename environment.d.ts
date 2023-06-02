declare global {
    namespace NodeJS {
        interface ProcessEnv {
            GOOGLE_ID: string;
            GOOGLE_CLIENT_SECRET: string;
            NEXTAUTH_URL: string;
            NEXTAUTH_URL_INTERNAL: string;
            NEXTAUTH_SECRET: string;
        }
    }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
