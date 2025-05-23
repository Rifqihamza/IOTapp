import { send_api } from "./api_functions";

export async function get_user_devices() {
    return await send_api("/api/app/get_user_devices");
}

export async function get_user_controllables() {
    return await send_api("/api/app/get_controllables");
}