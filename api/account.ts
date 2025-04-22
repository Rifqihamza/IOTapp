import { send_api } from "./api_functions";

export async function request_token(email: string) {
    return await send_api("/api/app/login", { "email": email });
}

export async function request_login(token: string, id: string) {
    return await send_api("/api/app/verify", { "token": token, "id": id });
}

export async function get_user_data() {
    return await send_api("/api/app/get_user");
}