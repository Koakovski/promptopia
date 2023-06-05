import { UserModel } from "./user";

export class PostData {
    prompt!: string;
    tag!: string;
}
export class PostModel extends PostData {
    id!: string;
    author!: UserModel;
    authorId!: string;

    constructor(props: PostModel) {
        super();
        Object.assign(this, props);
    }
}
