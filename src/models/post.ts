export class PostModel {
    id!: string;
    prompt!: string;
    tag!: string;

    constructor(props: PostModel) {
        Object.assign(this, props);
    }
}
