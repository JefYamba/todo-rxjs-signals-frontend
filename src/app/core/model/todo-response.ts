import { Status } from './status';
import { Duration } from './duration';

export interface TodoResponse {
    id?: number;
    title?: string;
    content?: string;
    status?: Status;
    createdAt?: string;
    duration?: Duration;
}
