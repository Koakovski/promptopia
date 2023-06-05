// nextauth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";
interface IUser extends DefaultUser {
    id?: string;
    picture?: string;
}
declare module "next-auth" {
    interface User extends IUser {}
    interface Profile extends IUser {}
    interface Session {
        user?: User;
    }
}
