import { IncomingMessage } from "http";

declare module "next" {
    export interface NextApiRequest extends IncomingMessage {
        json: () => Promise<any>;
    }
}
