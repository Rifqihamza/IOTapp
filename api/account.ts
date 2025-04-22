import { send_api } from "./api_functions";

export async function request_token(email: string) {
    const result = await send_api("/api/app/login", { "email": email });
    if(!result.success) {
        console.error(result.error);
    }
    return result;
}

export async function request_login(token: string, id: string) {
    const result = await send_api("/api/app/verify", { "token": token, "id": id });
    if(!result.success) {
        console.error(result.error);
    }
    return result;
}