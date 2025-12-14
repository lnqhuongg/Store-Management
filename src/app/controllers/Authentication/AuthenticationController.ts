import { apiFetch } from "@/app/lib/api";

export interface IAuthentication {
    username: string;
    password: string;
}

export async function Authenticate (dto: IAuthentication) {
    const res = await apiFetch<any>('/users/login', {
        method: 'POST',
        body: JSON.stringify(dto),
    });
    return res;
}