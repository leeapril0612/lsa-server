export type ReqeustCreateBoard = {
    title: string;
    content: string;
}

export type CreateBoard = {
    title: string;
    content: string;
    username: string;
}

export type UpdateBoard = {
    title?: string;
    content?: string;
}