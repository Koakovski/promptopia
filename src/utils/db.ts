import { PrismaClient } from "@prisma/client";

export class DatabaseConnectionSingleton {
    private static singleton: DatabaseConnectionSingleton;
    private db: PrismaClient;

    private constructor() {
        this.db = new PrismaClient();
    }

    static getInstance(): PrismaClient {
        if (!this.singleton) {
            this.singleton = new DatabaseConnectionSingleton();
        }

        return this.singleton.db;
    }
}

export function getDatabaseConnection() {
    return DatabaseConnectionSingleton.getInstance();
}
