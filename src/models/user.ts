export class UserModel {
    id!: string;
    username!: string;
    image!: string;
    email!: string;

    constructor(props: UserModel) {
        Object.assign(this, props);
    }
}
