import { IncomingMessage } from "http";

declare module "next" {
    export interface NextApiRequest extends IncomingMessage {
        json: () => Promise<any>;
    }

    export interface NextApiResponse<Data = any> extends ServerResponse {
        params: any;
    }
}
