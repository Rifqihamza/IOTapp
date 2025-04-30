import { send_api } from "./api_functions";

export async function request_token(email: string) {
    return await send_api({ endpoint: "/api/user/otp_login", data: { "email": email }});
}

export async function request_login(token: string, id: string) {
    return await send_api({ endpoint: "/api/user/otp_login_verify", data: { "otp": token, "id": id }});
}

export async function get_user_data() {
    return await send_api({ endpoint: "/api/user/get", method: "GET" });
}

export async function logout() {
    return await send_api({ endpoint: "/api/user/logout", method: "POST" });
}