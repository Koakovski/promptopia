import { PostModel } from "./post";

export class UserModel {
    id!: string;
    username!: string;
    image!: string;
    email!: string;
    posts?: PostModel[];

    constructor(props: UserModel) {
        Object.assign(this, props);
    }
}
