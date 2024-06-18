import { Status } from './status';

export interface TodoRequest {
    id?: number;
    title: string;
    text: string;
    status?: Status;
}
